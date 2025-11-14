# Coursify - Brand Guide

## Brand Concept & Vision

**Coursify** is an AI-powered course creation platform that bridges the gap between instant AI generation and expert human instructor refinement.

**The Core Innovation:**
We combine the speed of AI with the quality of experienced educators through a seamless hybrid workflow and unified credit system.

---

## Brand Colors (CRITICAL - DO NOT DEVIATE!)

### Primary Palette

```css
/* Blue Family - Educational, Trust, Structured */
--primary-blue: #2563EB;        /* blue-600 - Primary action color */
--light-blue: #3B82F6;          /* blue-500 - Secondary emphasis */
--deep-blue: #1D4ED8;           /* blue-700 - Hover states */

/* Emerald Family - Growth, Progress, Success */
--primary-emerald: #10B981;     /* emerald-500 - Success states */
--light-emerald: #34D399;       /* emerald-400 - Highlights */
--deep-emerald: #059669;        /* emerald-600 - Depth */

/* Violet Family - Creativity, Learning, Innovation */
--primary-violet: #7C3AED;      /* violet-600 - Creative accent */
--light-violet: #8B5CF6;        /* violet-500 - Secondary creative */
--deep-violet: #6D28D9;         /* violet-700 - Emphasis */
```

### Usage Rules

**Primary CTAs:** Blue/Emerald gradients
```tsx
bg-gradient-to-r from-blue-600 to-emerald-500
bg-gradient-to-r from-violet-600 to-blue-600
```

**Secondary elements:** Violet/Blue combinations
```tsx
bg-gradient-to-br from-blue-500 to-violet-500
```

**Backgrounds:** White/Slate-50
**Text:** Slate-900 (headings), Slate-600 (body)

**NEVER Use (Coursify/LogoSmith template colors):**
- ❌ Yellow (`yellow-*`)
- ❌ Orange (`orange-*`)
- ❌ Teal (`teal-*`) - use Emerald instead
- ❌ Harsh black borders
- ❌ Brutalist shadows

---

## Visual Style

### Typography

**Headings:**
- Large: `text-5xl font-bold` or `text-6xl font-bold`
- Medium: `text-4xl font-bold`
- Small: `text-3xl font-semibold`

**Body:**
- Large: `text-lg leading-relaxed`
- Regular: `text-base leading-relaxed`
- Small: `text-sm`

**Colors:**
- Headings: `text-slate-900`
- Body: `text-slate-600`
- Muted: `text-slate-500`

### Shadows (Soft & Professional)

```css
/* Elevation shadows */
shadow-soft-sm    - Subtle elevation (cards, buttons)
shadow-soft-md    - Medium elevation (modals, dropdowns)
shadow-soft-lg    - Large elevation (hero sections, featured content)
shadow-soft-xl    - Extra large (popups, overlays)

/* Glow effects for interactive elements */
shadow-glow-blue      - Interactive hover (primary actions)
shadow-glow-emerald   - Success states
shadow-glow-violet    - Creative elements
```

**Custom Shadows (add to globals.css):**
```css
.shadow-soft-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-soft-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-soft-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-soft-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-glow-blue {
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
}

.shadow-glow-emerald {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

.shadow-glow-violet {
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.4);
}
```

### Corners (Smooth & Modern)

```tsx
rounded-xl     // Buttons, small cards (12px)
rounded-2xl    // Medium cards, sections (16px)
rounded-3xl    // Large hero elements (24px)
rounded-full   // Badges, avatars, pills
```

### Spacing (Generous & Breathable)

**Sections:**
```tsx
py-24          // Desktop sections
py-16          // Mobile sections
px-6           // Mobile horizontal padding
px-8           // Desktop horizontal padding
```

**Cards:**
```tsx
p-8            // Small cards
p-10           // Medium cards
p-12           // Large cards
```

**Element Gaps:**
```tsx
gap-6          // Standard element spacing
gap-8          // Generous spacing
gap-12         // Section spacing
```

**Vertical Rhythm:**
```tsx
space-y-6      // Standard vertical spacing
space-y-8      // Generous vertical spacing
space-y-12     // Section vertical spacing
```

---

## Component Patterns

### Primary Button

```tsx
<button className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-glow-blue hover:scale-105 transition-all duration-300">
  Create Course
</button>
```

### Secondary Button

```tsx
<button className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-glow-violet hover:scale-105 transition-all duration-300">
  Hire Instructor
</button>
```

### Card

```tsx
<div className="bg-white rounded-2xl shadow-soft-lg p-10 hover:shadow-glow-blue transition-all duration-300 border border-slate-100">
  <h3 className="text-2xl font-bold mb-4 text-slate-900">Card Title</h3>
  <p className="text-slate-600 leading-relaxed">Card content goes here...</p>
</div>
```

### Input Field

```tsx
<input
  type="text"
  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
  placeholder="Enter course title..."
/>
```

### Badge

```tsx
<span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-semibold">
  New Feature
</span>
```

---

## Color Usage Examples

### Homepage Hero Section

**Background:** White or subtle gradient
```tsx
bg-gradient-to-br from-blue-50 via-white to-violet-50
```

**Primary CTA:** Blue to Emerald
```tsx
bg-gradient-to-r from-blue-600 to-emerald-500
```

**Secondary CTA:** Violet to Blue
```tsx
bg-gradient-to-r from-violet-600 to-blue-600
```

### Course Creation Flow

**Step Indicators:** Blue (active), Emerald (completed), Slate (inactive)
```tsx
// Active step
bg-blue-600 text-white

// Completed step
bg-emerald-500 text-white

// Inactive step
bg-slate-200 text-slate-400
```

### Success States

