# CLAUDE.md - Coursify

**AI Online Course Creation Platform**

Transform Coursify into Coursify - create complete online courses with AI-generated content, videos, and quizzes.

---

## ⚠️ CRITICAL LESSONS FROM CLIPMASTER (READ FIRST!)

**When adapting Coursify, apply these 7 lessons learned from ClipMaster transformation:**

### 1. **DESIGN SYSTEM MUST BE COMPLETELY DIFFERENT**
❌ Don't just change colors - Transform the entire visual style!
- Coursify: Brutalist (black borders, sharp corners, yellow)
- **Your project**: Create UNIQUE visual identity
- **Action**: Don't keep border-4 border-black, brutalist-shadow
- **Action**: Choose style: Modern (soft shadows), Minimalist (clean), Academic (serif), or Professional (corporate)

### 2. **COMPONENT STYLING OVERHAUL REQUIRED**
❌ Don't just update pages - Redesign ALL UI components!
- **Files to update:** button.tsx, card.tsx, header.tsx, footer.tsx, NewsletterPopup.tsx, globals.css
- **Action**: Match components to your unique brand style

### 3. **BRANDING CONSISTENCY**
❌ Don't mix uppercase/lowercase!
- **Your choice**: UPPERCASE, lowercase, or Title Case - pick ONE
- **Action**: Update everywhere (Header, Footer, legal docs, meta tags)

### 4. **VISUAL ELEMENTS - COMPLETE REPLACEMENT**
❌ Don't reuse Coursify images!
- **Action**: Delete all microphone/waveform images
- **Action**: Generate course-specific images (see IMAGES_SCRIPT.md)

### 5. **TYPOGRAPHY & SPACING**
❌ Don't keep Coursify font styles!
- **Action**: Choose different font weights (semibold vs bold)
- **Action**: Adjust uppercase transforms for your brand

### 6. **ANIMATION & INTERACTIONS**
❌ Don't keep same animations!
- **Action**: Create unique motion design (smooth vs snappy)

### 7. **LAYOUT PATTERNS**
❌ Don't copy Coursify sections!
- **Action**: Redesign page flow for your product
- **Action**: Add unique sections relevant to courses

---

## 🎯 PROJECT OVERVIEW

**Core Functionality:**
- Enter course topic or upload outline
- AI generates complete course structure (modules + lessons)
- Auto-generate lesson content, video scripts, and presentations
- Create video lessons or slide decks
- Generate quizzes and assessments
- Build course landing pages
- Student enrollment and progress tracking
- Course publishing and sharing

**Replicate Models:** `meta/meta-llama-3-70b-instruct` (content), `google/veo-3.1` or `luma/ray` (videos), `black-forest-labs/flux-pro` (images)

**Tech Stack:** Next.js 16.0.1 · Prisma + PostgreSQL · Vercel Blob · Replicate API · OpenAI API · Stripe

---

## 🎨 BRAND COLORS

```css
/* NEW (Coursify) */
--primary: #A855F7;    /* Purple 500 - Creative, educational */
--secondary: #EC4899;  /* Fuchsia/Pink 500 - Engaging, inspiring */
--accent: #F43F5E;     /* Rose 500 - Energetic, passionate */
```

---

## 🗄 DATABASE SCHEMA

### DELETE: Voice models
### ADD:
```prisma
model Course {
  id String @id @default(cuid())
  userId String
  title String
  description String @db.Text
  category String  // "business", "tech", "creative", "personal-development", etc.
  difficultyLevel String  // "beginner", "intermediate", "advanced"
  thumbnailUrl String?
  published Boolean @default(false)
  price Decimal?  // null = free
  modules Module[]
  enrollments Enrollment[]
  createdAt DateTime @default(now())
}

model Module {
  id String @id @default(cuid())
  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  title String
  description String @db.Text
  order Int
  lessons Lesson[]
}

model Lesson {
  id String @id @default(cuid())
  moduleId String
  module Module @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  title String
  content String @db.Text  // Markdown or HTML
  lessonType String  // "video", "article", "quiz", "assignment"
  videoUrl String?
  slideUrl String?  // Presentation slides
  duration Int?  // minutes
  order Int
  quiz Quiz?
  status String @default("draft")  // "draft", "generating", "completed"
  replicateId String?
}

model Quiz {
  id String @id @default(cuid())
  lessonId String @unique
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  questions Json  // [{question, options, correctAnswer, explanation}]
  passingScore Int @default(70)
  attempts QuizAttempt[]
}

model QuizAttempt {
  id String @id @default(cuid())
  quizId String
  quiz Quiz @relation(fields: [quizId], references: [id], onDelete: Cascade)
  userId String
  score Int
  answers Json
  passed Boolean
  completedAt DateTime @default(now())
}

model Enrollment {
  id String @id @default(cuid())
  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  userId String
  progress Int @default(0)  // percentage
  completedLessons String[]  // array of lesson IDs
  enrolledAt DateTime @default(now())
  completedAt DateTime?
}
```

---

## 🛣 API ROUTES

- `POST /api/courses/create` - Create course from topic or outline
- `POST /api/courses/[id]/generate` - AI-generate course structure
- `GET /api/courses` - List all courses
- `GET /api/courses/[id]` - Get course details with modules/lessons
- `PATCH /api/courses/[id]` - Update course
- `POST /api/courses/[id]/publish` - Publish course
- `POST /api/lessons/[id]/generate-video` - Generate video lesson
- `POST /api/lessons/[id]/generate-quiz` - Generate quiz
- `POST /api/enrollments/create` - Enroll student in course
- `POST /api/enrollments/[id]/progress` - Update lesson progress
- `GET /api/analytics/[courseId]` - Course analytics

---

## 📄 KEY PAGES

- **Homepage:** "Create Online Courses in Minutes with AI"
- **Dashboard:** Course library, student analytics, revenue tracking
- **Course Builder:** Topic → Structure → Content → Videos → Publish
- **Course Player:** Student-facing lesson viewer with progress tracking
- **Pricing:** Free (1 course), Creator ($39/mo), Pro ($99/mo)

---

## 🧩 COMPONENTS

- `course-topic-form.tsx` - Enter course topic/outline
- `module-builder.tsx` - Create/edit course modules
- `lesson-editor.tsx` - Edit lesson content
- `video-generator.tsx` - AI video script and generation
- `quiz-builder.tsx` - Create quizzes
- `course-preview.tsx` - Preview course as student
- `landing-page-builder.tsx` - Course marketing page
- `student-progress.tsx` - Progress tracking component

---

**Total Time:** 20-26 hours

**Next:** See `TODO.md`, `LANDING_PAGE_CONTENT.md`, `IMAGES_SCRIPT.md`
