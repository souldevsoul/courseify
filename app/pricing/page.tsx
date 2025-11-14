"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import {
  RiSparklingLine,
  RiCheckLine,
  RiCloseLine,
  RiArrowRightLine,
} from "react-icons/ri"

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out Coursify and small projects",
      popular: false,
      features: [
        { text: "1 AI-generated course", included: true },
        { text: "3 modules per course", included: true },
        { text: "5 lessons per module", included: true },
        { text: "Auto-generated quizzes", included: true },
        { text: "Basic course templates", included: true },
        { text: "Student enrollment (up to 50)", included: true },
        { text: "Progress tracking", included: true },
        { text: "Email support", included: true },
        { text: "Video lesson generation", included: false },
        { text: "Custom branding", included: false },
        { text: "Advanced analytics", included: false },
        { text: "Priority support", included: false },
      ],
      cta: "Start Free",
      ctaHref: "/auth/signin",
    },
    {
      name: "Creator",
      price: "$39",
      period: "per month",
      description: "For educators creating multiple professional courses",
      popular: true,
      features: [
        { text: "Unlimited AI-generated courses", included: true },
        { text: "Unlimited modules & lessons", included: true },
        { text: "Auto-generated quizzes", included: true },
        { text: "Video lesson generation (10/month)", included: true },
        { text: "Custom course templates", included: true },
        { text: "Student enrollment (unlimited)", included: true },
        { text: "Progress tracking & analytics", included: true },
        { text: "Custom branding", included: true },
        { text: "Certificate generation", included: true },
        { text: "Priority email support", included: true },
        { text: "Export course content", included: true },
        { text: "API access", included: false },
      ],
      cta: "Start Free Trial",
      ctaHref: "/auth/signin?plan=creator",
    },
    {
      name: "Pro",
      price: "$99",
      period: "per month",
      description: "Advanced features for institutions and course creators at scale",
      popular: false,
      features: [
        { text: "Everything in Creator, plus:", included: true },
        { text: "Video lesson generation (unlimited)", included: true },
        { text: "Advanced course analytics", included: true },
        { text: "Team collaboration (up to 10)", included: true },
        { text: "White-label platform", included: true },
        { text: "Custom domain", included: true },
        { text: "Advanced integrations", included: true },
        { text: "API access", included: true },
        { text: "Priority 24/7 support", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom AI model training", included: true },
        { text: "SLA guarantee", included: true },
      ],
      cta: "Contact Sales",
      ctaHref: "/contact",
    },
  ]

  const comparisonFeatures = [
    {
      category: "COURSE CREATION",
      features: [
        { name: "AI-generated courses", free: "1", creator: "Unlimited", pro: "Unlimited" },
        { name: "Modules per course", free: "3", creator: "Unlimited", pro: "Unlimited" },
        { name: "Lessons per module", free: "5", creator: "Unlimited", pro: "Unlimited" },
        { name: "Video lessons/month", free: "0", creator: "10", pro: "Unlimited" },
      ],
    },
    {
      category: "STUDENT MANAGEMENT",
      features: [
        { name: "Student enrollment limit", free: "50", creator: "Unlimited", pro: "Unlimited" },
        { name: "Progress tracking", free: true, creator: true, pro: true },
        { name: "Certificate generation", free: false, creator: true, pro: true },
        { name: "Analytics dashboard", free: "Basic", creator: "Advanced", pro: "Advanced" },
      ],
    },
    {
      category: "CUSTOMIZATION",
      features: [
        { name: "Course templates", free: "Basic", creator: "Custom", pro: "Custom" },
        { name: "Custom branding", free: false, creator: true, pro: true },
        { name: "White-label platform", free: false, creator: false, pro: true },
        { name: "Custom domain", free: false, creator: false, pro: true },
      ],
    },
    {
      category: "SUPPORT & FEATURES",
      features: [
        { name: "Email support", free: "Standard", creator: "Priority", pro: "24/7 Priority" },
        { name: "API access", free: false, creator: false, pro: true },
        { name: "Team collaboration", free: false, creator: false, pro: "Up to 10" },
        { name: "Dedicated account manager", free: false, creator: false, pro: true },
      ],
    },
  ]

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.",
    },
    {
      question: "What happens to my courses if I downgrade?",
      answer: "Your existing courses remain published and accessible to students. However, you won't be able to create new courses beyond your plan's limit until you upgrade again.",
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact us within 14 days for a full refund.",
    },
    {
      question: "How does video generation work?",
      answer: "Our AI generates video lessons from your course content using advanced text-to-video models. Each video includes visuals, narration, and animations to engage students.",
    },
    {
      question: "Can I export my course content?",
      answer: "Yes! Creator and Pro plans allow you to export course content in multiple formats (PDF, SCORM, etc.) for use on other platforms.",
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
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-8">
              <RiSparklingLine className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-bold uppercase tracking-wider text-purple-700">Simple Pricing</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Choose the Perfect Plan for Your Needs
            </h1>
            <p className="text-xl text-gray-700">
              Start free, upgrade as you grow. All plans include AI-powered course generation and student management.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-white border-2 rounded-2xl p-8 ${
                  tier.popular
                    ? "border-purple-600 shadow-2xl scale-105"
                    : "border-purple-200 hover:shadow-xl transition-all"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold uppercase rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-purple-900">{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {tier.price}
                    </span>
                    <span className="text-gray-600">/ {tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <RiCheckLine className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <RiCloseLine className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    tier.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                      : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                  }`}
                  asChild
                >
                  <a href={tier.ctaHref}>
                    {tier.cta}
                    <RiArrowRightLine className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-700">
              See what&apos;s included in each plan
            </p>
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden">
            {comparisonFeatures.map((category, catIdx) => (
              <div key={catIdx}>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">{category.category}</h3>
                </div>
                {category.features.map((feature, featIdx) => (
                  <div
                    key={featIdx}
                    className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-purple-100 last:border-b-0"
                  >
                    <div className="col-span-1 font-medium text-gray-700">{feature.name}</div>
                    <div className="text-center text-gray-700">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? <RiCheckLine className="w-5 h-5 mx-auto text-green-600" /> : <RiCloseLine className="w-5 h-5 mx-auto text-gray-300" />
                      ) : (
                        feature.free
                      )}
                    </div>
                    <div className="text-center text-gray-700">
                      {typeof feature.creator === "boolean" ? (
                        feature.creator ? <RiCheckLine className="w-5 h-5 mx-auto text-green-600" /> : <RiCloseLine className="w-5 h-5 mx-auto text-gray-300" />
                      ) : (
                        feature.creator
                      )}
                    </div>
                    <div className="text-center text-gray-700">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? <RiCheckLine className="w-5 h-5 mx-auto text-green-600" /> : <RiCloseLine className="w-5 h-5 mx-auto text-gray-300" />
                      ) : (
                        feature.pro
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border-2 border-purple-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-900">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join educators worldwide creating amazing courses with AI
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold"
              asChild
            >
              <a href="/auth/signin">
                Start Creating Free
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
