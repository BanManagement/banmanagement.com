import { Layout } from 'components/layout'
import { Features } from 'components/pages/home/features'
import { Hero } from 'components/pages/home/hero'
import { WebHero } from 'components/pages/home/web-hero'
import { OrganizationJsonLd, SoftwareAppJsonLd } from 'next-seo'

export default function IndexPage () {
  return (
    <Layout title="Home" description="A suite of Minecraft plugins for server owners to manage their community with ease, supporting Bukkit, BungeeCord, Fabric, Sponge and Velocity">
      <OrganizationJsonLd
        type="Organization"
        name="Ban Management"
        url="https://banmanagement.com"
        logo="https://banmanagement.com/images/banmanager-icon.png"
        sameAs={[
          'https://github.com/BanManagement',
          'https://discord.gg/59bsgZB'
        ]}
      />
      <SoftwareAppJsonLd
        name="BanManager"
        price="0"
        priceCurrency="USD"
        applicationCategory="GameApplication"
        operatingSystem="Minecraft Server (Java Edition)"
        description="A suite of Minecraft plugins for server owners to manage their community with ease"
      />
      <Hero />
      <Features />
      <WebHero />
    </Layout>
  )
}
