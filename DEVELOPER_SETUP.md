# Developer Setup Guide - Courseify

Welcome to Courseify! This guide will help you get started as a new developer on this project.

**This is a complete beginner-friendly guide with step-by-step instructions. Follow every step carefully.**

---

## 🚀 Complete Beginner Setup (Start Here!)

### Part 1: Get Your Tools (30 minutes)

#### Step 1.1: Install VS Code (Code Editor)

1. Go to https://code.visualstudio.com/
2. Click the big blue "Download" button
3. Run the installer
4. Open VS Code after installation

**Verify it works:**
- You should see VS Code window open
- Click "File" → "New File" to test

#### Step 1.2: Install Claude Code CLI (AI Development Assistant)

**What is Claude Code?**
Claude Code is an AI-powered CLI tool that helps you write code, fix bugs, and ensure quality. It's **REQUIRED** for this project because it provides guardrails and catches errors before they reach production.

**Installation Steps:**

1. **Go to:** https://claude.com/claude-code
2. **Click "Download Claude Code"**
3. **Choose your operating system:**
   - Mac: Download the `.dmg` file
   - Windows: Download the `.exe` file
   - Linux: Follow the terminal instructions

4. **Install it:**
   - Mac: Open the `.dmg` file and drag Claude Code to Applications
   - Windows: Run the `.exe` installer
   - Linux: Run the install script from terminal

5. **Verify installation:**
   ```bash
   # Open your terminal (Mac/Linux) or Command Prompt (Windows)
   # Type this command:
   claude --version
   ```
   You should see a version number like `claude-code v1.0.0`

#### Step 1.3: Create Claude Account & Subscribe

**IMPORTANT:** Claude Code requires a subscription to use. Your team may provide this, or you'll need to subscribe yourself.

1. **Open Claude Code** (from Applications on Mac, or Start Menu on Windows)

2. **You'll see a login screen:**
   - Click "Create Account" if you don't have one
   - Or "Sign In" if you already have an Anthropic account

3. **Create Account:**
   - Enter your email address
   - Create a secure password
   - Verify your email (check your inbox)

4. **Subscribe to Claude Code:**
   - After logging in, you'll be prompted to subscribe
   - Click "Subscribe" or "Start Trial"
   - Enter payment details (credit/debit card)
   - **Cost:** Check current pricing at https://claude.com/claude-code
   - **Note:** Some teams provide a company subscription - check with your lead first!

5. **Verify subscription:**
   - You should see "Subscription Active" in Claude Code
   - Try running: `claude chat` in terminal
   - Type `exit` to quit the test chat

#### Step 1.4: Install Node.js (JavaScript Runtime)

1. Go to https://nodejs.org/
2. Download the **LTS** version (left button, currently Node 18 or 20)
3. Run the installer (keep all default settings)
4. Restart your terminal/command prompt

**Verify it works:**
```bash
node --version
# Should show v18.x.x or v20.x.x

npm --version
# Should show 9.x.x or 10.x.x
```

#### Step 1.5: Install Git (Version Control)

**Mac/Linux:**
- Usually pre-installed
- Test by running: `git --version`
- If not installed, download from: https://git-scm.com/

**Windows:**
1. Go to: https://git-scm.com/downloads
2. Download for Windows
3. Run installer (keep all defaults, select "Use Git from Git Bash")
4. Restart terminal

**Verify it works:**
```bash
git --version
# Should show git version 2.x.x
```

---

### Part 2: Get Access to Project (Ask Your Team Lead)

#### Step 2.1: Request GitHub Access

**What you need to tell your team lead:**
> "Hi! I'm starting on Courseify. I need:
> 1. Access to the GitHub repository
> 2. Development API keys (Replicate, Vercel Blob, Database)
> 3. Database connection URL for development
>
> My GitHub username is: [YOUR_GITHUB_USERNAME]"

**They will send you:**
- ✉️ GitHub repository invitation (check your email)
- 🔑 `.env.local` file with API keys OR instructions to get them
- 📊 Database connection string

#### Step 2.2: Accept GitHub Invitation

1. Check your email for "Invitation to join [organization]"
2. Click "Accept Invitation"
3. You should now see the repository when you go to GitHub

---

### Part 3: Clone and Setup Project (20 minutes)

#### Step 3.1: Clone the Repository

