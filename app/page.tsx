"use client"

import * as React from "react"
import Image from "next/image"
import { Button, Heading, Text } from "@/components/ui"
import { Footer } from "@/components/marketing/layout/footer"
import { NewsletterPopup } from "@/components/marketing/NewsletterPopup"
import {
  RiSparklingLine,
  RiBookOpenLine,
  RiVideoLine,
  RiPlayCircleLine,
  RiCheckLine,
  RiCloseLine,
  RiPresentationLine,
  RiAwardLine,
  RiGroupLine,
  RiLineChartLine,
} from "react-icons/ri"

export default function Home() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [currentCourse, setCurrentCourse] = React.useState(0)

  // Stats counter animation
  const [stats, setStats] = React.useState({
    courses: 0,
    students: 0,
    setupTime: 0
  })

  React.useEffect(() => {
    setIsVisible(true)

    // Counter animation for stats
    setTimeout(() => {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setStats({
          courses: Math.floor(10000 * progress),
          students: Math.floor(50000 * progress),
          setupTime: Math.floor(5 * progress)
        })

        if (currentStep >= steps) {
          clearInterval(timer)
          setStats({ courses: 10000, students: 50000, setupTime: 5 })
        }
      }, interval)

      return () => clearInterval(timer)
    }, 1800)
  }, [])

  // Course examples carousel
  const courseExamples = [
    { category: "Content Creation", title: "Video Recording Studio", image: "/images/examples/video-recording-1762952293704.png" },
    { category: "Interactive Learning", title: "Digital Whiteboard Teaching", image: "/images/examples/whiteboard-teaching-1762952347522.png" },
    { category: "Online Platform", title: "Course Dashboard", image: "/images/examples/laptop-courses-1762952358770.png" },
    { category: "Collaborative", title: "Group Learning Sessions", image: "/images/examples/group-learning-1762952370364.png" },
    { category: "Achievement", title: "Certificate of Success", image: "/images/examples/certificate-success-1762952403470.png" },
  ]

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCourse((prev) => (prev + 1) % courseExamples.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [courseExamples.length])

  // Features data
  const features = [
    {
      icon: RiSparklingLine,
      title: "AI Course Generation",
      description: "Enter any topic and AI creates complete course curriculum with modules, lessons, and assessments. Professional structure in minutes.",
    },
    {
      icon: RiVideoLine,
      title: "Video Lessons",
      description: "AI-generated video content with professional narration. Transform text lessons into engaging video courses automatically.",
    },
    {
      icon: RiPresentationLine,
      title: "Interactive Content",
      description: "Create quizzes, assignments, and interactive exercises. AI generates questions based on your lesson content.",
    },
    {
      icon: RiGroupLine,
      title: "Student Management",
      description: "Track enrollments, progress, and performance. Automated grading and detailed analytics for every student.",
    },
    {
      icon: RiAwardLine,
      title: "Certificates",
      description: "Automatic certificate generation upon course completion. Customizable templates with your branding.",
    },
    {
      icon: RiLineChartLine,
      title: "Analytics",
      description: "Comprehensive insights into student engagement, completion rates, and course performance metrics.",
    },
  ]

  // Pricing data
  const pricingPlans = [
    {
      name: "Creator",
      price: "$39",
      period: "/month",
      description: "Perfect for individual course creators",
      features: [
        { text: "5 active courses", included: true },
        { text: "AI course generation", included: true },
        { text: "Video lessons", included: true },
        { text: "100 students", included: true },
        { text: "Basic analytics", included: true },
        { text: "Certificates", included: false },
        { text: "Custom branding", included: false },
      ],
      ctaText: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "For educators and small teams",
      features: [
        { text: "Unlimited courses", included: true },
        { text: "AI course generation", included: true },
        { text: "HD video lessons", included: true },
        { text: "500 students", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom certificates", included: true },
        { text: "Custom branding", included: true },
        { text: "Email support", included: true },
      ],
      ctaText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For organizations and institutions",
      features: [
        { text: "Unlimited everything", included: true },
        { text: "White-label platform", included: true },
        { text: "API access", included: true },
        { text: "Custom integrations", included: true },
        { text: "SSO authentication", included: true },
        { text: "Dedicated support", included: true },
        { text: "Custom features", included: true },
        { text: "Training & onboarding", included: true },
      ],
      ctaText: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-md border-2 border-white">
              <RiBookOpenLine className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Coursify</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-700 hover:text-purple-600 transition-colors uppercase tracking-wide">Features</a>
            <a href="#pricing" className="text-sm font-bold text-slate-700 hover:text-purple-600 transition-colors uppercase tracking-wide">Pricing</a>
            <a href="/about" className="text-sm font-bold text-slate-700 hover:text-purple-600 transition-colors uppercase tracking-wide">About</a>
          </nav>
          <Button
            size="md"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg hover:scale-105 transition-all font-bold border-2 border-white/20"
            onClick={() => window.location.href = '/dashboard'}
          >
            Create Course
          </Button>
        </div>
      </header>

      {/* Hero Section - Educational Command Center */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Decorative academic elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {/* Graph paper grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />

          {/* Floating academic icons */}
          <div className="absolute top-20 left-[10%] text-purple-200 opacity-20 animate-float">
            <RiBookOpenLine className="w-24 h-24" />
          </div>
          <div className="absolute top-40 right-[15%] text-purple-200 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
            <RiAwardLine className="w-20 h-20" />
          </div>
          <div className="absolute bottom-40 left-[20%] text-fuchsia-200 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
            <RiPresentationLine className="w-28 h-28" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className={`inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl shadow-md border-2 border-slate-200 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <Text variant="body-sm" className="font-bold text-slate-700 tracking-wide uppercase text-xs">AI-Powered Education Platform</Text>
              </div>

              {/* Main headline with academic styling */}
              <div className="space-y-4">
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: '200ms' }}>
                  <span className="block text-slate-900">Your Teaching</span>
                  <span className="block text-slate-900">Command</span>
                  <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Center
                  </span>
                </h1>

                <div className={`h-1.5 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                  style={{ transitionDelay: '400ms', transformOrigin: 'left' }} />
              </div>

              {/* Subtitle */}
              <p className={`text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '600ms' }}>
                Build professional online courses in minutes. AI creates your curriculum, videos, quizzes, and student materials automatically.
              </p>

              {/* Feature highlights */}
              <div className={`space-y-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '800ms' }}>
                {[
                  { icon: RiSparklingLine, text: "AI generates complete course structure" },
                  { icon: RiVideoLine, text: "Auto-create video lessons & presentations" },
                  { icon: RiGroupLine, text: "Student progress tracking built-in" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center border-2 border-white shadow-sm">
                      <item.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-slate-700 font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-wrap gap-4 pt-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '1000ms' }}>
                <Button
                  size="xl"
                  className="gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg px-10 py-7 rounded-2xl border-2 border-white/20"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <RiSparklingLine className="w-6 h-6" />
                  Create Your First Course
                </Button>
                <Button
                  size="xl"
                  className="gap-3 bg-white text-slate-800 hover:bg-slate-50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-lg px-10 py-7 rounded-2xl border-2 border-slate-200"
                  onClick={() => window.location.href = '/demo'}
                >
                  <RiPlayCircleLine className="w-6 h-6 text-purple-600" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats with academic styling */}
              <div className={`flex flex-wrap gap-8 pt-8 border-t-2 border-slate-200 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1200ms' }}>
                <div className="text-center">
                  <div className="text-3xl font-black text-slate-900 mb-1">{stats.courses.toLocaleString()}+</div>
                  <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Courses Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-slate-900 mb-1">{stats.students.toLocaleString()}+</div>
                  <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Students Taught</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-slate-900 mb-1">{stats.setupTime}min</div>
                  <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Setup Time</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Course Builder Preview */}
            <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
              style={{ transitionDelay: '400ms' }}>

              {/* Main dashboard card */}
              <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden">
                {/* Header bar */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                  </div>
                  <div className="text-white font-bold text-sm">Course Builder</div>
                </div>

                {/* Content area */}
                <div className="p-6 space-y-4">
                  {/* Course title input mockup */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Course Title</label>
                    <div className="bg-slate-50 rounded-xl px-4 py-3 border-2 border-slate-200 font-semibold text-slate-900">
                      Introduction to Web Development
                    </div>
                  </div>

                  {/* Module list */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Course Modules</label>
                    <div className="space-y-2">
                      {[
                        { title: "HTML Fundamentals", lessons: 8, duration: "45min", icon: RiBookOpenLine, color: "purple" },
                        { title: "CSS Styling", lessons: 12, duration: "60min", icon: RiPresentationLine, color: "blue" },
                        { title: "JavaScript Basics", lessons: 15, duration: "90min", icon: RiVideoLine, color: "indigo" },
                      ].map((module, idx) => (
                        <div key={idx}
                          className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 border-2 border-slate-200 hover:border-purple-300 transition-all hover:shadow-md cursor-pointer group"
                          style={{
                            animation: isVisible ? `slideInRight 0.6s ease-out ${0.6 + idx * 0.15}s both` : 'none'
                          }}>
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${module.color}-100 to-${module.color}-200 flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform`}>
                              <module.icon className={`w-5 h-5 text-${module.color}-600`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-slate-900 text-sm mb-1">{module.title}</div>
                              <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                                <span>{module.lessons} lessons</span>
                                <span>•</span>
                                <span>{module.duration}</span>
                              </div>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                              <RiCheckLine className="w-4 h-4 text-green-600" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI generation button mockup */}
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border-2 border-white/20">
                    <RiSparklingLine className="w-5 h-5 animate-pulse" />
                    <span>AI Generate Content</span>
                  </button>
                </div>
              </div>

              {/* Floating student avatar cards */}
              <div className="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-xl border-2 border-slate-200 px-4 py-3 animate-float">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white" />
                  </div>
                  <div className="text-xs font-bold text-slate-700">142 enrolled</div>
                </div>
              </div>

              {/* Floating certificate badge */}
              <div className="absolute -left-6 bottom-20 bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-4 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <RiAwardLine className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Auto Certificates</div>
                    <div className="text-xs text-slate-500 font-semibold">On completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Examples Carousel */}
      <section className="relative bg-white py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
              See What You Can Create
            </h2>
            <p className="text-slate-600 text-lg">Professional courses created with Coursify</p>
          </div>

          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {courseExamples.map((example, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentCourse ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={example.image}
                  alt={example.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-12">
                  <div className="text-center text-white space-y-2">
                    <div className="inline-block px-4 py-1 bg-purple-500/90 backdrop-blur-sm rounded-full text-sm font-semibold mb-2">
                      {example.category}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold">{example.title}</h3>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {courseExamples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCourse(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentCourse ? 'w-8 bg-purple-500' : 'w-2 bg-white/60'
                  }`}
                  aria-label={`View course ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-100 rounded-full mb-6">
              <RiSparklingLine className="w-5 h-5 text-purple-600" />
              <Text variant="body-sm" className="text-purple-700 font-semibold">Features</Text>
            </div>
            <Heading variant="h2" className="mb-4 text-4xl md:text-5xl text-slate-900">Everything You Need</Heading>
            <Text variant="body-lg" className="text-slate-600 max-w-3xl mx-auto">
              Complete course creation platform powered by AI
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-purple-200"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
              Simple Pricing for Creators
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Start free, upgrade as you grow your course business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${
                  plan.popular
                    ? 'border-purple-500 bg-white shadow-2xl scale-105'
                    : 'border-slate-200 bg-white shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="flex items-end justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-600 text-lg mb-2">{plan.period}</span>}
                  </div>
                  <p className="text-slate-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <RiCheckLine className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <RiCloseLine className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-slate-700' : 'text-slate-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-6 font-semibold rounded-xl transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                  onClick={() => window.location.href = plan.ctaText === 'Contact Sales' ? '/contact' : '/dashboard'}
                >
                  {plan.ctaText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-pink-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Share Your Knowledge?
          </h2>
          <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
            Join 10,000+ course creators using Coursify to build and sell online courses. Start free today.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              size="xl"
              className="gap-3 bg-white text-purple-600 hover:bg-purple-50 shadow-2xl font-bold text-lg px-12 py-8 rounded-2xl"
              onClick={() => window.location.href = '/dashboard'}
            >
              <RiBookOpenLine className="w-6 h-6" />
              Create Your Course Free
            </Button>
            <Button
              size="xl"
              className="gap-3 bg-purple-700/50 backdrop-blur text-white hover:bg-purple-700/70 border-2 border-white/30 font-semibold text-lg px-12 py-8 rounded-2xl"
              onClick={() => window.location.href = '/contact'}
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <NewsletterPopup />
    </div>
  )
}
