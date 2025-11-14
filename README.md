# Coursify - AI-Powered Online Course Creation Platform

**Transform your knowledge into engaging online courses with AI assistance**

Coursify is a Next.js-based platform that enables educators and content creators to build comprehensive online courses using AI-powered content generation. Create course structures, lessons, quizzes, and more with the help of OpenAI's GPT-4.

---

## 🚀 Features

### Core Functionality
- **AI Course Generation** - Generate complete course structures with modules and lessons using OpenAI GPT-4
- **AI Quiz Creation** - Automatically generate quiz questions with explanations for any lesson
- **Course Builder** - Interactive 3-step course creation workflow (Topic → Generation → Preview)
- **Student Portal** - Feature-rich course viewing experience with progress tracking
- **Module & Lesson Management** - Organize content into hierarchical structures
- **Interactive Quizzes** - Built-in quiz player with immediate feedback and explanations
- **Progress Tracking** - Track student progress through lessons and modules
- **Enrollment System** - Manage student enrollments and course access

### Technical Features
- **Next.js 16.0.1** with App Router and Turbopack
- **TypeScript** for type-safe development
- **Prisma ORM** with PostgreSQL (Neon) database
- **OpenAI API** integration with template fallbacks
- **Vercel Blob Storage** for file uploads
- **NextAuth** for authentication
- **Tailwind CSS v4** with custom design system
- **Product Quality ESLint** rules for brand consistency