1. **Open your terminal** (Mac/Linux) or **Git Bash** (Windows)

2. **Navigate to where you want the project:**
   ```bash
   # Go to your Documents folder (or wherever you keep projects)
   cd ~/Documents
   # Or on Windows:
   cd C:\Users\YourName\Documents
   ```

3. **Clone the repository:**
   ```bash
   git clone [REPOSITORY_URL_FROM_YOUR_TEAM_LEAD]
   cd courseify
   ```

4. **Verify you're in the right place:**
   ```bash
   ls
   # You should see: package.json, README.md, app/, components/, etc.
   ```

#### Step 3.2: Install Dependencies

```bash
npm install
```

This will take 2-5 minutes. You'll see a progress bar.

**If you see errors:**
- Make sure you're in the `courseify` folder: `pwd` (should show the path to courseify)
- Make sure Node.js is installed: `node --version`
- Try deleting `node_modules` and running again: `rm -rf node_modules && npm install`

#### Step 3.3: Setup Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Open `.env.local` in VS Code:**
   ```bash
   code .env.local
   ```

3. **Fill in the values your team lead gave you:**
   ```env
   DATABASE_URL="postgresql://..."  # From team lead
   REPLICATE_API_TOKEN="r8_..."      # From team lead
   BLOB_READ_WRITE_TOKEN="vercel_blob_..."  # From team lead
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Save the file** (Cmd+S on Mac, Ctrl+S on Windows)

#### Step 3.4: Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

**If you see errors:**
- Check your `DATABASE_URL` in `.env.local` is correct
- Ask your team lead for the correct database URL

---

### Part 4: Run Your First Claude Code Command (10 minutes)

#### Step 4.1: Open Project in Claude Code

1. **Make sure you're in the project folder:**
   ```bash
   cd ~/Documents/courseify  # Or wherever you cloned it
   ```

2. **Start Claude Code:**
   ```bash
   claude
   ```

   You should see:
   ```
   Claude Code is ready to help!
   Working directory: /path/to/courseify
   Type 'exit' to quit.
   ```

#### Step 4.2: Run Initial Setup

**In Claude Code, type:**
```
/setup
```

**What this does:**
- Checks your installation
- Runs ESLint and product quality checks
- Helps you identify and fix any issues
- Stabilizes your development environment

**Follow Claude Code's instructions carefully.**

Claude will:
1. Check if everything is installed correctly
2. Run linting and find issues
3. Help you determine if issues are real or false positives
4. Guide you through fixing real issues
5. Help you document false positives

**This may take 15-30 minutes on first run.** That's normal!

#### Step 4.3: Start Development Server

**After setup is complete**, start the dev server:

```bash
# In a new terminal window (keep Claude Code open in another)
npm run dev
```

**Open your browser:** http://localhost:3000

**You should see:**
- Courseify homepage
- Warm colors (coral/orange/lime)
- Rounded corners and friendly design
- No console errors in browser DevTools (F12)

---

### Part 5: Your First Task - Example Workflow (30 minutes)

Let's walk through a complete example of fixing a bug using Claude Code.

#### Example Bug: "Download button not working on mobile"

**Step 1: Open Claude Code**
```bash
# Make sure you're in project directory
cd ~/Documents/courseify

# Start Claude
claude
```

**Step 2: Use the /bug command**

In Claude Code, type:
```
/bug
```

Claude will ask: "Now, please describe the bug you're experiencing."

**You respond:**
```
The download button for portraits doesn't work on mobile devices. When I tap it, nothing happens. It works fine on desktop.
```

**Step 3: Claude investigates**

Claude will:
1. Ask clarifying questions (answer them)
2. Search the codebase for download-related code
3. Check for mobile-specific issues
4. Identify the root cause

**Example questions Claude might ask:**
- "What browser are you testing on mobile? (Safari, Chrome, Firefox?)"
- "Do you see any errors in the browser console?"
- "Does the button visually respond to taps (like a click animation)?"

**Step 4: Claude proposes a fix**

Claude will show you the code change, like:

```tsx
// Found the issue in: components/portraits/PortraitCard.tsx

// The problem:
<button onClick={handleDownload}>
  Download
</button>

// The fix:
<button
  onClick={handleDownload}
  onTouchEnd={handleDownload}  // Added for mobile support
