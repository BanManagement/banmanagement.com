import Link from 'next/link'
import { DEMO } from 'constants/urls'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <section className="bg-primary-600 py-8 w-full">
      <div className="container mx-auto px-8 max-w-8xl">
        <div className="table w-full">
          <div className="block sm:table-cell">
            <p className="text-gray-100 text-sm sm:mb-6 font-extrabold">Links</p>
            <ul className="list-reset lg:text-sm text-md mb-6">
              <li className="mt-2 inline-block mr-2 sm:block sm:mr-0">
                <a href={DEMO} className="text-gray-300 hover:text-gray-100">Demo</a>
              </li>
              <li className="mt-2 inline-block mr-2 sm:block sm:mr-0">
                <a href="/faq" className="text-gray-300 hover:text-gray-100">FAQ</a>
              </li>
              <li className="mt-2 inline-block mr-2 sm:block sm:mr-0">
                <Link href="/support" className="text-gray-300 hover:text-gray-100">Support</Link>
              </li>
            </ul>
          </div>
          <div className="block sm:table-cell">
            <p className="text-gray-100 text-sm sm:mb-6 font-extrabold">Resources</p>
            <ul className="list-reset lg:text-sm text-md mb-6">
              <li className="mt-2 inline-block mr-2 sm:block sm:mr-0">
                <a href="https://dev.bukkit.org/projects/ban-management" className="text-gray-300 hover:text-gray-100">BukkitDev</a>
              </li>
              <li className="mt-2 inline-block mr-2 sm:block sm:mr-0">
                <a href="https://www.spigotmc.org/resources/banmanager.21927/" className="text-gray-300 hover:text-gray-100">Spigot</a>
              </li>
              <li className="mt-2 inline-block mr-2 sm:block sm:mr-0">
                <a href="https://ore.spongepowered.org/confuser/BanManager" className="text-gray-300 hover:text-gray-100">Sponge</a>
              </li>
            </ul>
          </div>
          <div className="block sm:table-cell">
            <p className="text-gray-100 text-sm sm:mb-6 font-extrabold">About</p>
            <ul className="list-reset lg:text-sm text-md mb-6">
              <li className="mt-2 inline-block mr-2 sm:block sm:mr-0 text-gray-300">
                by James Mortemore &copy; 2012 - {currentYear}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
