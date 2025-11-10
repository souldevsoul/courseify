# Courseify - VoiceCraft Adaptation Guide

## 📋 Overview
**From:** Voice cloning → **To:** AI course creation platform
**Model:** Voice synthesis → OpenAI GPT-4 for content generation

## 🎨 Brand

### Colors
```css
--primary: #EAB308;    /* Yellow 500 - Learning, Energy */
--secondary: #F97316;  /* Orange 500 - Creative, Inspiring */
--accent: #CA8A04;     /* Yellow 600 - Interactive */
```

**VoiceCraft Colors (to replace):**
```css
--primary: #7C3AED;    /* Purple 600 */
--secondary: #3B82F6;  /* Blue 500 */
```

### Typography
- **Primary:** Poppins (700 Bold, 600 SemiBold, 400 Regular) - Educational, friendly
- **Secondary:** Inter (500 Medium for UI)

**VoiceCraft Typography (to replace):**
- Primary: Space Grotesk
- Secondary: Inter Variable

### Logo
Lightbulb with play button → represents video learning and knowledge

**AI Prompt:**
```
Modern educational logo for Courseify course creation platform. Symbol shows glowing lightbulb with play button inside, suggesting video learning. Gradient from yellow (#EAB308) to orange (#F97316). Bright, inspiring, educational. Vector style, white background.
```

## 🗄️ Database Schema

```prisma
model Course {
  id String @id @default(cuid())
  userId String
  user User @relation(fields: [userId], references: [id])

  title String
  description String @db.Text
  category String // business, tech, health, creative
  level String // beginner, intermediate, advanced

  thumbnail String?
  status String @default("draft") // draft, published, archived

  modules Module[]
  students Enrollment[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Module {
  id String @id @default(cuid())
  courseId String
  course Course @relation(fields: [courseId], references: [id])

  title String
  description String @db.Text
  order Int

  lessons Lesson[]

  createdAt DateTime @default(now())
}

model Lesson {
  id String @id @default(cuid())
  moduleId String
  module Module @relation(fields: [moduleId], references: [id])

  title String
  content String @db.Text // markdown or HTML
  lessonType String // video, text, quiz, assignment
  order Int

  videoScript String? @db.Text
  videoDuration Int? // seconds

  quiz Quiz?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Quiz {
  id String @id @default(cuid())
  lessonId String @unique
  lesson Lesson @relation(fields: [lessonId], references: [id])

  questions Json[] // Array of question objects
  passingScore Int @default(70)
  timeLimit Int? // minutes

  attempts QuizAttempt[]
}

model QuizAttempt {
  id String @id @default(cuid())
  quizId String
  quiz Quiz @relation(fields: [quizId], references: [id])
  studentId String
  student User @relation(fields: [studentId], references: [id])

  answers Json[]
  score Int
  passed Boolean
  timeSpent Int // seconds

  createdAt DateTime @default(now())
}

model Enrollment {
  id String @id @default(cuid())
  studentId String
  student User @relation(fields: [studentId], references: [id])
  courseId String
  course Course @relation(fields: [courseId], references: [id])

  progress Int @default(0) // 0-100%
  completedLessons String[] // Array of lesson IDs

  enrolledAt DateTime @default(now())
  completedAt DateTime?
}

model Certificate {
  id String @id @default(cuid())
  studentId String
  student User @relation(fields: [studentId], references: [id])
  courseId String

  certificateUrl String
  issuedAt DateTime @default(now())
}
```

## 🔌 API Routes

### Course Generation
```typescript
// app/api/courses/generate/route.ts
export async function POST(request: NextRequest) {
  const { topic, level, modules } = await request.json()

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: `You are an expert course creator. Generate a comprehensive course outline
      for "${topic}" at ${level} level with ${modules} modules. Include:
      - Course description
      - Module titles and descriptions
      - 5-7 lesson topics per module
      - Learning objectives
      Return as JSON.`
    }]
  })

  const courseOutline = JSON.parse(completion.choices[0].message.content)

  const course = await prisma.course.create({
    data: {
      userId,
      title: topic,
      description: courseOutline.description,
      level,
      status: "draft"
    }
  })

  // Create modules and lessons
  for (const moduleData of courseOutline.modules) {
    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order
      }
    })

    for (const lessonData of moduleData.lessons) {
      await prisma.lesson.create({
        data: {
          moduleId: module.id,
          title: lessonData.title,
          content: lessonData.content,
          lessonType: "text",
          order: lessonData.order
        }
      })
    }
  }

  return NextResponse.json({ success: true, course })
}

// app/api/lessons/generate-script/route.ts
export async function POST(request: NextRequest) {
  const { lessonId, lessonTitle, lessonContent } = await request.json()

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: `Generate a 3-5 minute video script for a lesson titled "${lessonTitle}".
      Content: ${lessonContent}

      Format as engaging educational script with:
      - Hook (first 15 seconds)
      - Main content
      - Examples
      - Summary
      - Call to action

      Write in conversational, clear tone.`
    }]
  })

  const script = completion.choices[0].message.content

  await prisma.lesson.update({
    where: { id: lessonId },
    data: { videoScript: script }
  })

  return NextResponse.json({ success: true, script })
}

// app/api/quizzes/generate/route.ts
export async function POST(request: NextRequest) {
  const { lessonId, numQuestions } = await request.json()

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } }
  })

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: `Generate ${numQuestions} multiple-choice questions for this lesson:
      Title: ${lesson.title}
      Content: ${lesson.content}

      Return JSON array with:
      - question
      - options (4 choices)
      - correctIndex (0-3)
      - explanation

      Mix difficulty levels.`
    }]
  })

  const questions = JSON.parse(completion.choices[0].message.content)

  const quiz = await prisma.quiz.create({
    data: {
      lessonId,
      questions,
      passingScore: 70
    }
  })

  return NextResponse.json({ success: true, quiz })
}
```