>
  Download
</button>
```

**Step 5: Claude tests the fix**

Claude will:
- Apply the fix
- Run TypeScript check
- Run ESLint
- Run product quality checks
- Test the functionality

**Step 6: You verify**

Open http://localhost:3000 in your browser's mobile view:
1. Press F12 (DevTools)
2. Click the mobile icon (top left)
3. Test the download button
4. Verify it works!

**Step 7: Review and commit**

Back in Claude Code:
```
/review
```

Claude will review the changes for:
- Code quality
- Security
- Design system compliance
- Accessibility

If everything passes:
```bash
# In terminal (not Claude Code)
git add .
git commit -m "Fix: Download button now works on mobile devices

- Added onTouchEnd handler for mobile touch events
- Tested on mobile view
- All quality checks pass
"
```

---

## 🎯 Prerequisites (From here, original guide continues)

### Required Tools

1. **GitHub Account** with access to the repository
   - You will be provided with access to: `[REPOSITORY_URL]`
   - Make sure you can clone the repository

2. **Claude Code CLI** (REQUIRED)
   - Install from: https://claude.com/claude-code
   - This is an AI-powered development assistant
   - You will use Claude Code for development, bug fixes, and reviews
   - **Why**: Claude Code provides guardrails and best practices for non-technical or less experienced developers

3. **Node.js 18+**
   - Download from: https://nodejs.org/
   - Verify: `node --version`

4. **Git**
   - Usually pre-installed on Mac/Linux
   - Windows: https://git-scm.com/downloads

---

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone [REPOSITORY_URL]
cd courseify
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your local configuration:

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
BLOB_READ_WRITE_TOKEN="vercel_blob_..."
REPLICATE_API_TOKEN="r8_..."
```

Ask your team lead for the development API keys.

### Step 4: Set Up Database

```bash
npx prisma generate
npx prisma db push
```

### Step 5: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## 🤖 Working with Claude Code

### What is Claude Code?

Claude Code is an AI coding assistant that helps you:
- Fix bugs properly without cutting corners
- Implement features following best practices
- Review code for quality and security
- Prepare for production deployment
- Learn the codebase quickly

### Available Slash Commands

We've created custom commands to help you work effectively:

#### `/bug` - Fix Bugs Properly
When you encounter a bug, use this command:

```
/bug
```

Then describe the bug. Claude Code will:
1. Understand what's wrong
2. Check if functionality exists but isn't wired correctly
3. Find the root cause (not just symptoms)
4. Implement a proper fix
5. Test the fix thoroughly
6. Ensure no corners are cut

**Example:**
```
/bug
Portrait download button doesn't work on mobile
```

#### `/feature` - Implement New Features
When adding a new feature:

```
/feature
```

Describe what you want to build. Claude Code will:
1. Help you plan the implementation
2. Check for existing similar code
3. Guide you through database, API, and UI changes
4. Ensure quality standards are met
5. Test thoroughly

**Example:**
```
/feature
Add ability to batch upload multiple pet photos
```

#### `/review` - Code Review
Before committing code:

```
/review
```

Claude Code will review your changes for:
- Code quality
- Security issues
- Performance problems
- Design system compliance
- Accessibility
- Error handling

#### `/test` - Systematic Testing
When you need to test:

```
/test
```

Choose from:
- Quick smoke test (5 min)
- Full functionality test (20 min)
- Specific feature test
- Complete test suite (60 min)

#### `/pre-production` - Production Checklist
Before deploying to production:

```
/pre-production
```

This runs through a comprehensive checklist of 50+ items to ensure production readiness.

### Best Practices with Claude Code

✅ **DO:**
- Use slash commands for structured workflows
- Ask questions if anything is unclear
- Let Claude Code check for existing code before creating new code
- Follow Claude Code's recommendations for quality
- Use Claude Code to learn patterns in the codebase

❌ **DON'T:**
- Skip the guardrails and checks
- Ignore Claude Code's security warnings
- Commit code without running `/review`
- Deploy without running `/pre-production`

---

## 📁 Project Structure

```
courseify/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard pages
│   ├── (marketing)/       # Public marketing pages
│   └── (legal)/           # Legal pages (privacy, terms, etc.)
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── marketing/        # Marketing-specific components
├── lib/                   # Utilities and helpers
├── prisma/               # Database schema
├── public/               # Static assets
├── .claude/              # Claude Code configuration
│   └── commands/         # Custom slash commands
└── docs/                 # Documentation
```

