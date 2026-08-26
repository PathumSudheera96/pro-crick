import { Cta } from '@/components/home/Cta'
import { FeaturedPlayers } from '@/components/home/FeaturedPlayers'
import { Founders } from '@/components/home/Founders'
import { Hero } from '@/components/home/Hero'
import { Introduction } from '@/components/home/Introduction'
import { Partners } from '@/components/home/Partners'
import { RegistrationSplitCta } from '@/components/home/RegistrationSplitCta'
import { Services } from '@/components/home/Services'
import { Stats } from '@/components/home/Stats'
import { Testimonials } from '@/components/home/Testimonials'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
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
        <RegistrationSplitCta />
        <Founders />
        <WhyChooseUs />
        <Stats />
        <Services />
        <Testimonials />
        <Partners />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
