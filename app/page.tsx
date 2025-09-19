import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import HowItWorks from "@/components/landing/how-it-works"
import TechStack from "@/components/landing/tech-stack"
import Pricing from "@/components/landing/pricing"
import FAQ from "@/components/landing/faq"
import CTA from "@/components/landing/cta"
import Footer from "@/components/landing/footer"
import Navbar from "@/components/landing/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <TechStack />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
