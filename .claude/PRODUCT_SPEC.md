# Courseify - Complete Product Specification

## Brand Concept & Vision

### What is Courseify?

**Courseify** is an AI-powered course creation platform that bridges the gap between instant AI generation and expert human instructor refinement.

**The Core Innovation:**
We combine the speed of AI with the quality of experienced educators through a seamless hybrid workflow and unified credit system.

### Value Proposition

**For Educators & Subject Matter Experts:**
- Create professional courses in hours, not weeks
- Start with AI-generated structure and content
- Refine with your expertise
- No technical skills required

**For Businesses & Training Departments:**
- Rapid onboarding course creation
- Consistent training quality
- AI generates first draft, instructors polish
- Complete course platform with hosting

### Unique Selling Points

1. **AI + Human Hybrid** - Start with AI speed, finish with instructor quality
2. **Unified Credits** - One credit system for AI generation and instructor services
3. **Complete Course Platform** - Not just content, full LMS included
4. **Multiple Formats** - Video, text, interactive quizzes, assignments
5. **White-Label Ready** - Brand it as your own
6. **Commercial Rights** - Sell courses on any platform

---

## Visual Brand Identity

### Brand Colors (CRITICAL - DO NOT DEVIATE!)

**Primary Palette:**
```
Blue Family (Educational, Trust, Structured):
- #2563EB (blue-600) - Primary action color
- #3B82F6 (blue-500) - Secondary emphasis
- #1D4ED8 (blue-700) - Hover states

Emerald Family (Growth, Progress, Success):
- #10B981 (emerald-500) - Success states
- #34D399 (emerald-400) - Highlights
- #059669 (emerald-600) - Depth

Violet Family (Creativity, Learning, Innovation):
- #7C3AED (violet-600) - Creative accent
- #8B5CF6 (violet-500) - Secondary creative
- #6D28D9 (violet-700) - Emphasis
```

**Usage Rules:**
- Primary CTAs: Blue/Emerald gradients
- Creative elements: Violet/Blue combinations
- Backgrounds: White/Slate-50
- Text: Slate-900 (headings), Slate-600 (body)

**NEVER Use:**
- ❌ Yellow (`yellow-*`)
- ❌ Orange (`orange-*`)
- ❌ Teal (`teal-*`) - use Emerald instead
- ❌ Harsh black borders
- ❌ Brutalist shadows

### Visual Style

**Typography:**
- Headings: Bold, modern (text-5xl, font-bold)
- Body: Readable, relaxed (text-lg, leading-relaxed)
- Accents: Semibold for emphasis

**Shadows (Soft & Professional):**
```css
shadow-soft-sm    - Subtle elevation
shadow-soft-md    - Card elevation
shadow-soft-lg    - Modal/popup elevation
shadow-soft-xl    - Hero element elevation
shadow-glow-blue      - Interactive glow
shadow-glow-emerald   - Success glow
shadow-glow-violet    - Creative glow
```

**Corners (Smooth & Modern):**
```css
rounded-xl    - Buttons, cards
rounded-2xl   - Large cards, sections
rounded-3xl   - Hero elements
rounded-full  - Badges, avatars
```

**Spacing (Generous & Breathable):**
- Section padding: py-24 (desktop), py-16 (mobile)
- Card padding: p-8, p-10, p-12
- Element gaps: gap-6, gap-8
- Vertical rhythm: space-y-6, space-y-8

---

## Core User Flows

### Flow 1: New User → First Course (AI Only)

