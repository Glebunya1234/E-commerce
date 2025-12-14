import HeroSection from "@/components/HeroSection"
import FeaturedProducts from "@/components/FeaturedProducts"
import CategoryShowcase from "@/components/CategoryShowcase"
import NewsletterSection from "@/components/NewsletterSection"

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <NewsletterSection />
    </div>
  )
}
