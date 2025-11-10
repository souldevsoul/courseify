# TODO.md - Courseify

AI Course Creation Platform - Task breakdown. **Time:** 20-26 hours

---

## PHASE 1: BRANDING & SETUP (2h)

- [ ] Update Tailwind config: Purple (#A855F7), Fuchsia (#EC4899), Rose (#F43F5E)
- [ ] Replace "VoiceCraft" → "Courseify" across all pages
- [ ] Update favicon and meta tags
- [ ] Update app/layout.tsx with new branding

---

## PHASE 2: DATABASE MIGRATION (1.5h)

- [ ] Remove Voice, VoiceGeneration, VoiceTemplate, Audio models
- [ ] Add Course model (title, description, category, difficulty, price)
- [ ] Add Module model (courseId, title, description, order)
- [ ] Add Lesson model (moduleId, title, content, lessonType, videoUrl, slideUrl, duration, order, status)
- [ ] Add Quiz model (lessonId, questions, passingScore)
- [ ] Add QuizAttempt model (quizId, userId, score, answers, passed)
- [ ] Add Enrollment model (courseId, userId, progress, completedLessons)
- [ ] Run `npx prisma generate` and `npx prisma db push`

---

## PHASE 3: API ROUTES (5h)

### Course Management
- [ ] `POST /api/courses/create` - Create course from topic
- [ ] `POST /api/courses/[id]/generate` - AI-generate structure (use OpenAI)
- [ ] `GET /api/courses` - List courses
- [ ] `GET /api/courses/[id]` - Get course with modules/lessons
- [ ] `PATCH /api/courses/[id]` - Update course
- [ ] `POST /api/courses/[id]/publish` - Publish course
- [ ] `DELETE /api/courses/[id]` - Delete course

### Lesson Management
- [ ] `POST /api/lessons/create` - Create lesson
- [ ] `PATCH /api/lessons/[id]` - Update lesson content
- [ ] `POST /api/lessons/[id]/generate-video` - Generate video (Replicate)
- [ ] `POST /api/lessons/[id]/generate-quiz` - Generate quiz (OpenAI)
- [ ] `DELETE /api/lessons/[id]` - Delete lesson

### Student Enrollment
- [ ] `POST /api/enrollments/create` - Enroll in course
- [ ] `GET /api/enrollments` - Get user enrollments
- [ ] `POST /api/enrollments/[id]/progress` - Mark lesson complete
- [ ] `GET /api/analytics/[courseId]` - Course analytics

---

## PHASE 4: COMPONENTS (4h)

- [ ] `course-topic-form.tsx` - Topic input, category, difficulty
- [ ] `module-builder.tsx` - Add/edit/reorder modules
- [ ] `lesson-editor.tsx` - Rich text editor for lesson content
- [ ] `video-generator.tsx` - Script generation + video creation
- [ ] `quiz-builder.tsx` - Add questions, options, correct answers
- [ ] `course-preview.tsx` - Preview as student
- [ ] `landing-page-builder.tsx` - Course sales page
- [ ] `student-progress.tsx` - Progress bar, completed lessons

---

## PHASE 5: PAGES (3h)

- [ ] Update `app/page.tsx` - "Create Courses with AI"
- [ ] Update `app/dashboard/page.tsx` - Course library, analytics
- [ ] Create `app/builder/page.tsx` - Course builder multi-step
- [ ] Create `app/courses/[id]/page.tsx` - Course player (student view)
- [ ] Update `app/pricing/page.tsx` - Free, Creator ($39), Pro ($99)

---

## PHASE 6: IMAGES & ASSETS (2h)

- [ ] Generate Courseify logo (graduation cap + AI) using Recraft V3
- [ ] Generate hero video (course creation process) using Luma
- [ ] Generate 6 category examples (business, tech, creative, etc.)
- [ ] Generate UI mockups (builder, player, analytics)
- [ ] Generate 3 testimonials

---

## PHASE 7: TESTING (2.5h)

- [ ] Test: Create course from topic
- [ ] Test: AI generates 3 modules with 5 lessons each
- [ ] Test: Generate video for lesson
- [ ] Test: Generate quiz with 5 questions
- [ ] Test: Student enrollment
- [ ] Test: Progress tracking
- [ ] Test: Course completion

---

## PHASE 8: DEPLOYMENT (2h)

- [ ] Deploy to Vercel
- [ ] Configure environment variables
- [ ] Test production build

---

**TOTAL:** 20-26 hours
