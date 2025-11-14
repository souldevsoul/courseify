"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import {
  RiSparklingLine,
  RiBookOpenLine,
  RiVideoLine,
  RiQuestionLine,
  RiGlobalLine,
  RiBarChartBoxLine,
  RiShieldCheckLine,
  RiAwardLine,
  RiTeamLine,
  RiDatabase2Line,
  RiCodeLine,
  RiPaletteLine,
  RiArrowRightLine,
  RiCheckDoubleLine,
  RiGraduationCapLine,
} from "react-icons/ri"

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: RiSparklingLine,
      title: "AI Course Generation",
      subtitle: "GPT-4 POWERED",
      description: "Generate complete course structures with AI. Built on GPT-4 and Claude for intelligent content generation. Proven reliability, exceptional quality, lightning-fast course creation.",
      features: [
        "AI-powered course structure generation",
        "Natural, engaging lesson content",
        "Multiple subject areas supported",
        "Automatic lesson organization",
        "Customizable difficulty levels",
        "Smart content adaptation"
      ]
    },
    {
      icon: RiVideoLine,
      title: "Video Lesson Creation",
      subtitle: "AUTOMATED VIDEO GENERATION",
      description: "Create engaging video lessons automatically. AI generates scripts, visuals, and narration. Transform your course content into professional video lessons in minutes.",
      features: [
        "Automated video script generation",
        "AI-powered visual creation",
        "Professional voice narration",
        "Customizable video templates",
        "HD quality output",
        "Multiple aspect ratios"
      ]
    },
    {
      icon: RiQuestionLine,
      title: "Automatic Quiz Generation",
      subtitle: "INTELLIGENT ASSESSMENTS",
      description: "Generate quizzes automatically from lesson content. Multiple question types, difficulty levels, and instant feedback. Perfect for assessing student understanding.",
      features: [
        "Multiple choice questions",
        "True/false questions",
        "Fill-in-the-blank",
        "Configurable difficulty",
        "Instant grading",
        "Detailed explanations"
      ]
    },
    {
      icon: RiBarChartBoxLine,
      title: "Progress Tracking & Analytics",
      subtitle: "DATA-DRIVEN INSIGHTS",
      description: "Track student progress with comprehensive analytics. Monitor completion rates, quiz scores, and engagement metrics. Identify struggling students and optimize content.",
      features: [
        "Real-time progress tracking",
        "Completion rate analytics",
        "Quiz performance metrics",
        "Engagement statistics",
        "Student activity logs",
        "Export detailed reports"
      ]
    },
    {
      icon: RiGlobalLine,
      title: "Multilingual Content",
      subtitle: "50+ LANGUAGES",
      description: "Create courses in 50+ languages with native-quality content. AI-powered translation and localization. Reach global audiences with multilingual course support.",
      features: [
        "50+ languages supported",
        "Native-quality translations",
        "Cultural adaptation",
        "Localized examples",
        "Multi-language quizzes",
        "Automatic language detection"
      ]
    },
    {
      icon: RiAwardLine,
      title: "Certificate Generation",
      subtitle: "PROFESSIONAL CREDENTIALS",
      description: "Generate professional certificates for course completion. Customizable templates, digital signatures, and verification. Recognize student achievements with beautiful certificates.",
      features: [
        "Customizable certificate templates",
        "Digital signature support",
        "Verification codes",
        "PDF download",
        "Batch certificate generation",
        "Branded design options"
      ]
    },
    {
      icon: RiShieldCheckLine,
      title: "LMS Integration",
      subtitle: "SEAMLESS CONNECTIVITY",
      description: "Integrate with popular Learning Management Systems. SCORM 1.2 and 2004 support, xAPI/Tin Can, and custom API. Deploy courses anywhere.",
      features: [
        "SCORM 1.2 & 2004 support",
        "xAPI/Tin Can compatibility",
        "LTI integration",
        "Custom API access",
        "Single sign-on (SSO)",
        "Grade passback support"
      ]
    },
    {
      icon: RiPaletteLine,
      title: "Course Customization",
      subtitle: "YOUR BRAND, YOUR WAY",
      description: "Customize every aspect of your courses. Brand colors, logos, layouts, and styling. Create courses that match your unique brand identity.",
      features: [
        "Custom branding options",
        "Color theme customization",
        "Logo placement",
        "Layout templates",
        "Font selections",
        "CSS customization"
      ]
    },
    {
      icon: RiGraduationCapLine,
      title: "Instructional Design",
      subtitle: "PEDAGOGICALLY SOUND",
      description: "Built on proven instructional design principles. Bloom's Taxonomy, ADDIE model, and learning science. AI creates courses that actually teach effectively.",
      features: [
        "Bloom's Taxonomy alignment",
        "ADDIE model implementation",
        "Learning objectives mapping",
        "Assessment alignment",
        "Scaffolded learning",
        "Knowledge retention focus"
      ]
    },
    {
      icon: RiDatabase2Line,
      title: "Content Library",
      subtitle: "REUSABLE ASSETS",
      description: "Build and manage your content library. Reuse lessons, quizzes, and resources across courses. Organize assets with tags, categories, and search.",
      features: [
        "Centralized asset management",
        "Drag-and-drop organization",
        "Advanced search & filters",
        "Version control",
        "Bulk operations",
        "Import/export support"
      ]
    },
    {
      icon: RiCodeLine,
      title: "Developer API",
      subtitle: "FULL API ACCESS",
      description: "Complete REST API with comprehensive documentation. SDKs available for Node.js, Python, Ruby. Webhook support for real-time updates.",
      features: [
        "RESTful API",
        "Official SDKs (Node, Python, Ruby)",
        "Webhook notifications",
        "Rate limiting & quotas",
        "API key management",
        "Detailed error messages"
      ]
    },
    {
      icon: RiTeamLine,
      title: "Team Collaboration",
      subtitle: "BUILT FOR TEAMS",
      description: "Built for teams and organizations. Share courses, collaborate on content, and manage permissions. Centralized billing and team analytics.",
      features: [
        "Unlimited team members",
        "Role-based permissions",
        "Shared course library",
        "Team usage analytics",
        "Centralized billing",
        "SSO integration"
      ]
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header
        logoText="Coursify"
        navLinks={[
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "About", href: "/about" },
        ]}
        ctaButton={{
          text: "Start Free",
          href: "/dashboard",
        }}
      />

      {/* Hero Section */}
      <section className="py-20 border-b-2 border-purple-200">
        <Container maxWidth="xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-8">
              <RiSparklingLine className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">Features</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Everything You Need for Professional Course Creation
            </h1>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
              Powered by GPT-4 and Claude. Built for educators, businesses, and content creators who demand the best.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-200 rounded-2xl font-semibold shadow-lg hover:shadow-xl"
              >
                <RiArrowRightLine className="w-5 h-5" />
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-3 border-2 border-purple-200 rounded-2xl font-semibold hover:bg-purple-50"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Model Stats */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 border-b-2 border-purple-200">
        <Container maxWidth="xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">GPT-4</div>
              <div className="text-sm font-semibold text-gray-600">AI Model</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-sm font-semibold text-gray-600">Languages</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">Unlimited</div>
              <div className="text-sm font-semibold text-gray-600">Courses</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">HD</div>
              <div className="text-sm font-semibold text-gray-600">Video Quality</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Features Grid */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon
              const bgColors = ["bg-white", "bg-gradient-to-br from-purple-50 to-pink-50", "bg-gradient-to-br from-pink-50 to-rose-50"]
              const colorIndex = index % 3

              return (
                <div
                  key={index}
                  className={`p-8 ${bgColors[colorIndex]} border-2 border-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {feature.title}
                  </h3>

                  <div className="text-xs font-bold uppercase tracking-wider mb-4 text-purple-600">
                    {feature.subtitle}
                  </div>

                  <p className="mb-6 text-gray-700">
                    {feature.description}
                  </p>

                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <RiCheckDoubleLine className="w-5 h-5 flex-shrink-0 text-purple-600" />
                        <span className="text-sm text-gray-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-pink-600 border-y-2 border-purple-200">
        <Container maxWidth="xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full mb-8">
              <RiBookOpenLine className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-bold text-purple-600">AI-Powered</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Course Creation?
            </h2>
            <p className="text-xl text-purple-50 mb-8">
              Join thousands of educators and businesses using Coursify to create professional online courses in minutes.
            </p>
            <Button
              size="xl"
              className="gap-3 bg-white text-purple-600 border-2 border-white rounded-2xl font-bold shadow-lg hover:bg-purple-50"
            >
              <RiArrowRightLine className="w-5 h-5" />
              Start Free Trial
            </Button>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gray-50">
        <Container maxWidth="xl">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Start your free trial today—no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="xl"
                className="gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-200 rounded-2xl font-bold shadow-lg"
              >
                <RiArrowRightLine className="w-5 h-5" />
                Start Free Trial
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="gap-3 border-2 border-purple-200 rounded-2xl font-semibold hover:bg-purple-50"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
