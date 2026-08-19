import { Cta } from '@/components/home/Cta'
import { FeaturedPlayers } from '@/components/home/FeaturedPlayers'
import { Hero } from '@/components/home/Hero'
import { Introduction } from '@/components/home/Introduction'
import { Partners } from '@/components/home/Partners'
import { Services } from '@/components/home/Services'
import { Stats } from '@/components/home/Stats'
import { Testimonials } from '@/components/home/Testimonials'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'

export default function HomePage() {
  return (
    <>
      <NavBar variant="transparent-dark" overlay />
      <main>
        <Hero />
        <Introduction />
        <FeaturedPlayers />
        <Services />
        <Stats />
        <Testimonials />
        <Partners />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
