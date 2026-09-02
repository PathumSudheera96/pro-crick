import { Cta } from '@/components/home/Cta'
import { FeaturedPlayers } from '@/components/home/FeaturedPlayers'
import { Founders } from '@/components/home/Founders'
import { Hero } from '@/components/home/Hero'
import { Introduction } from '@/components/home/Introduction'
import { NewsUpdates } from '@/components/home/NewsUpdates'
import { Partners } from '@/components/home/Partners'
import { RegistrationSplitCta } from '@/components/home/RegistrationSplitCta'
import { Services } from '@/components/home/Services'
import { Stats } from '@/components/home/Stats'
import { Testimonials } from '@/components/home/Testimonials'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { mapPlayerToCardData } from '@/lib/players/playerCards'
import { getHomepageFeaturedPlayers } from '@/lib/queries/players'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const featuredPlayers = (await getHomepageFeaturedPlayers()).map(mapPlayerToCardData)

  return (
    <>
      <NavBar variant="transparent-dark" overlay />
      <main>
        <Hero />
        <Introduction />
        <FeaturedPlayers players={featuredPlayers} />
        <RegistrationSplitCta />
        <Founders />
        <WhyChooseUs />
        <Stats />
        <Services />
        <Testimonials />
        <Partners />
        <NewsUpdates />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