---

## 🎨 Design System

Courseify uses a **warm, playful, pet-friendly** design system:

### Colors (ONLY use these!)
- **Primary**: Coral `#FF7F50` - Warm and inviting
- **Secondary**: Rose `#F43F5E` - Soft and loving
- **Accent**: Lime `#84CC16` - Fresh and vibrant

### Never Use
❌ Indigo, Blue, Purple (except for specific accent cases)
❌ Arbitrary color values like `bg-[#FF0000]`

### Styling Rules
- Very rounded corners: `rounded-2xl` or `rounded-3xl` (16-32px)
- Soft warm shadows with coral tints
- Playful animations (bounce, wiggle, heart pulse)
- Generous spacing for cozy experience

### Check Your Code
Run product quality checks to ensure design system compliance:

```bash
npm run lint:product
```

---

## 🧪 Testing Your Changes

### 1. Type Check
```bash
npx tsc --noEmit
```

### 2. Lint
```bash
npm run lint
```

### 3. Product Quality
```bash
npm run lint:product
```

### 4. Build Test
```bash
npm run build
```

### 5. Manual Testing
Use Claude Code's `/test` command for guided testing.

---

## 🐛 Common Issues

### Database Connection Failed
```bash
# Check your DATABASE_URL in .env
# Try regenerating Prisma client
npx prisma generate
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Replicate API Errors
- Check your `REPLICATE_API_TOKEN` is valid
- Verify you have credits in your Replicate account
- Check API rate limits

---

## 📚 Key Documentation

- `README.md` - Project overview
- `DESIGN_SYSTEM.md` - Complete design guide
- `PRODUCTION_CHECKLIST.md` - Pre-deployment checklist
- `PRODUCT_QUALITY_CHECKS.md` - Automated quality checks
- `docs/ARCHITECTURE.md` - System architecture
- `docs/API.md` - API documentation
- `docs/DATABASE.md` - Database schema

---

## 👥 Human-in-the-Loop System

Courseify implements a Human-in-the-Loop approach where certain portraits can be assigned to human executors for manual review or enhancement.

### How It Works

1. **AI Generation First**: All portraits are initially generated by AI
2. **Quality Check**: Portraits can be flagged for human review if quality is questionable
3. **Executor Assignment**: Portraits can be assigned to human executors (professional artists/retouchers)
4. **Manual Enhancement**: Human executor improves the portrait
5. **Delivery**: Enhanced portrait is returned to the user

### For Developers

When implementing features related to portrait generation:

- Check `Portrait` model in `prisma/schema.prisma` for executor assignment fields
- API routes in `app/api/portraits/` handle executor workflow
- Dashboard includes executor management (future feature)

---

## 🔒 Security Rules

### Never Commit
❌ API keys or secrets
❌ `.env` files
❌ Database credentials
❌ User data or test data with PII

### Always
✅ Use Zod validation for all API inputs
✅ Check authentication before sensitive operations
✅ Validate file uploads strictly
✅ Use TypeScript types (no `any`)
✅ Handle errors gracefully

---

## 📞 Getting Help

### Use Claude Code First
For most development questions, use Claude Code:
- `/bug` for fixing issues
- `/feature` for building new things
- Ask questions about the codebase

### Ask Your Team
- Slack channel: #petportrait-dev
- Team lead: [NAME]
- Code review: Use `/review` command first, then request human review

### External Resources
- Next.js docs: https://nextjs.org/docs
- Prisma docs: https://www.prisma.io/docs
- Replicate docs: https://replicate.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

## ✅ Your First Task

1. ✅ Clone repository
2. ✅ Install dependencies
3. ✅ Set up environment variables
4. ✅ Run development server
5. ✅ Familiarize yourself with Claude Code
6. ✅ Read `DESIGN_SYSTEM.md`
7. ✅ Run through the codebase with Claude Code
8. ✅ Try `/test` with a quick smoke test
9. ✅ Pick a small bug from GitHub Issues and fix it using `/bug`
10. ✅ Submit your first PR!

---

**Welcome aboard! 🐾 Let's create amazing pet portraits together!**
