import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth()
    const { id: lessonId } = await params

    // Get lesson
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    })

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 })
    }

    // Check authorization
    if (lesson.module.course.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Check if lesson already has video
    if (lesson.videoUrl && lesson.status === "completed") {
      return NextResponse.json(
        {
          message: "Video already exists",
          videoUrl: lesson.videoUrl
        },
        { status: 200 }
      )
    }

    // Update lesson status to generating
    await prisma.lesson.update({
      where: { id: lessonId },
      data: { status: "generating" },
    })

    // Prepare video prompt from lesson content
    const videoPrompt = generateVideoPrompt(lesson.title, lesson.content)

    // Generate video using Luma Ray (or fallback to Runway)
    let videoUrl: string

    try {
      // Try Luma Ray first
      const output = await replicate.run(
        "luma/ray:b5a61fd6bc7c5c3d1ee1f0c1f8b4e4e4c1e1c1c1c1c1c1c1c1c1c1c1c1c1c1c1",
        {
          input: {
            prompt: videoPrompt,
            aspect_ratio: "16:9",
            duration: "5s",
          },
        }
      ) as { video_url?: string } | string

      videoUrl = typeof output === 'string' ? output : (output.video_url || '')
    } catch (lumaError) {
      console.error("Luma Ray failed, trying Google Veo:", lumaError)

      try {
        // Fallback to Google Veo
        const output = await replicate.run(
          "google-deepmind/veo-2:latest",
          {
            input: {
              prompt: videoPrompt,
              duration: 5,
            },
          }
        ) as { video_url?: string } | string

        videoUrl = typeof output === 'string' ? output : (output.video_url || '')
      } catch (veoError) {
        console.error("Google Veo also failed:", veoError)
        throw new Error("All video generation services failed")
      }
    }

    // Update lesson with video URL
    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        videoUrl: videoUrl,
        status: "completed",
      },
    })

    return NextResponse.json({
      message: "Video generated successfully",
      lesson: updatedLesson,
      videoUrl: videoUrl,
    })
  } catch (error) {
    console.error("Error generating video:", error)

    // Update lesson status back to draft on error
    try {
      const { id } = await params
      await prisma.lesson.update({
        where: { id },
        data: { status: "draft" },
      })
    } catch (updateError) {
      console.error("Failed to update lesson status:", updateError)
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate video",
      },
      { status: 500 }
    )
  }
}

function generateVideoPrompt(title: string, content: string): string {
  // Extract first 200 characters of content for context
  const contentPreview = content.slice(0, 200).replace(/<[^>]*>/g, "")

  return `Create an educational video for a lesson titled "${title}".

Context: ${contentPreview}

Style: Professional educational video with clean visuals, modern design, and engaging animations. Include relevant icons, diagrams, or illustrations that support the learning material. Use a calm, educational aesthetic with smooth transitions.

Requirements:
- 16:9 aspect ratio
- 5 seconds duration
- Focus on key visual concepts
- Educational and professional tone
- No text overlays (will be added in post-production)`
}
