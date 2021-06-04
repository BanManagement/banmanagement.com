import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState, Fragment } from 'react'
import clsx from 'clsx'
import { Transition } from '@headlessui/react'
import { RemoveScroll } from 'react-remove-scroll'
import { FaBars, FaGithub, FaDiscord } from 'react-icons/fa'
import { DISCORD_INVITE, GITHUB_ORG } from 'constants/urls'
import { topLevelNav, docsNav, formatPath } from 'data/navigation'

export const Nav = () => {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setDrawerOpen(false)
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const nav = Object.entries(docsNav).map(([category, pages]) => (
    <Fragment key={category}>
      <h4 className="px-3 mb-3 uppercase tracking-wide font-semibold text-gray-900">{category}</h4>
      <ul className="mb-8">
        {pages.map((page) => (
          <li key={page.__resourcePath} className="py-1">
            <a className={`px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 ${router.asPath === formatPath(page.__resourcePath) ? 'font-bold' : ''}`} href={formatPath(page.__resourcePath)}>{page.navTitle}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  ))

  return (
    <div className="relative bg-primary-900">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span className="sr-only">Home</span>
              <Image src="/images/banmanager-icon.png" alt="Logo" className="h-8 w-auto sm:h-10" width="40" height="40" />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button type="button" className="rounded-md p-2 inline-flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 text-2xl" onClick={() => setDrawerOpen(true)}>
              <span className="sr-only">Open menu</span>
              <FaBars />
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            {topLevelNav.map(({ href, label }) => (
              <a key={`${href}${label}`} href={href} className={`text-base font-bold ${router.asPath === href ? 'text-gray-100' : 'text-gray-500 hover:text-gray-100'}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a href={GITHUB_ORG} className="ml-8 whitespace-nowrap font-medium text-gray-500 hover:text-gray-100 text-2xl">
              <span className="sr-only">GitHub Source Code</span>
              <FaGithub />
            </a>
            <a href={DISCORD_INVITE} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-1 py-1 border border-transparent rounded-md shadow-sm font-medium text-white bg-discord text-2xl">
            <span className="sr-only">Discord Server</span>
              <FaDiscord />
            </a>
          </div>
        </div>
      </div>
      <Transition
        show={drawerOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div ref={ref} className="z-10 fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-black opacity-50" tabIndex="0" onClick={() => setDrawerOpen(false)}></div>
          </div>
        )}
      </Transition>
      <RemoveScroll forwardProps enabled={drawerOpen}>
      <aside
        className={clsx('transform top-0 right-0 w-72 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30', RemoveScroll.classNames.zeroRight,
          {
            'translate-x-0': drawerOpen,
            'translate-x-full': !drawerOpen
          })}
      >
        <div className="pt-5 pb-6 px-5">
          <div className="flex items-center justify-between">
            <div>
              <a href="/">
                <span className="sr-only">Home</span>
                <img className="h-8 w-auto" src="/images/banmanager-icon.png" alt="Logo" />
              </a>
            </div>
            <div className="-mr-2">
              <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-grey-500" onClick={() => setDrawerOpen(false)}>
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="px-2">
          <nav>
            <ul className="mb-8">
              {topLevelNav.map(({ href, label, icon }) => (
                <li key={`${href}${label}`} className="py-1">
                  <a href={href} className="px-3 py-2 transition-colors duration-200 relative block text-gray-900">
                    {icon}
                    {label}
                  </a>
                </li>
              ))}
              <li className="py-1">
                <a href={GITHUB_ORG} className="px-3 py-2 transition-colors duration-200 relative block text-gray-900">
                  <FaGithub className="flex-shrink-0 h-6 w-6 text-gray-900 inline mr-3" />
                  GitHub
                </a>
              </li>
              <li className="py-1">
                <a href={DISCORD_INVITE} className="px-3 py-2 transition-colors duration-200 relative block text-gray-900">
                  <FaDiscord className="flex-shrink-0 h-6 w-6 text-discord inline mr-3" />
                  Discord
                </a>
              </li>
            </ul>
            {nav}
          </nav>
        </div>
      </aside>
      </RemoveScroll>
    </div>
  )
}
