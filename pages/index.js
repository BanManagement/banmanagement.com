import { Layout } from 'components/layout'
import { Features } from 'components/pages/home/features'
import { Hero } from 'components/pages/home/hero'
import { WebHero } from 'components/pages/home/web-hero'

export default function IndexPage () {
  return (
    <Layout title="Home" description="A suite of Minecraft plugins for server owners to manage their community with ease, supporting Bukkit, BungeeCord and Sponge">
      <Hero />
      <Features />
      <WebHero />
    </Layout>
  )
}