```
1. User lands on homepage
   ↓
2. Clicks "Create Course" CTA
   ↓
3. [If not logged in] → Sign up/login (Clerk Auth)
   ↓
4. Arrives at /dashboard/course-brief
   ↓
5. Fills out course brief form:
   - Course title (required)
   - Subject/Category (dropdown: Business, Tech, Health, etc.)
   - Target audience (dropdown: Beginner, Intermediate, Advanced)
   - Learning objectives (textarea)
   - Course length (dropdown: 1-2 hours, 3-5 hours, 6-10 hours, 10+ hours)
   - Content type preference (Video, Text, Mixed)
   ↓
6. Clicks "Generate Course Outline" button
   ↓
7. Brief saved to database (Prisma)
   ↓
8. API call to /api/courses/generate-outline
   ↓
9. AI (Claude/GPT-4) generates course structure:
   - Module breakdown (3-8 modules)
   - Lesson plan for each module
   - Learning objectives per lesson
   - Assessment questions
   ↓
10. Loading state shows progress
    ↓
11. Generated course outline appears
    ↓
12. User reviews and can:
    - Accept outline
    - Regenerate specific modules
    - Edit module titles/descriptions
    ↓
13. User clicks "Generate Course Content"
    ↓
14. AI generates full content for each lesson:
    - Lesson scripts (for video or text)
    - Quiz questions
    - Assignments
    - Resources/references
    ↓
15. User reviews generated content
    ↓
16. User can:
    - Edit content inline
    - Regenerate specific lessons
    - Add custom content
    ↓
17. User clicks "Publish Course" or "Hire Instructor to Refine"
```

**Happy Path Checkpoints:**
- ✅ Brief form validates properly
- ✅ Outline generation completes successfully
- ✅ All modules and lessons render correctly
- ✅ Content is coherent and educational
- ✅ User can edit all content
- ✅ Publishing creates accessible course

---

### Flow 2: User → Hire Instructor (Hybrid Path)

```
1. User has AI-generated course
   ↓
2. Sees "Need expert refinement? Hire an instructor" CTA
   ↓
3. Clicks "Hire Instructor" button
   ↓
4. Modal opens explaining service:
   - "Professional instructor will review and refine your course"
   - "Add video recordings, polish content, create better assessments"
   - "2-3 revision rounds included"
   - "Delivered in 3-7 business days"
   - "Cost: 20 credits ($199) or 40 credits ($399 for rush)"
   ↓
5. User reviews course scope
   ↓
6. User adds refinement brief (what to improve)
   ↓
7. [If insufficient credits] → Redirect to /pricing
   ↓
8. Credit purchase flow:
   - Select credit package
   - Stripe checkout
   - Credits added to account
   ↓
9. Instructor request created in database
   ↓
10. Email sent to instructor team
    ↓
11. Dashboard shows "In Progress" status
    ↓
12. Instructor reviews and refines:
    - Records video lessons (if applicable)
    - Polishes content and scripts
    - Creates better assessments
    - Adds professional touches
    ↓
13. Instructor uploads refined version
    ↓
14. User receives notification
    ↓
15. User reviews refined course
    ↓
16. User approves OR requests revision
    ↓
17. Final approved course ready for publishing
```

**Happy Path Checkpoints:**
- ✅ Instructor request form complete
- ✅ Credit deduction correct
- ✅ User receives confirmation
- ✅ Status updates visible
- ✅ Instructor can upload content
- ✅ User can request revisions
- ✅ Final course meets quality standards

---

### Flow 3: Course Publishing & Hosting

```
1. User clicks "Publish Course"
   ↓
2. Publishing wizard opens:
   - Course visibility (Public, Private, Unlisted)
   - Pricing (Free, One-time payment, Subscription)
   - Course thumbnail upload
   - Course trailer (optional)
   - SEO settings (title, description, keywords)
   ↓
3. User configures settings
   ↓
4. Clicks "Publish"
   ↓
5. System processes:
   - Generates course page
   - Creates student enrollment system
   - Sets up payment integration (if paid)
   - Generates course URL (courseify.ai/course/[slug])
   ↓
6. Course is live!
   ↓
7. User gets shareable link
   ↓
8. Students can:
   - Browse course page
   - Enroll (free or paid)
   - Access course content
   - Track progress
   - Complete assessments
   - Receive certificate
```

---

## Credit System (Unified)

### Credit Economics

**What Credits Buy:**
- 1 credit = Course outline generation (up to 8 modules)
- 5 credits = Full course content generation (outline + lessons + assessments)
- 20 credits = Professional instructor refinement (standard)
- 40 credits = Professional instructor refinement (rush, 3-day)
- 10 credits = Video generation from text (AI voiceover + slides)

### Pricing Tiers

| Tier | Price | Credits/Month | Courses/Month | Instructor Access | Features |
|------|-------|---------------|---------------|-------------------|----------|
| **Free** | $0 | 5 | 1 course | ❌ | Basic AI generation, text-only courses |
| **Creator** | $49/mo | 50 | 10 courses | ✅ | Video generation, advanced AI, analytics |
| **Business** | $149/mo | 200 | Unlimited | ✅ | Everything + team (10 seats) + white-label + API access |

