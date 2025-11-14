# IMAGES_SCRIPT.md - Coursify

Image generation guide for AI course creation platform.

**Brand Colors:** Purple (#A855F7), Fuchsia (#EC4899), Rose (#F43F5E)

---

## IMAGES NEEDED (~20 total)

### LOGOS (4)
1. **logo-main.svg** - Graduation cap + AI circuit, purple/fuchsia gradient (Recraft V3 SVG)
2. **logo-icon.svg** - Icon only, 512x512px
3. **logo-horizontal-light.svg** - For dark backgrounds
4. **logo-horizontal-dark.svg** - For light backgrounds

### HERO (2)
1. **hero-course-creation.mp4** - Animated course builder interface (Luma Ray, 10s, 1920x1080px)
2. **hero-instructor.png** - Instructor teaching online with happy students (FLUX Pro, 1200x900px)

### FEATURE ICONS (6)
(Recraft V3, 256x256px SVG, purple/fuchsia/rose)
1. **icon-ai-generate.svg** - AI brain with course modules
2. **icon-video-lessons.svg** - Play button with film strip
3. **icon-quizzes.svg** - Checkmark with question mark
4. **icon-landing.svg** - Web page with CTA button
5. **icon-progress.svg** - Progress bar chart
6. **icon-monetize.svg** - Dollar sign with course icon

### CATEGORY EXAMPLES (6)
(FLUX Pro, course thumbnails, 800x600px)
1. **category-business.png** - Business course thumbnail
2. **category-tech.png** - Programming course thumbnail
3. **category-creative.png** - Design course thumbnail
4. **category-personal.png** - Personal development thumbnail
5. **category-language.png** - Language learning thumbnail
6. **category-health.png** - Fitness course thumbnail

### UI MOCKUPS (3)
(FLUX Pro, 1920x1080px)
1. **mockup-builder.png** - Course builder interface
2. **mockup-player.png** - Student course player
3. **mockup-analytics.png** - Instructor dashboard analytics

### TESTIMONIALS (2)
(FLUX Pro, 400x400px)
1. **testimonial-emily.jpg** - Female business coach
2. **testimonial-james.jpg** - Male tech educator

---

## REPLICATE PROMPTS

### Logo Main (Recraft V3 SVG)
```
Model: recraft-ai/recraft-v3-svg
Prompt: "Logo for 'Coursify'. Graduation cap icon with AI circuit pattern. Purple (#A855F7) to fuchsia (#EC4899) gradient. Modern, educational, innovative. Vector style."
Parameters: { "style": "digital_illustration", "size": "1024x1024" }
```

### Hero Course Creation (Luma Ray)
```
Model: luma/ray
Prompt: "Screen recording animation of online course builder interface. Modules and lessons being created, dragged, and organized. Purple/fuchsia UI. Smooth professional motion. 10-second loop."
Parameters: { "duration": 10, "aspect_ratio": "16:9" }
```

### Feature Icons (Recraft V3 SVG)
```
Icon 1: "AI brain with 3 course module boxes. Purple (#A855F7). 256x256px."
Icon 2: "Play button with film strip. Fuchsia (#EC4899). 256x256px."
Icon 3: "Checkmark inside question mark circle. Rose (#F43F5E). 256x256px."
[Continue for remaining icons]
```

### Category Examples (FLUX Pro)
```
Model: black-forest-labs/flux-pro
Category 1 - Business: "Professional course thumbnail for business strategy course. Modern office background, charts and graphs. Purple/fuchsia accents. High-quality educational content design."
[Continue for other categories]
Parameters: { "aspect_ratio": "4:3", "safety_tolerance": 2 }
```

---

**Total Cost:** ~$2.00
**Time:** 2-2.5 hours
**Storage:** ~200MB
