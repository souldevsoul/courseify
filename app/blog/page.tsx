"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import {
  RiArticleLine,
  RiCalendarLine,
  RiTimeLine,
  RiArrowRightLine,
  RiFireLine,
  RiLightbulbLine,
  RiCodeLine,
} from "react-icons/ri"

export default function BlogPage() {
  const categories = [
    { name: "All Posts", slug: "all", count: 24 },
    { name: "Product Updates", slug: "updates", count: 8 },
    { name: "Tutorials", slug: "tutorials", count: 10 },
    { name: "Use Cases", slug: "use-cases", count: 6 },
  ]

  const featuredPost = {
    title: "AI Course Generation: How Advanced Models Create Professional Learning Content",
    excerpt: "Deep dive into the AI technology powering Coursify and why battle-tested language models matter for educational content creation.",
    category: "Product Updates",
    date: "Nov 8, 2025",
    readTime: "8 min read",
    author: "Coursify Team",
    image: "featured",
  }

  const blogPosts = [
    {
      title: "AI Course Generation: Getting Started",
      excerpt: "Learn how to transform your course ideas into professional online courses using AI. From topic selection to student enrollment and content generation.",
      category: "Tutorials",
      date: "Nov 5, 2025",
      readTime: "12 min read",
      author: "Sarah Chen",
      tag: "Beginner",
    },
    {
      title: "10 Ways to Enhance Online Courses with AI",
      excerpt: "Discover innovative ways AI enhances course creation: automated content generation, personalized learning paths, and intelligent assessments.",
      category: "Use Cases",
      date: "Nov 3, 2025",
      readTime: "6 min read",
      author: "Marcus Johnson",
      tag: "Popular",
    },
    {
      title: "Creating Engaging Video Lessons",
      excerpt: "Master the art of video lesson creation with AI. Learn best practices for scripting, visual design, and student engagement.",
      category: "Tutorials",
      date: "Nov 1, 2025",
      readTime: "10 min read",
      author: "Dr. Emily Rodriguez",
      tag: "Technical",
    },
    {
      title: "Quiz Generation Best Practices",
      excerpt: "How to create effective quizzes that assess learning and engage students. AI-powered question generation and answer validation.",
      category: "Tutorials",
      date: "Oct 28, 2025",
      readTime: "15 min read",
      author: "Coursify Team",
      tag: "Popular",
    },
    {
      title: "How Teachers Use AI for Course Creation",
      excerpt: "Case study: How independent educators use AI course generation to create multiple courses and reach thousands of students worldwide.",
      category: "Use Cases",
      date: "Oct 25, 2025",
      readTime: "7 min read",
      author: "Alex Turner",
      tag: "Case Study",
    },
    {
      title: "API Integration for LMS Platforms",
      excerpt: "Essential tips for integrating Coursify into your LMS: authentication, webhooks, content synchronization, and student data management.",
      category: "Tutorials",
      date: "Oct 22, 2025",
      readTime: "11 min read",
      author: "Dev Team",
      tag: "Technical",
    },
    {
      title: "The Future of AI-Powered Education",
      excerpt: "How AI course technology is transforming education and enabling educators to create personalized, scalable learning experiences.",
      category: "Product Updates",
      date: "Oct 19, 2025",
      readTime: "8 min read",
      author: "Sarah Chen",
      tag: "Trending",
    },
    {
      title: "Optimizing Course Content for Students",
      excerpt: "Advanced techniques for creating engaging educational content: structure optimization, multimedia integration, and learning assessment design.",
      category: "Tutorials",
      date: "Oct 16, 2025",
      readTime: "9 min read",
      author: "Marcus Johnson",
      tag: "Pro Tips",
    },
    {
      title: "Certificate Generation and Gamification",
      excerpt: "How to implement certificates, badges, and gamification elements that motivate students and recognize their achievements.",
      category: "Use Cases",
      date: "Oct 13, 2025",
      readTime: "6 min read",
      author: "Jennifer Liu",
      tag: "Education",
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
          { label: "Demo", href: "/demo" },
        ]}
        ctaButton={{
          text: "Get Started",
          href: "/signup",
        }}
      />

      {/* Hero Section */}
      <section className="py-20 border-b-2 border-purple-200">
        <Container maxWidth="xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-8">
              <RiArticleLine className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">Blog</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Course Creation Insights & Updates
            </h1>
            <p className="text-xl text-gray-700">
              Tutorials, use cases, product updates, and everything you need to master AI-powered course creation
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gradient-to-br from-purple-50 to-pink-50 border-b-2 border-purple-200">
        <Container maxWidth="xl">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 font-semibold text-sm rounded-full border-2 ${
                  index === 0
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-600"
                    : "bg-white text-gray-700 border-purple-200 hover:border-purple-400 hover:shadow-md"
                } transition-all`}
              >
                {category.name}
                <span className="ml-2">({category.count})</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-gray-50">
        <Container maxWidth="xl">
          <div className="mb-6 flex items-center gap-3">
            <RiFireLine className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Featured Post</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-purple-200 rounded-2xl shadow-lg p-8">
            <div className="bg-white border-2 border-purple-200 rounded-2xl aspect-video flex items-center justify-center">
              <RiArticleLine className="w-24 h-24 text-purple-600" />
            </div>

            <div className="flex flex-col justify-center text-white">
              <div className="inline-flex items-center gap-2 text-xs font-bold mb-3">
                <span className="px-3 py-1 bg-white text-purple-600 border-2 border-white rounded-full">
                  {featuredPost.category}
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-4 leading-tight text-white">
                {featuredPost.title}
              </h3>

              <p className="text-purple-50 mb-6 text-lg leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-purple-100 mb-6">
                <div className="flex items-center gap-2">
                  <RiCalendarLine className="w-4 h-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <RiTimeLine className="w-4 h-4" />
                  {featuredPost.readTime}
                </div>
              </div>

              <Button
                size="lg"
                className="bg-white text-purple-600 border-2 border-white font-semibold rounded-xl w-fit hover:bg-purple-50"
              >
                Read Article
                <RiArrowRightLine className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-700">
              Stay updated with the latest in AI-powered course creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const bgColors = ["bg-white", "bg-black", "bg-purple-500"]
              const textColors = ["text-black", "text-purple-500", "text-black"]
              const excerptColors = ["text-gray-700", "text-white", "text-gray-900"]
              const metaColors = ["text-gray-600", "text-gray-300", "text-gray-700"]
              const colorIndex = index % 3

              const tagIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
                Popular: RiFireLine,
                Technical: RiCodeLine,
                Beginner: RiLightbulbLine,
              }

              const TagIcon = tagIcons[post.tag] || RiArticleLine

              return (
                <div
                  key={index}
                  className={`${bgColors[colorIndex]} border-2 border-purple-200 rounded-2xl ${
                    colorIndex === 1 ? "shadow-lg" : "shadow-lg"
                  } overflow-hidden flex flex-col`}
                >
                  {/* Image Placeholder */}
                  <div
                    className={`h-48 ${
                      colorIndex === 1 ? "bg-purple-500" : colorIndex === 2 ? "bg-black" : "bg-gray-200"
                    } border-b-2 border-purple-200 flex items-center justify-center`}
                  >
                    <RiArticleLine
                      className={`w-16 h-16 ${
                        colorIndex === 1 ? "text-black" : colorIndex === 2 ? "text-purple-500" : "text-gray-400"
                      }`}
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Category & Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          colorIndex === 1
                            ? "bg-purple-500 text-white"
                            : colorIndex === 2
                            ? "bg-black text-white"
                            : "bg-purple-600 text-white"
                        }`}
                      >
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <TagIcon
                          className={`w-4 h-4 ${
                            colorIndex === 1 ? "text-purple-500" : "text-black"
                          }`}
                        />
                        <span
                          className={`text-xs font-bold uppercase ${metaColors[colorIndex]}`}
                        >
                          {post.tag}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-bold mb-3 leading-tight ${textColors[colorIndex]}`}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={`mb-4 text-sm leading-relaxed flex-1 ${excerptColors[colorIndex]}`}>
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className={`flex items-center gap-4 text-xs ${metaColors[colorIndex]} mb-4`}>
                      <div className="flex items-center gap-1">
                        <RiCalendarLine className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <RiTimeLine className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Read More */}
                    <button
                      className={`w-full py-3 font-semibold text-sm border-2 rounded-xl ${
                        colorIndex === 1
                          ? "bg-purple-500 text-white border-purple-500 hover:bg-purple-600"
                          : colorIndex === 2
                          ? "bg-black text-white border-black hover:bg-gray-900"
                          : "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                      } transition-all`}
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button
              size="xl"
              variant="outline"
              className="gap-3 bg-white text-purple-600 border-2 border-purple-200 rounded-2xl font-semibold shadow-lg hover:bg-purple-50"
            >
              Load More Articles
              <RiArrowRightLine className="w-5 h-5" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-pink-600 border-y-2 border-purple-200">
        <Container maxWidth="xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Stay Updated
            </h2>
            <p className="text-xl text-purple-50 mb-8">
              Get the latest AI course creation insights, tutorials, and product updates delivered to your inbox
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 border-2 border-white rounded-xl font-medium text-lg focus:outline-none focus:ring-4 focus:ring-purple-400"
              />
              <Button
                size="lg"
                className="bg-white text-purple-600 border-2 border-white font-semibold rounded-xl px-8 whitespace-nowrap hover:bg-purple-50"
              >
                Subscribe
                <RiArrowRightLine className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <p className="text-sm text-purple-100 mt-4">
              No spam. Unsubscribe anytime. Read our{" "}
              <a href="/privacy" className="text-white underline hover:no-underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
