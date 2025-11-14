import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateCourseWithAI } from '@/lib/openai';
import { requireAuth } from '@/lib/session';

const prisma = new PrismaClient();

// POST /api/courses/generate - AI-generate course structure from topic
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const user = await requireAuth();
    const userId = user.id;

    const body = await request.json();
    const { topic, category, difficultyLevel } = body;

    if (!topic || !category || !difficultyLevel) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, category, difficultyLevel' },
        { status: 400 }
      );
    }

    // Generate course structure with AI (using OpenAI or template fallback)
    const courseStructure = await generateCourseWithAI(topic, category, difficultyLevel);

    // Create course in database
    const course = await prisma.course.create({
      data: {
        userId,
        title: courseStructure.title,
        description: courseStructure.description,
        category,
        difficultyLevel,
        modules: {
          create: courseStructure.modules.map((module: any, moduleIndex: number) => ({
            title: module.title,
            description: module.description,
            order: moduleIndex,
            lessons: {
              create: module.lessons.map((lesson: any, lessonIndex: number) => ({
                title: lesson.title,
                content: lesson.content,
                lessonType: lesson.type || 'article',
                order: lessonIndex,
                duration: lesson.duration || 10,
              })),
            },
          })),
        },
      },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error('Error generating course:', error);

    // Handle unauthorized error
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate course' },
      { status: 500 }
    );
  }
}