**Use Emerald:**
```tsx
bg-emerald-50 border-emerald-500 text-emerald-700
```

### Learning/Creative Elements

**Use Violet:**
```tsx
bg-violet-50 border-violet-500 text-violet-700
```

---

## Before/After Examples

### Example 1: Pricing Card

**Before (Coursify/LogoSmith style):**
```tsx
<div className="border-4 border-black shadow-[0_8px_0_0_#000] rounded p-6">
  <h3 className="text-2xl font-black mb-2">Pro Plan</h3>
  <div className="text-4xl font-black text-teal-400 mb-4">$49</div>
  <button className="bg-teal-400 text-black border-4 border-black px-6 py-2 font-black">
    Get Started
  </button>
</div>
```

**After (Coursify style):**
```tsx
<div className="bg-white rounded-3xl shadow-soft-xl p-10 hover:shadow-glow-blue transition-all duration-300 border border-slate-100">
  <h3 className="text-3xl font-bold mb-4 text-slate-900">Pro Plan</h3>
  <div className="text-5xl font-bold mb-8">
    <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">$49</span>
  </div>
  <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-glow-blue transition-all duration-300">
    Get Started
  </button>
</div>
```

### Example 2: Course Card

**Before (Generic):**
```tsx
<div className="border rounded p-4 shadow">
  <h4 className="text-xl font-bold">Introduction to React</h4>
  <p className="text-gray-600">Learn React basics...</p>
  <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
    Start Learning
  </button>
</div>
```

**After (Coursify style):**
```tsx
<div className="bg-white rounded-2xl shadow-soft-lg p-8 hover:shadow-glow-violet transition-all duration-300 border border-slate-100">
  <div className="flex items-center gap-3 mb-4">
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white text-xs font-semibold">
      Beginner
    </span>
  </div>
  <h4 className="text-2xl font-bold mb-3 text-slate-900">Introduction to React</h4>
  <p className="text-slate-600 leading-relaxed mb-6">Learn React basics and build your first interactive application...</p>
  <button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-glow-blue transition-all duration-300">
    Start Learning
  </button>
</div>
```

---

## Anti-Patterns (What to Avoid)

### Colors

❌ **Wrong:**
```tsx
className="bg-yellow-500"
className="bg-orange-600"
className="bg-teal-500"  // Use emerald-500 instead
className="text-amber-400"
```

✅ **Correct:**
```tsx
className="bg-blue-600"
className="bg-emerald-500"
className="bg-violet-600"
className="bg-gradient-to-r from-blue-600 to-emerald-500"
```

### Shadows

❌ **Wrong:**
```tsx
className="shadow-[0_8px_0_0_#000]"  // Brutalist
className="border-4 border-black"     // Too harsh
```

✅ **Correct:**
```tsx
className="shadow-soft-lg"
className="shadow-glow-blue"
className="border border-slate-200"
```

### Spacing

❌ **Wrong:**
```tsx
className="py-4 px-2"  // Too cramped
className="mb-2"       // Insufficient spacing
```

✅ **Correct:**
```tsx
className="py-24 px-6"
className="mb-8"
className="gap-8"
```

### Corners

❌ **Wrong:**
```tsx
className="rounded"      // Too small
className="rounded-sm"   // Too sharp
```

✅ **Correct:**
```tsx
className="rounded-xl"
className="rounded-2xl"
className="rounded-3xl"
```

---

## Brand Personality

### Visual Attributes

- **Educational:** Blue conveys trust and structure
- **Growth-Oriented:** Emerald represents progress and success
- **Creative:** Violet adds innovation and learning energy
- **Professional:** Soft shadows and generous spacing
- **Modern:** Smooth gradients and rounded corners
- **Accessible:** High contrast, clear typography

### Emotional Tone

- **Confident:** Bold colors, clear typography
- **Supportive:** Generous spacing, soft shadows
- **Innovative:** Creative use of gradients, violet accents
- **Trustworthy:** Professional blue, structured layout
- **Inspiring:** Emerald for success, uplifting color combinations

---

## Design System Checklist

Use this checklist when creating or reviewing components:

- [ ] Uses only brand colors (Blue, Emerald, Violet)
- [ ] No yellow, orange, teal, or amber
- [ ] Soft shadows (shadow-soft-*) or glows (shadow-glow-*)
- [ ] No harsh black borders
- [ ] Rounded corners (rounded-xl, rounded-2xl, rounded-3xl)
- [ ] Generous spacing (py-24, gap-8, p-10)
- [ ] Smooth transitions (duration-300)
- [ ] Hover states with scale or glow effects
- [ ] Readable typography (text-lg, leading-relaxed)
- [ ] High contrast text (slate-900 on white)
- [ ] Mobile responsive
- [ ] Accessible (ARIA labels, keyboard navigation)

---

## Quick Reference

**Primary Gradient:** `from-blue-600 to-emerald-500`
**Secondary Gradient:** `from-violet-600 to-blue-600`
**Creative Gradient:** `from-blue-500 to-violet-500`

**Shadow:** `shadow-soft-lg`
**Hover Glow:** `hover:shadow-glow-blue`
**Transition:** `transition-all duration-300`

**Section Padding:** `py-24` (desktop), `py-16` (mobile)
**Card Padding:** `p-8`, `p-10`, `p-12`
**Corners:** `rounded-xl`, `rounded-2xl`, `rounded-3xl`

**Heading:** `text-5xl font-bold text-slate-900`
**Body:** `text-lg leading-relaxed text-slate-600`

---

**Last Updated:** 2025-01-12
**For:** Coursify (AI Course Creation Platform)
**Colors:** Blue #2563EB, Emerald #10B981, Violet #7C3AED
