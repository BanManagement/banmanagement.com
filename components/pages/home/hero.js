import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaShieldAlt, FaBan } from 'react-icons/fa'
import { GITHUB_ORG } from 'constants/urls'

const MobileHero = () => (
  <>
    <div
      className="md:hidden w-full relative right-0 top-0 flex rounded-lg bg-white overflow-hidden shadow"
    >
      <div
        className="h-4 bg-gray-200 absolute top-0 left-0 right-0 rounded-t-lg flex items-center"
      >
        <span
          className="h-2 w-2 rounded-full bg-red-500 inline-block mr-1 ml-2"
        ></span>
        <span
          className="h-2 w-2 rounded-full bg-orange-400 inline-block mr-1"
        ></span>
        <span
          className="h-2 w-2 rounded-full bg-green-500 inline-block mr-1"
        ></span>
      </div>
      <div className="w-32 bg-gray-100 px-2 py-8" style={{ height: '340px' }}>
        <div className="h-2 w-16 bg-gray-300 rounded-full mb-4"></div>
        <div className="flex items-center mb-4">
          <div
            className="h-5 w-5 rounded-full bg-gray-300 mr-3 flex-shrink-0"
          ></div>
          <div>
            <div className="h-2 w-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="h-2 w-16 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-2 w-10 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-2 w-20 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-2 w-6 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-2 w-16 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-2 w-10 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-2 w-20 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-2 w-6 bg-gray-200 rounded-full mb-2"></div>
      </div>
      <div className="flex-1 px-4 py-8">
        <h2 className="text-xs text-gray-700 font-bold mb-1">
          Latest Bans
        </h2>
        <div className="flex mb-5">
          <div className="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
          <div className="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
          <div className="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
          <div className="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
        </div>

        <div className="flex flex-wrap -mx-2 mb-5">
          <div className="w-1/3 px-2">
            <div className="p-3 rounded-lg bg-white shadow">
              <div
                className="w-6 h-6 rounded-full bg-gray-200 mb-2"
              >
                <Image src="/images/players/confuser.png" height="300" width="300" alt="player head skin" />
              </div>
              <div
                className="h-2 w-10 bg-gray-200 mb-1 rounded-full"
              ></div>
              <div className="h-2 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="w-1/3 px-2">
            <div className="p-3 rounded-lg bg-white shadow">
              <div
                className="w-6 h-6 rounded-full bg-gray-200 mb-2"
              >
                <Image src="/images/players/Issy2322.png" height="300" width="300" alt="player head skin" />
              </div>
              <div
                className="h-2 w-10 bg-gray-200 mb-1 rounded-full"
              ></div>
              <div className="h-2 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="w-1/3 px-2">
            <div className="p-3 rounded-lg bg-white shadow">
              <div
                className="w-6 h-6 rounded-full bg-gray-200 mb-2"
              >
                <Image src="/images/players/SavannahF.png" height="300" width="300" alt="player head skin" />
              </div>
              <div
                className="h-2 w-10 bg-gray-200 mb-1 rounded-full"
              ></div>
              <div className="h-2 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>

        <h2 className="text-xs text-gray-700 font-bold mb-1">
          Reports
        </h2>

        <div
          className="w-full flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3"
        >
          <div className="w-1/3">
            <div className="flex">
              <div
                className="h-5 w-5 rounded-full bg-gray-200 mr-3 flex-shrink-0"
              ></div>
              <div>
                <div
                  className="h-2 w-16 bg-gray-200 mb-1 rounded-full"
                ></div>
                <div className="h-2 w-10 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div
              className="w-16 rounded-full bg-green-100 py-2 px-4 mx-auto"
            >
              <div className="p-1 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div className="w-1/3">
            <div
              className="h-2 w-10 bg-gray-100 rounded-full mx-auto"
            ></div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center py-3">
          <div className="w-1/3">
            <div className="flex">
              <div
                className="h-5 w-5 rounded-full bg-gray-200 mr-3 flex-shrink-0"
              ></div>
              <div>
                <div
                  className="h-2 w-16 bg-gray-200 mb-1 rounded-full"
                ></div>
                <div className="h-2 w-10 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div
              className="w-16 rounded-full bg-orange-100 py-2 px-4 mx-auto"
            >
              <div className="p-1 rounded-full bg-orange-200"></div>
            </div>
          </div>
          <div className="w-1/3">
            <div
              className="h-2 w-16 bg-gray-100 rounded-full mx-auto"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <a
      className="mr-3 md:hidden -m-12 absolute right-0 bottom-0 w-40 bg-white rounded-lg shadow-lg px-10 py-6 z-20"
      href={GITHUB_ORG}
    >
      <FaGithub className="h-16 w-16 mx-auto mb-8" />
      <div className="text-gray-800 text-center text-sm">
        Open Source <br />&amp; Free
      </div>
    </a>
  </>
)

