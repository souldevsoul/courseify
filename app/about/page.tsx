"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import {
  RiSparklingLine,
  RiHeartLine,
  RiLightbulbLine,
  RiRocketLine,
  RiShieldCheckLine,
  RiGlobalLine,
  RiGraduationCapLine,
  RiBookOpenLine,
  RiArrowRightLine,
} from "react-icons/ri"

export default function AboutPage() {
  const values = [
    {
      icon: RiLightbulbLine,
      title: "Innovation First",
      description: "We leverage the most advanced AI models to push the boundaries of what's possible with course creation. Always testing, always improving.",
    },
    {
      icon: RiShieldCheckLine,
      title: "Privacy & Security",
      description: "Your data is yours. End-to-end encryption, GDPR compliance, and industry-standard security practices.",
    },
    {
      icon: RiHeartLine,
      title: "Educator-Centric",
      description: "Built by educators, for educators. Every feature is designed with real teaching needs in mind, from independent instructors to institutions.",
    },
    {
      icon: RiGlobalLine,
      title: "Accessible to All",
      description: "Professional course creation should be accessible to everyone. That's why we offer a free tier and transparent pricing.",
    },
  ]

  const milestones = [
    {
      year: "2024",
      title: "Coursify Founded",
      description: "Started with a mission to democratize professional online course creation using AI.",
    },
    {
      year: "2024",
      title: "Beta Launch",
      description: "Launched private beta with educators testing AI-powered course generation.",
    },
    {
      year: "2024",
      title: "Quiz Generation Added",
      description: "Integrated OpenAI for automatic quiz and assessment generation.",
    },
    {
      year: "2025",
      title: "Public Launch",
      description: "Opened to the public with free tier, serving educators worldwide.",
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
          { label: "Courses", href: "/courses" },
        ]}
        ctaButton={{
          text: "Get Started",
          href: "/auth/signin",
        }}
      />

      {/* Hero Section */}
      <section className="py-20 border-b-2 border-purple-200">
        <Container maxWidth="xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-8">
              <RiSparklingLine className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-bold uppercase tracking-wider text-purple-700">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Making Course Creation Accessible to Everyone
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              We're building the future of online education. AI-powered course creation that helps educators share knowledge at scale.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Education has the power to transform lives. But creating professional online courses has been too time-consuming and technically challenging for most educators.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                We built Coursify to change that. By leveraging the world's most advanced AI models, we're making high-quality course creation accessible to everyone—from independent teachers to educational institutions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-12 text-center">
              <RiGraduationCapLine className="w-24 h-24 mx-auto mb-6 text-purple-600" />
              <p className="text-2xl font-bold text-purple-900 mb-4">
                Empowering educators worldwide
              </p>
              <p className="text-gray-700">
                Create complete courses with AI-generated content, quizzes, and structured learning paths—all in minutes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-gray-700">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border-2 border-purple-200 rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-purple-900">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-xl text-gray-700">
              From idea to platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{milestone.year}</span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-1 h-full bg-gradient-to-b from-purple-500 to-pink-600 mt-2" />
                  )}
                </div>
                <div className="pb-12">
                  <h3 className="text-2xl font-bold mb-2 text-purple-900">{milestone.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <Container maxWidth="xl">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Create Your First Course?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join educators worldwide who are using AI to share knowledge at scale
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold"
              asChild
            >
              <a href="/auth/signin">
                Get Started Free
                <RiArrowRightLine className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
