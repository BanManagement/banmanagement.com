import Image from 'next/image'
import { DEMO } from 'constants/urls'

export const WebHero = () => (
  <div className="py-16">
    <div className="container max-w-7xl m-auto px-6">
      <div className="lg:flex justify-between items-center">
        <div className="lg:w-6/12 lg:p-0 p-7">
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-5">Access anywhere</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Manage your community from any device at any time.</p>
          <p className="mt-4 text-base text-gray-500">WebUI supports seamless logins via a unique pin generated in-game, no more complex registration forms.</p>
          <p className="mt-4 text-base text-gray-500">Create custom roles with fine grained permissions to control what players can see and edit.</p>
          <p className="mt-4 text-base text-gray-500">Manage bans, mutes and reports across a network of servers from your mobile phone.</p>

          <div className="py-5">
            <a href={DEMO} className="mt-6 mb-12 md:mb-0 md:mt-10 inline-block py-3 px-8 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow">Demo</a>
          </div>

        </div>
        <div className="lg:w-5/12 order-2 border-1 border-gray-100 rounded-lg shadow overflow-hidden">
          <Image src="/images/webui-player.png" alt="WebUI player page showing punishment history" className="rounded-lg" width="1440" height="900" />
        </div>
      </div>

    </div>
  </div>
)