export const Hero = () => (
  <div className="bg-primary-900 md:overflow-hidden">
    <div className="px-4 py-20 md:py-4">
      <div className="md:max-w-6xl md:mx-auto">
        <div className="md:flex md:flex-wrap">
          <div className="md:w-1/2 text-center md:text-left md:pt-16">
            <h1
              className="font-bold text-white text-2xl md:text-5xl leading-tight mb-4"
            >
              Ban Management
            </h1>

            <p className="text-primary-200 md:text-xl md:pr-48">
              A suite of moderation plugins &amp; apps for Minecraft servers
            </p>

            <Link
              href="/docs"
              className="mt-6 mb-12 md:mb-0 md:mt-10 inline-block py-3 px-8 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow"
              >
                Get Started
              </Link>
          </div>
          <div className="md:w-1/2 relative">
            <div className="hidden md:block">
              <a
                className="-ml-24 -mb-40 absolute left-0 bottom-0 w-40 bg-white rounded-lg shadow-lg px-6 py-8"
                style={{ transform: 'rotate(-8deg)' }}
                href={GITHUB_ORG}
              >
                <FaGithub className="h-16 w-16 mx-auto mb-8" />
                <div className="text-gray-800 text-center">
                  Open Source <br />&amp; Free
                </div>
              </a>

              <div
                className="ml-24 mb-16 absolute left-0 bottom-0 w-40 bg-white rounded-lg shadow-lg px-6 py-8 z-20"
                style={{ transform: 'rotate(-8deg)' }}
              >
                <FaBan className="h-16 w-16 mx-auto mb-8" />
                <div className="text-gray-800 text-center">
                  Moderate effectively
                </div>
              </div>

              <div
                className="ml-32 absolute left-0 bottom-0 w-48 bg-white rounded-lg shadow-lg px-10 py-8 z-20"
                style={{ transform: 'rotate(-8deg)', marginBottom: '-220px' }}
              >
                <FaShieldAlt className="h-16 w-16 mx-auto mb-8" />
                <div className="text-gray-800 text-center">
                  Reliable
                </div>
              </div>

              <div
                className="mt-10 w-full absolute right-0 top-0 flex rounded-lg bg-white overflow-hidden shadow-lg z-10"
                style={{ transform: 'rotate(-8deg)', marginRight: '-250px' }}
              >
                <div className="w-32 bg-gray-200" style={{ height: '560px' }}></div>
                <div className="flex-1 p-6">
                  <h2 className="text-lg text-gray-700 font-bold mb-3">
                    Latest Bans
                  </h2>

                  <div className="flex flex-wrap -mx-4 mb-5">
                    <div className="w-1/3 px-4">
                      <div className="h-40 rounded-lg bg-white shadow-lg p-6">
                        <div
                          className="w-16 h-16 rounded-full bg-gray-200 mb-6"
                        >
                          <Image src="/images/players/confuser.png" height="300" width="300" />
                        </div>
                        <div
                          className="h-2 w-16 bg-gray-200 mb-2 rounded-full"
                        ></div>
                        <div className="h-2 w-10 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-1/3 px-4">
                      <div className="h-40 rounded-lg bg-white shadow-lg p-6">
                        <div
                          className="w-16 h-16 rounded-full bg-gray-200 mb-6"
                        >
                          <Image src="/images/players/Issy2322.png" height="300" width="300" />
                        </div>
                        <div
                          className="h-2 w-16 bg-gray-200 mb-2 rounded-full"
                        ></div>
                        <div className="h-2 w-10 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-1/3 px-4">
                      <div className="h-40 rounded-lg bg-white shadow-lg p-6">
                        <div
                          className="w-16 h-16 rounded-full bg-gray-200 mb-6"
                        >
                          <Image src="/images/players/SavannahF.png" height="300" width="300" />
                        </div>
                        <div
                          className="h-2 w-16 bg-gray-200 mb-2 rounded-full"
                        ></div>
                        <div className="h-2 w-10 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-lg text-gray-700 font-bold mb-3">
                    Reports
                  </h2>

                  <div
                    className="w-full flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3"
                  >
                    <div className="w-1/3">
                      <div className="flex">
                        <div className="h-8 w-8 rounded bg-gray-200 mr-4"></div>
                        <div>
                          <div
                            className="h-2 w-16 bg-gray-200 mb-1 rounded-full"
                          ></div>
                          <div
                            className="h-2 w-10 bg-gray-100 rounded-full"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div
                        className="w-16 rounded-full bg-green-100 py-2 px-4 mx-auto"
                      >
                        <div className="p-1 rounded-full bg-green-200"></div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div
                        className="h-2 w-10 bg-gray-100 rounded-full mx-auto"
                      ></div>
                    </div>
                  </div>

                  <div
                    className="flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3"
                  >
                    <div className="w-1/3">
                      <div className="flex">
                        <div className="h-8 w-8 rounded bg-gray-200 mr-4"></div>
                        <div>
                          <div
                            className="h-2 w-16 bg-gray-200 mb-1 rounded-full"
                          ></div>
                          <div
                            className="h-2 w-10 bg-gray-100 rounded-full"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div
                        className="w-16 rounded-full bg-orange-100 py-2 px-4 mx-auto"
                      >
                        <div className="p-1 rounded-full bg-orange-200"></div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div
                        className="h-2 w-16 bg-gray-100 rounded-full mx-auto"
                      ></div>
                    </div>
                  </div>

                  <div
                    className="flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3"
                  >
                    <div className="w-1/3">
                      <div className="flex">
                        <div className="h-8 w-8 rounded bg-gray-200 mr-4"></div>
                        <div>
                          <div
                            className="h-2 w-16 bg-gray-200 mb-1 rounded-full"
                          ></div>
                          <div
                            className="h-2 w-10 bg-gray-100 rounded-full"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div
                        className="w-16 rounded-full bg-blue-100 py-2 px-4 mx-auto"
                      >
                        <div className="p-1 rounded-full bg-blue-200"></div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div
                        className="h-2 w-8 bg-gray-100 rounded-full mx-auto"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="w-full absolute left-0 bottom-0 ml-1 z-10"
                style={{ transform: 'rotate(-8deg)', marginBottom: '-360px' }}
              >
                <div className="grid--gray h-48 w-48"></div>
              </div>
            </div>
            <MobileHero />
          </div>
        </div>
      </div>
    </div>
    <svg
      className="fill-current text-white hidden md:block"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path fillOpacity="1" d="M0,224L1440,32L1440,320L0,320Z"></path>
    </svg>
  </div>
)
