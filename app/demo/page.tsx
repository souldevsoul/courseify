import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import { CourseTopicForm, CoursePreview } from "@/components/coursify"
import { ArrowLeft } from "lucide-react"

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header
        logoText="Coursify"
        navLinks={[
          { label: "Features", href: "/#features" },
          { label: "Pricing", href: "/#pricing" },
          { label: "Demo", href: "/demo" },
        ]}
        ctaButton={{
          text: "Get Started",
          href: "/signup",
        }}
      />

      {/* Demo Section */}
      <section className="py-20">
        <Container maxWidth="xl">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase text-gray-700 hover:text-purple-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
              <span className="text-sm font-bold text-purple-700">Live Demo</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Try Coursify
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl">
              Experience AI-powered course creation in action. Generate professional online courses from a simple topic in seconds.
            </p>
          </div>

          {/* Voice Generator */}
          <div className="space-y-8">
            <CourseTopicForm />
            <CoursePreview
              title="Sample Course"
              description="This is a preview of what your AI-generated course structure will look like."
              modules={[]}
            />
          </div>

          {/* Info Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Enter Topic</h3>
              <p className="text-sm text-gray-700">
                Type your course topic or upload an outline. Our AI will understand your subject and create a comprehensive structure.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 border-2 border-purple-200 rounded-2xl bg-white shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Customize Course</h3>
              <p className="text-sm text-gray-700">
                Adjust modules, lessons, difficulty level, and add quizzes to create the perfect learning experience.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Generate & Publish</h3>
              <p className="text-sm text-gray-700">
                Click generate to create your complete course with lessons, videos, and quizzes. Publish to your students instantly.
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-12 p-8 border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-white">What You Can Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white">AI Course Structure</h4>
                  <p className="text-sm text-purple-50">
                    Generate complete course outlines with modules and lessons automatically
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white">Video Lessons</h4>
                  <p className="text-sm text-purple-50">
                    Create engaging video lessons with AI-generated scripts and visuals
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white">Auto Quizzes</h4>
                  <p className="text-sm text-purple-50">
                    Generate quizzes and assessments based on lesson content
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white">Professional Quality</h4>
                  <p className="text-sm text-purple-50">
                    HD video output and comprehensive course content ready to publish
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Sign up for a free account and start creating professional courses with AI
            </p>
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              Create Free Account
            </a>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