### Credit Purchase (À la carte)

For users who exceed monthly limits:

| Package | Price | Credits | Savings |
|---------|-------|---------|---------|
| Starter | $20 | 20 | - |
| Pro | $50 | 60 | 20% |
| Studio | $150 | 200 | 33% |
| Enterprise | $400 | 600 | 50% |

**Rules:**
- Credits never expire
- Unused monthly credits carry over (up to 2x monthly limit)
- Team seats share credit pool
- Instructor requests deduct credits immediately
- Failed generations refund credits automatically

---

## Database Schema

### Models Required

```prisma
// User & Auth
model User {
  id            String @id @default(cuid())
  email         String @unique
  name          String?
  credits       Int @default(0)
  plan          String @default("free")
  planRenewsAt  DateTime?
  briefs        CourseBrief[]
  courses       Course[]
  requests      InstructorRequest[]
  transactions  CreditTransaction[]
}

// Course Brief
model CourseBrief {
  id              String @id @default(cuid())
  userId          String
  user            User @relation(fields: [userId], references: [id])
  title           String
  category        String
  targetAudience  String
  objectives      String @db.Text
  courseLength    String
  contentType     String
  courses         Course[]
  createdAt       DateTime @default(now())
}

// Generated Course
model Course {
  id              String @id @default(cuid())
  briefId         String
  brief           CourseBrief @relation(fields: [briefId], references: [id])
  userId          String
  user            User @relation(fields: [userId], references: [id])
  title           String
  slug            String @unique
  description     String @db.Text
  thumbnail       String?
  status          String @default("draft") // "draft", "published", "archived"
  visibility      String @default("private") // "public", "private", "unlisted"
  pricing         String @default("free") // "free", "paid-once", "subscription"
  price           Float?
  modules         CourseModule[]
  enrollments     Enrollment[]
  createdAt       DateTime @default(now())
  publishedAt     DateTime?
}

// Course Module
model CourseModule {
  id          String @id @default(cuid())
  courseId    String
  course      Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  title       String
  description String? @db.Text
  order       Int
  lessons     Lesson[]
}

// Lesson
model Lesson {
  id          String @id @default(cuid())
  moduleId    String
  module      CourseModule @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  title       String
  content     String @db.Text
  contentType String // "text", "video", "quiz"
  videoUrl    String?
  duration    Int? // in minutes
  order       Int
  assessments Assessment[]
}

// Assessment (Quiz/Assignment)
model Assessment {
  id          String @id @default(cuid())
  lessonId    String
  lesson      Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  type        String // "quiz", "assignment"
  questions   Json // Array of questions with answers
}

// Student Enrollment
model Enrollment {
  id          String @id @default(cuid())
  courseId    String
  course      Course @relation(fields: [courseId], references: [id])
  userId      String
  progress    Json // Track completed lessons
  startedAt   DateTime @default(now())
  completedAt DateTime?
}

// Instructor Requests
model InstructorRequest {
  id              String @id @default(cuid())
  userId          String
  user            User @relation(fields: [userId], references: [id])
  courseId        String
  brief           String @db.Text
  priority        String // "standard", "rush"
  status          String @default("pending")
  instructorId    String?
  revisions       Revision[]
  creditsUsed     Int
  createdAt       DateTime @default(now())
  completedAt     DateTime?
}

// Revision Requests
model Revision {
  id        String @id @default(cuid())
  requestId String
  request   InstructorRequest @relation(fields: [requestId], references: [id])
  feedback  String @db.Text
  createdAt DateTime @default(now())
}

// Credit Transactions
model CreditTransaction {
  id          String @id @default(cuid())
  userId      String
  user        User @relation(fields: [userId], references: [id])
  type        String // "purchase", "earn", "spend", "refund"
  amount      Int
  balance     Int
  description String
  relatedId   String?
  createdAt   DateTime @default(now())
}
```

---

## API Routes Required

**Credits:**
- `GET /api/credits/balance` - Get current balance
- `POST /api/credits/spend` - Deduct credits
- `POST /api/credits/refund` - Refund credits
- `POST /api/credits/purchase` - Stripe checkout

