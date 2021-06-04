import PropTypes from 'prop-types'
import Image from 'next/image'
import { Layout } from 'components/layout'
import { PageHeader } from 'components/page-header'
import { DISCORD_INVITE, GITHUB_ORG } from 'constants/urls'

const styles = {
  card: 'text-center text-white rounded shadow-lg pb-5 col-span-3 md:col-span-1 mt-7 md:m-1 md:mb-4'
}

async function getRepoInfo () {
  const res = await fetch('https://api.github.com/repos/BanManagement/BanManager')
  const data = await res.json()

  return {
    stars: data.stargazers_count,
    forks: data.forks_count
  }
}

async function getContributors () {
  const res = await fetch('https://api.github.com/repos/BanManagement/BanManager/contributors')
  const data = await res.json()

  return {
    contributorsCount: data.length
  }
}

async function getDiscordInfo () {
  const res = await fetch('https://canary.discordapp.com/api/guilds/664808009393766401/widget.json')
  const data = await res.json()

  return {
    online: data.presence_count
  }
}

export async function getStaticProps () {
  return {
    props: {
      ...await getRepoInfo(),
      ...await getContributors(),
      ...await getDiscordInfo()
    },
    revalidate: 3600 // Cache for an hour
  }
}

function SupportPage ({ stars, forks, contributorsCount, online }) {
  return (
    <Layout title="Support" description="Get in touch and let us know how we can help.">
      <PageHeader>Support</PageHeader>
      <div className="py-12 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 text-left">
          <div className="grid grid-rows-1 grid-cols-3">
            <div className="row-span-3 col-span-3 md:col-span-2 prose">
              <h3 className="text-xl font-bold leading-7">Join the community on Discord</h3>
              <p>Having trouble setting something up? Have questions? <a href={DISCORD_INVITE}>Join the BanManager Discord server</a></p>

              <h3 className="text-xl font-bold leading-7">Discuss on GitHub</h3>
              <p>Found a bug, or want to request a new feature? You can join the discussion on <a href={GITHUB_ORG}>GitHub</a></p>

              <h3 className="text-xl font-bold leading-7">Check the FAQ</h3>
              <p>Review the list of BanManager&apos;s most <a href="/docs/banmanager/faq">frequently asked questions</a></p>
            </div>
            <div className={`${styles.card} bg-discord`}>
              <a href={DISCORD_INVITE}>
                <div className="mt-5">
                  <Image src="/images/discord-logo-wordmark-white.svg" height="70" width="200" unoptimized alt="Discord logo" />
                </div>
                <div className="grid grid-cols-2">
                  <div>
                    <p className="text-xl">{online}</p>
                    <p className="text-xs tracking-wide uppercase">Online</p>
                  </div>
                  <div>
                    <p className="text-xl">100+</p>
                    <p className="text-xs tracking-wide uppercase">Members</p>
                  </div>
                </div>
              </a>
            </div>
            <div className={`${styles.card} bg-primary-900`}>
              <p className="mt-5">BanManager is <span className="font-bold">open source</span></p>
              <p className="mb-7">and welcomes contributions</p>
              <div className="grid grid-cols-3">
                <div>
                  <a href={`${GITHUB_ORG}/BanManager/stargazers`}>
                    <p className="text-xl">{stars}</p>
                    <p className="text-xs tracking-wide uppercase">Stars</p>
                  </a>
                </div>
                <div>
                  <a href={`${GITHUB_ORG}/BanManager/network/members`}>
                    <p className="text-xl">{forks}</p>
                    <p className="text-xs tracking-wide uppercase">Forks</p>
                  </a>
                </div>
                <div>
                  <a href={`${GITHUB_ORG}/BanManager/graphs/contributors`}>
                    <p className="text-xl">{contributorsCount}</p>
                    <p className="text-xs tracking-wide uppercase">Authors</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

SupportPage.propTypes = {
  stars: PropTypes.number,
  forks: PropTypes.number,
  contributorsCount: PropTypes.number,
  online: PropTypes.number
}

export default SupportPage
