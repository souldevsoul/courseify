import OpenAI from 'openai';

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export interface CourseStructure {
  title: string;
  description: string;
  modules: Array<{
    title: string;
    description: string;
    lessons: Array<{
      title: string;
      content: string;
      type: string;
      duration: number;
    }>;
  }>;
}

export async function generateCourseWithAI(
  topic: string,
  category: string,
  difficulty: string
): Promise<CourseStructure> {
  if (!openai) {
    // Fallback to template-based generation if OpenAI is not configured
    return generateCourseTemplate(topic, category, difficulty);
  }

  try {
    const prompt = `You are an expert curriculum designer. Create a comprehensive online course structure for the following:

Topic: ${topic}
Category: ${category}
Difficulty Level: ${difficulty}

Generate a detailed course structure with:
- A compelling course title
- A clear course description (2-3 sentences)
- ${difficulty === 'beginner' ? '3-4' : difficulty === 'intermediate' ? '5-6' : '7-8'} modules
- Each module should have ${difficulty === 'beginner' ? '4-5' : difficulty === 'intermediate' ? '5-6' : '6-7'} lessons
- Each lesson should have:
  - A clear, specific title
  - Detailed content outline (3-5 paragraphs)
  - Lesson type (article, video, or quiz)
  - Estimated duration in minutes

Format your response as JSON with this structure:
{
  "title": "Course Title",
  "description": "Course description",
  "modules": [
    {
      "title": "Module title",
      "description": "Module description",
      "lessons": [
        {
          "title": "Lesson title",
          "content": "Detailed lesson content with learning objectives and key concepts",
          "type": "article",
          "duration": 15
        }
      ]
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert curriculum designer who creates comprehensive, well-structured online courses.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4000,
    });

    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(result);
  } catch (error) {
    console.error('Error generating course with OpenAI:', error);
    // Fallback to template generation
    return generateCourseTemplate(topic, category, difficulty);
  }
}

export async function generateQuizWithAI(
  lessonTitle: string,
  lessonContent: string
): Promise<Array<{
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}>> {
  if (!openai) {
    return generateQuizTemplate(lessonTitle);
  }

  try {
    const prompt = `Create 5 multiple-choice quiz questions based on this lesson:

Title: ${lessonTitle}
Content: ${lessonContent.substring(0, 1000)}

Generate questions that:
- Test understanding of key concepts
- Have 4 plausible answer options
- Include detailed explanations for the correct answer
- Range from basic recall to application-level thinking

Format as JSON array:
[
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation of why this is correct"
  }
]`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an educational assessment expert who creates effective quiz questions.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(result);
    return parsed.questions || parsed;
  } catch (error) {
    console.error('Error generating quiz with OpenAI:', error);
    return generateQuizTemplate(lessonTitle);
  }
}

// Template-based fallback functions
function generateCourseTemplate(
  topic: string,
  category: string,
  difficulty: string
): CourseStructure {
  const config = {
    beginner: { moduleCount: 3, lessonsPerModule: 4 },
    intermediate: { moduleCount: 5, lessonsPerModule: 5 },
    advanced: { moduleCount: 7, lessonsPerModule: 6 },
  }[difficulty] || { moduleCount: 3, lessonsPerModule: 4 };

  const modules = [];
  for (let i = 0; i < config.moduleCount; i++) {
    const moduleNumber = i + 1;
    const lessons = [];

    for (let j = 0; j < config.lessonsPerModule; j++) {
      const lessonNumber = j + 1;
      lessons.push({
        title: `Lesson ${lessonNumber}: ${topic} Fundamentals ${lessonNumber}`,
        content: `# Lesson ${lessonNumber}\n\nThis lesson covers essential concepts in ${topic}.\n\n## Learning Objectives\n- Understand core principles\n- Apply knowledge practically\n- Build foundational skills\n\n## Key Concepts\nDetailed content about ${topic} will be covered here.`,
        type: j === config.lessonsPerModule - 1 ? 'quiz' : 'article',
        duration: 15,
      });
    }

    modules.push({
      title: `Module ${moduleNumber}: ${topic} - Part ${moduleNumber}`,
      description: `Explore key aspects of ${topic} in this module.`,
      lessons,
    });
  }

  return {
    title: `Complete ${topic} Course`,
    description: `Master ${topic} with this ${difficulty}-level course designed for ${category} professionals.`,
    modules,
  };
}

function generateQuizTemplate(lessonTitle: string) {
  return [
    {
      question: `What is the main focus of "${lessonTitle}"?`,
      options: [
        'Core concepts and fundamentals',
        'Advanced techniques only',
        'Historical background',
        'Future trends',
      ],
      correctAnswer: 0,
      explanation: 'This lesson primarily focuses on fundamental concepts and core principles.',
    },
    {
      question: 'What is the best approach to learning this material?',
      options: [
        'Passive reading only',
        'Active practice and application',
        'Memorization',
        'Skipping to advanced topics',
      ],
      correctAnswer: 1,
      explanation: 'Active practice and real-world application are most effective for learning.',
    },
    {
      question: 'How does this lesson contribute to your overall learning?',
      options: [
        'Standalone information',
        'Builds on previous lessons and prepares for future ones',
        'Optional material',
        'Review of basics only',
      ],
      correctAnswer: 1,
      explanation: 'Each lesson builds progressively on previous knowledge.',
    },
  ];
}