---

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (we recommend [Neon](https://neon.tech))
- OpenAI API key (optional - falls back to templates)
- Vercel Blob Storage token (optional)

---

## 🛠 Installation

### 1. Clone the repository

```bash
git clone https://github.com/souldevsoul/coursify.git
cd coursify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# OpenAI API (for AI course generation)
# Get your key at: https://platform.openai.com/api-keys
OPENAI_API_KEY="sk-..."

# Vercel Blob Storage (optional - for file uploads)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32

# Optional: Replicate API (for future video generation)
REPLICATE_API_TOKEN="r8_..."
```

### 4. Set up the database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

---

## 🏗 Project Structure

```
coursify/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── courses/              # Course CRUD operations
│   │   │   ├── generate/         # AI course generation
│   │   │   └── [id]/             # Individual course operations
│   │   ├── lessons/              # Lesson operations
│   │   │   └── [id]/generate-quiz/  # AI quiz generation
│   │   ├── enrollments/          # Student enrollment management
│   │   └── auth/                 # Authentication endpoints
│   ├── courses/                  # Course viewing pages
│   │   ├── page.tsx              # Course catalog
│   │   └── [id]/page.tsx         # Individual course view
│   ├── builder/                  # Course creation wizard
│   ├── dashboard/                # Instructor dashboard
│   └── page.tsx                  # Homepage
├── components/
│   ├── coursify/                 # Coursify-specific components
│   │   ├── course-content.tsx   # Course viewer with sidebar
│   │   ├── course-topic-form.tsx  # Course creation form
│   │   ├── quiz-player.tsx      # Interactive quiz component
│   │   └── ...
│   ├── ui/                       # Reusable UI components
│   └── marketing/                # Marketing site components
├── lib/
│   ├── openai.ts                 # OpenAI integration
│   ├── prisma.ts                 # Prisma client
│   └── auth.ts                   # NextAuth configuration
├── prisma/
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
└── types/                        # TypeScript type definitions
```

---

## 📊 Database Schema

### Core Models

**Course**
- Course metadata (title, description, category, difficulty)
- Pricing and publishing status
- Relations to modules, enrollments, and user

**Module**
- Organized sections within a course
- Sequential ordering
- Contains multiple lessons

**Lesson**
- Individual learning units
- Supports article, video, and quiz types
- Rich content with Markdown support
- Optional quiz attachment

**Quiz**
- Multiple-choice questions with explanations
- Configurable passing score
- Tracks student attempts

**Enrollment**
- Links students to courses
- Tracks progress percentage
- Records completed lessons
- Timestamps for enrolled and completed dates

---

## 🎨 Design System

Coursify uses a custom purple/pink gradient theme:

```css
/* Primary Colors */
--color-purple-500: #A855F7;   /* Creative, inspiring */
--color-fuchsia-500: #EC4899;  /* Engaging */
--color-pink-500: #F43F5E;     /* Passionate */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #A855F7 0%, #EC4899 100%);
--gradient-hero: linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #F43F5E 100%);
```

**Approved Colors**: black, white, transparent, current, inherit, slate-*, gray-*, purple-*, fuchsia-*, pink-*, rose-*, red-*, green-*

---

## 🔑 Key API Endpoints

### Courses
- `GET /api/courses` - List all courses (with filters)
- `POST /api/courses` - Create a new course
- `POST /api/courses/generate` - **AI-generate course structure**
- `GET /api/courses/[id]` - Get course details
- `PATCH /api/courses/[id]` - Update course
- `DELETE /api/courses/[id]` - Delete course

### Lessons
- `POST /api/lessons` - Create a lesson
- `POST /api/lessons/[id]/generate-quiz` - **AI-generate quiz for lesson**

### Enrollments
- `GET /api/enrollments?userId=...` - List user enrollments
- `POST /api/enrollments` - Enroll student in course
- `POST /api/enrollments/[id]/progress` - Update lesson progress

---

## 🤖 AI Integration

### Course Generation

```typescript
import { generateCourseWithAI } from '@/lib/openai'

const courseStructure = await generateCourseWithAI(
  'Introduction to Web Development',  // topic
  'technology',                         // category
  'beginner'                            // difficulty
)

// Returns:
// {
//   title: "Complete Introduction to Web Development",
//   description: "Learn web development from scratch...",
//   modules: [
//     {
//       title: "HTML Fundamentals",
//       description: "Master the building blocks of the web",
//       lessons: [
//         {
//           title: "What is HTML?",
//           content: "Detailed lesson content...",
//           type: "article",
//           duration: 15
//         },
//         ...
//       ]
//     },
//     ...
//   ]
// }
```

### Quiz Generation

```typescript
import { generateQuizWithAI } from '@/lib/openai'

const questions = await generateQuizWithAI(
  'Introduction to Variables',  // lesson title
  lessonContent                  // lesson content
)

// Returns array of:
// [
//   {
//     question: "What is a variable?",
//     options: ["Option A", "Option B", "Option C", "Option D"],
//     correctAnswer: 0,
//     explanation: "Variables are containers for storing data..."
//   },
//   ...
// ]
```

### Template Fallbacks

If `OPENAI_API_KEY` is not configured, both functions automatically fall back to template-based generation, ensuring the platform works without API keys.

---

## 🧪 Development Scripts

```bash
# Development
npm run dev                    # Start dev server (localhost:3000)

# Production
npm run build                  # Build for production
npm start                      # Start production server

# Code Quality
npm run lint                   # Run all linters
npm run lint:product           # Run product quality checks (brand colors, etc.)
npm run lint:product:fix       # Auto-fix product quality issues

# Database
npx prisma generate            # Generate Prisma Client
npx prisma db push             # Push schema to database
npx prisma studio              # Open Prisma Studio (database GUI)
```

---

## 📱 Pages and Routes

### Public Pages
- `/` - Homepage with feature showcase
- `/courses` - Browse all available courses
- `/courses/[id]` - View and take a course
- `/pricing` - Pricing plans
- `/features` - Feature details
- `/about` - About the platform

### Authenticated Pages
- `/dashboard` - Instructor dashboard
- `/builder` - AI course creation wizard
- `/signup` - User registration
- `/auth/signin` - User login

### Course Viewing Experience
The `/courses/[id]` page provides:
- **Sidebar navigation** with module/lesson structure
- **Progress tracking** with visual indicators
- **Lesson content** display (articles, videos)
- **Interactive quizzes** with immediate feedback
- **Automatic completion** tracking
- **Navigation buttons** for previous/next lessons

---

## 🎯 User Workflows

### Creating a Course (Instructor)

1. Navigate to `/builder`
2. Enter course topic, category, and difficulty level
3. Click "Generate Course Structure"
4. AI generates complete course with modules and lessons
5. Review and customize the generated content
6. Publish course to make it available to students

### Taking a Course (Student)

1. Browse courses at `/courses`
2. Select a course to view details
3. Enroll in the course
4. Navigate through lessons using the sidebar
5. Complete lessons and quizzes
6. Track progress with the progress bar
7. Earn completion certificate when finished

---

## 🔒 Authentication

Coursify uses NextAuth.js with multiple providers:

- **Email/Password** (Credentials provider)
- **Google OAuth** (optional)
- **GitHub OAuth** (optional)

Configure providers in `lib/auth.ts`:

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({ /* ... */ }),
    GoogleProvider({ /* ... */ }),
    GitHubProvider({ /* ... */ }),
  ],
  // ...
}
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Environment Variables for Production

Ensure these are set in your production environment:
- `DATABASE_URL` - Production PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API key
- `NEXTAUTH_URL` - Production domain
- `NEXTAUTH_SECRET` - Secure random string
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob token (if using uploads)

---

## 🐛 Troubleshooting

### Build Errors

**"Module not found" errors**
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

**TypeScript errors**
```bash
# Regenerate Prisma Client
npx prisma generate
```

### Database Issues

**"Can't reach database server"**
- Check DATABASE_URL format
- Verify database is running
- Check firewall/network settings

**Schema mismatch**
```bash
# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

### OpenAI Integration

**"No response from OpenAI"**
- Verify OPENAI_API_KEY is set correctly
- Check API key has sufficient credits
- Platform will fall back to templates automatically

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For questions or support:
- Email: support@coursify.ai
- GitHub Issues: [Report a bug](https://github.com/souldevsoul/coursify/issues)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [OpenAI](https://openai.com/)
- Database by [Neon](https://neon.tech/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)

---

**Made with ❤️ for educators and learners worldwide**
