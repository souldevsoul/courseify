"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import {
  RiMailLine,
  RiCustomerService2Line,
  RiQuestionLine,
  RiRocketLine,
  RiTeamLine,
  RiTimeLine,
  RiArrowRightLine,
  RiCheckLine,
} from "react-icons/ri"

export default function ContactPage() {
  const contactMethods = [
    {
      icon: RiCustomerService2Line,
      title: "General Support",
      description: "Questions about your account, features, or how to use Coursify",
      email: "support@coursify.ai",
      responseTime: "24 hours",
      color: "white",
    },
    {
      icon: RiRocketLine,
      title: "Sales & Enterprise",
      description: "Interested in Enterprise plan, custom pricing, or volume discounts",
      email: "support@coursify.ai",
      responseTime: "4 hours",
      color: "black",
    },
    {
      icon: RiTeamLine,
      title: "Partnerships",
      description: "Integration partnerships, affiliate programs, or collaboration opportunities",
      email: "support@coursify.ai",
      responseTime: "48 hours",
      color: "purple",
    },
  ]

  const supportTopics = [
    {
      title: "Account & Billing",
      items: [
        "Plan upgrades and downgrades",
        "Payment and invoice questions",
        "Account cancellation",
        "Refund requests",
      ],
    },
    {
      title: "Technical Support",
      items: [
        "API integration help",
        "Course generation issues",
        "Video rendering problems",
        "Error troubleshooting",
      ],
    },
    {
      title: "Course Creation",
      items: [
        "Course quality improvement",
        "Content generation questions",
        "Video lesson creation",
        "Quiz and assessment setup",
      ],
    },
    {
      title: "Enterprise Inquiries",
      items: [
        "Custom deployment options",
        "SLA and uptime guarantees",
        "Security compliance",
        "Volume pricing",
      ],
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
              <RiMailLine className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">Contact Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              We&apos;re Here to Help
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Have questions? Need support? Want to discuss enterprise options? Our team is ready to assist you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-700">
              Choose the best way to reach us based on your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              const bgColor = index % 2 === 0 ? "bg-white" : "bg-gradient-to-br from-purple-50 to-pink-50"

              return (
                <div
                  key={index}
                  className={`p-8 ${bgColor} border-2 border-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {method.title}
                  </h3>

                  <p className="mb-6 text-gray-700">
                    {method.description}
                  </p>

                  <div className="mb-6">
                    <a
                      href={`mailto:${method.email}`}
                      className="text-lg font-bold underline text-purple-600 hover:text-purple-700 hover:no-underline"
                    >
                      {method.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <RiTimeLine className="w-5 h-5" />
                    Response within {method.responseTime}
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50 border-y-2 border-purple-200">
        <Container maxWidth="xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Send Us a Message
              </h2>
              <p className="text-xl text-gray-700">
                Fill out the form and we&apos;ll get back to you as soon as possible
              </p>
            </div>

            <div className="bg-white p-8 border-2 border-purple-200 rounded-2xl shadow-lg">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Form submission not yet implemented"); }}>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-bold mb-2 text-gray-700">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
                    placeholder="Acme Inc."
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-bold mb-2 text-gray-700">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium bg-white"
                  >
                    <option value="">Select a topic...</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="sales">Sales & Enterprise</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Product Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-gray-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-200 rounded-xl font-semibold shadow-lg hover:shadow-xl"
                >
                  <RiArrowRightLine className="w-5 h-5 mr-2" />
                  Send Message
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  We typically respond within 24 hours on business days
                </p>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Support Topics */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Common Support Topics
            </h2>
            <p className="text-xl text-gray-700">
              Reach out about any of these topics—we&apos;re here to help
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {supportTopics.map((topic, index) => (
              <div
                key={index}
                className={`p-8 border-2 border-purple-200 rounded-2xl shadow-lg ${
                  index % 2 === 0 ? "bg-white" : "bg-gradient-to-br from-purple-50 to-pink-50"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  {topic.title}
                </h3>
                <ul className="space-y-3">
                  {topic.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <RiCheckLine className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-600" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-pink-600 border-y-2 border-purple-200">
        <Container maxWidth="xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Looking for Something Else?
            </h2>
            <p className="text-xl text-purple-50">
              Quick links to help you find what you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href="/pricing"
              className="p-6 bg-white border-2 border-white rounded-2xl shadow-lg text-center hover:shadow-xl transition-all"
            >
              <RiQuestionLine className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-900">Pricing FAQ</h3>
              <p className="text-sm text-gray-700">
                Common questions about plans and billing
              </p>
            </a>

            <a
              href="/demo"
              className="p-6 bg-white border-2 border-white rounded-2xl shadow-lg text-center hover:shadow-xl transition-all"
            >
              <RiRocketLine className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-900">Try Demo</h3>
              <p className="text-sm text-gray-700">
                Test our course generation before signing up
              </p>
            </a>

            <a
              href="/features"
              className="p-6 bg-white border-2 border-white rounded-2xl shadow-lg text-center hover:shadow-xl transition-all"
            >
              <RiCustomerService2Line className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-900">Feature Docs</h3>
              <p className="text-sm text-gray-700">
                Learn about all Coursify capabilities
              </p>
            </a>
          </div>
        </Container>
      </section>

      {/* Emergency Support */}
      <section className="py-24 bg-gray-50">
        <Container maxWidth="xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Enterprise & Urgent Support
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Enterprise customers with SLA agreements have access to priority 24/7 support via dedicated channels.
            </p>
            <div className="p-8 bg-white border-2 border-purple-200 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Enterprise Customers</h3>
              <p className="text-gray-700 mb-6">
                If you have an active Enterprise plan with SLA guarantee, use your dedicated support channels for immediate assistance.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-200 rounded-xl font-semibold shadow-lg"
                asChild
              >
                <a href="mailto:support@coursify.ai">
                  Contact Enterprise Support
                  <RiArrowRightLine className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
