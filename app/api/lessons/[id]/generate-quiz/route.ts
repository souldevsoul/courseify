import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateQuizWithAI } from '@/lib/openai';

const prisma = new PrismaClient();

// POST /api/lessons/[id]/generate-quiz - Generate quiz for a lesson
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lesson = await prisma.lesson.findUnique({
      where: { id },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Generate quiz questions based on lesson content (using OpenAI or template fallback)
    const questions = await generateQuizWithAI(lesson.title, lesson.content);

    // Create or update quiz
    const quiz = await prisma.quiz.upsert({
      where: { lessonId: id },
      create: {
        lessonId: id,
        questions: JSON.parse(JSON.stringify(questions)),
        passingScore: 70,
      },
      update: {
        questions: JSON.parse(JSON.stringify(questions)),
      },
    });

    return NextResponse.json({ quiz }, { status: 201 });
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}

