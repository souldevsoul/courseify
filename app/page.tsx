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
  RiArrowRightLine,
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

  React.useEffect(() => {
    setIsVisible(true)
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <RiBookOpenLine className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Coursify</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors">Pricing</a>
            <a href="/about" className="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors">About</a>
          </nav>
          <Button
            size="md"
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all font-semibold"
            onClick={() => window.location.href = '/dashboard'}
          >
            Create Course
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
            alt="Students learning together"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/85 via-purple-900/70 to-purple-900/85" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-1/4 -left-24 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-pink-300/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="text-center space-y-12">
            <div className={`inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-purple-200 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <RiSparklingLine className="w-5 h-5 text-purple-600" />
              <Text variant="body-sm" className="font-semibold text-slate-700">AI-Powered Course Creation</Text>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className={`block transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="text-white">Create Online Courses</span>
                </span>
                <span className={`block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">In Minutes</span>
                </span>
                <span className={`block transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="text-white">With AI</span>
                </span>
              </h1>
            </div>

            <div className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Text variant="lead" className="text-purple-100 max-w-3xl mx-auto text-xl md:text-2xl">
                Transform your expertise into professional online courses. AI generates curriculum, videos, quizzes, and more. No technical skills required.
              </Text>
            </div>

            <div className={`flex flex-wrap justify-center gap-6 pt-4 transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button
                size="xl"
                className="gap-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all font-semibold text-lg px-12 py-8 rounded-2xl"
                onClick={() => window.location.href = '/dashboard'}
              >
                <RiArrowRightLine className="w-6 h-6" />
                Create Your First Course
              </Button>
              <Button
                size="xl"
                className="gap-3 bg-white text-slate-700 hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all font-semibold text-lg px-12 py-8 rounded-2xl border border-slate-200"
                onClick={() => window.location.href = '/demo'}
              >
                <RiPlayCircleLine className="w-6 h-6" />
                See Examples
              </Button>
            </div>

            <div className={`flex flex-wrap justify-center items-center gap-8 pt-12 text-sm text-purple-100 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <RiCheckLine className="w-5 h-5 text-green-400" />
                <span>10,000+ Courses Created</span>
              </div>
              <div className="flex items-center gap-2">
                <RiCheckLine className="w-5 h-5 text-green-400" />
                <span>50,000+ Students Enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <RiCheckLine className="w-5 h-5 text-green-400" />
                <span>5-Minute Setup</span>
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