## 🏠 Homepage Changes

```tsx
<section className="hero">
  <h1>Turn Your Knowledge into Online Courses</h1>
  <p>
    AI course builder that creates lesson plans, quizzes, and video scripts.
    Upload your content outline, get a complete course structure in minutes.
  </p>

  <div className="course-generator">
    <Input placeholder="What do you want to teach? (e.g., Web Development)" />
    <Select>
      <option>Beginner</option>
      <option>Intermediate</option>
      <option>Advanced</option>
    </Select>
    <Input type="number" placeholder="Number of modules" defaultValue={5} />
    <Button className="bg-gradient-to-r from-yellow-500 to-orange-500">
      Generate Course Outline
    </Button>
  </div>
</section>

<section className="features">
  <h2>Everything You Need to Create Engaging Courses</h2>

  <div className="feature-grid">
    <Feature
      icon={<Lightbulb />}
      title="AI Course Outline"
      description="Generate complete course structure with modules and lessons based on your topic"
    />
    <Feature
      icon={<FileQuestion />}
      title="Quiz Generator"
      description="Auto-create assessments with multiple question types and difficulty levels"
    />
    <Feature
      icon={<FileText />}
      title="Script Writing"
      description="Generate video lesson scripts, presentation slides, and student handouts"
    />
    <Feature
      icon={<Users />}
      title="Student Management"
      description="Track progress, issue certificates, manage discussions"
    />
  </div>
</section>
```

## ✨ Features

- **AI Course Generation** - Complete outlines from topic description
- **Module & Lesson Builder** - Structured curriculum with learning paths
- **Quiz Generator** - Auto-create assessments with explanations
- **Video Script Writing** - Engaging scripts for video lessons
- **Student Progress Tracking** - Analytics and completion rates
- **Certificate Generation** - Automated certificate issuance
- **Discussion Forums** - Q&A and peer interaction
- **Drip Content** - Schedule lesson releases

## 💰 Pricing

```tsx
const tiers = [
  {
    name: "Educator",
    price: "$0/mo",
    features: [
      "1 course",
      "Up to 10 lessons",
      "50 students max",
      "Basic analytics",
      "Community support"
    ]
  },
  {
    name: "Creator",
    price: "$39/mo",
    popular: true,
    features: [
      "10 courses",
      "Unlimited lessons",
      "500 students",
      "Advanced analytics",
      "Quiz generator",
      "Certificates",
      "Email support",
      "Custom branding"
    ]
  },
  {
    name: "Academy",
    price: "$149/mo",
    features: [
      "Unlimited courses",
      "Unlimited lessons",
      "Unlimited students",
      "White-label option",
      "Custom domain",
      "API access",
      "Priority support",
      "Team collaboration",
      "Advanced integrations"
    ]
  }
]
```

## 🔄 Quick Replace Commands

```bash
# Replace brand name
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/VoiceCraft/Courseify/g' {} +

# Replace core concepts
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/voice/course/g' {} +
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/audio/lesson/g' {} +
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/Voice/Course/g' {} +
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/Audio/Lesson/g' {} +

# Replace colors in CSS/Tailwind
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) -exec sed -i '' 's/#7C3AED/#EAB308/g' {} +
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) -exec sed -i '' 's/#3B82F6/#F97316/g' {} +
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) -exec sed -i '' 's/purple-600/yellow-500/g' {} +
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) -exec sed -i '' 's/blue-500/orange-500/g' {} +
```

## 🧪 Testing Checklist

- [ ] Course generation creates complete outline
- [ ] Modules and lessons save correctly
- [ ] Quiz generator creates valid questions
- [ ] Video script generation works
- [ ] Student enrollment functions
- [ ] Progress tracking updates
- [ ] Certificate generation works
- [ ] All yellow/orange branding applied
- [ ] Poppins font loads correctly
- [ ] Dashboard shows courses instead of voices

## 🚀 Environment Variables

```env
OPENAI_API_KEY="sk-proj-..."
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="https://courseify.com"
```

## 📝 Notes

- **No Replicate needed** - Uses OpenAI GPT-4 for all content generation
- **Focus on education** - Learning-first design patterns
- **Student-facing pages** - Add student portal for taking courses
- **Payment integration** - Add Stripe for course payments
- **Video hosting** - Integrate with Vimeo or Cloudflare Stream for video lessons

---

*Transform expertise into income!* 📚✨