**Course Briefs:**
- `POST /api/briefs/create` - Create course brief
- `GET /api/briefs` - List user's briefs
- `GET /api/briefs/[id]` - Get brief details

**Courses:**
- `POST /api/courses/generate-outline` - Generate course structure
- `POST /api/courses/generate-content` - Generate full content
- `GET /api/courses` - List user's courses
- `GET /api/courses/[id]` - Get course details
- `PATCH /api/courses/[id]` - Update course
- `POST /api/courses/[id]/publish` - Publish course
- `DELETE /api/courses/[id]` - Delete course

**Instructor Requests:**
- `POST /api/requests/create` - Create instructor request
- `GET /api/requests` - List user's requests
- `GET /api/requests/[id]` - Get request details
- `POST /api/requests/[id]/revise` - Request revision
- `POST /api/requests/[id]/approve` - Approve final version

**Enrollment:**
- `POST /api/courses/[id]/enroll` - Enroll in course
- `GET /api/enrollments` - List user's enrollments
- `PATCH /api/enrollments/[id]/progress` - Update progress

**Webhooks:**
- `POST /api/webhooks/stripe` - Stripe payment events

---

## Key Pages

### Homepage (/)

**Sections:**
1. Hero - "Create Professional Courses in Hours, Not Weeks"
2. AI + Human hybrid explanation
3. How it works (3 steps)
4. Course examples gallery
5. Features grid
6. Testimonials
7. Pricing table
8. Final CTA

### Dashboard (/dashboard)

**Layout:**
1. Welcome message + credit balance
2. Quick actions (Create Course, Hire Instructor)
3. Recent courses
4. Active instructor projects
5. Course analytics

### Course Brief (/dashboard/course-brief)

**Form Fields:**
1. Course title
2. Category/Subject
3. Target audience
4. Learning objectives
5. Course length
6. Content type preference

### Course Editor (/dashboard/courses/[id]/edit)

**Features:**
1. Module/lesson tree view
2. Content editor (rich text)
3. Add/remove modules and lessons
4. Reorder content
5. Preview course
6. Publish settings

### Pricing Page (/pricing)

**Layout:**
1. Header
2. Pricing toggle (Monthly/Annual)
3. Three-tier table
4. À la carte credits
5. Instructor services pricing
6. FAQ

---

## End Goal Verification Checklist

### Marketing Pages Complete?
- [ ] Homepage has all sections
- [ ] Pricing page shows all 3 tiers
- [ ] All CTAs work
- [ ] SEO meta tags present
- [ ] Mobile responsive
- [ ] Design system consistent (Blue/Emerald/Violet)

### User Flows Working?
- [ ] New user can sign up
- [ ] User can create course brief
- [ ] AI generates course outline
- [ ] AI generates course content
- [ ] User can edit content
- [ ] User can publish course
- [ ] User can hire instructor
- [ ] Credit system works
- [ ] Enrollment works

### Credit System Complete?
- [ ] Free tier: 5 credits/month
- [ ] Creator tier: 50 credits/month
- [ ] Business tier: 200 credits/month
- [ ] À la carte purchase works
- [ ] Credits deduct properly
- [ ] Credits refund on failure

### Database Schema Complete?
- [ ] All models defined
- [ ] Migrations run successfully
- [ ] Relationships configured
- [ ] Indexes added

### Authentication Working?
- [ ] Clerk integration complete
- [ ] Sign up/login works
- [ ] Protected routes secure
- [ ] User profile accessible

---

## Design System Confirmation

**Colors Used Everywhere:**
- ✅ Blue (#2563EB)
- ✅ Emerald (#10B981)
- ✅ Violet (#7C3AED)
- ❌ NO Yellow
- ❌ NO Orange
- ❌ NO Teal (use Emerald)
- ❌ NO Harsh black borders

**Visual Style:**
- ✅ Soft shadows (shadow-soft-*)
- ✅ Smooth corners (rounded-xl/2xl/3xl)
- ✅ Generous spacing (py-24, gap-8)
- ✅ Educational, growth-oriented, structured feel

---

This is the complete specification for Courseify. Every flow, page, and technical detail is documented.
