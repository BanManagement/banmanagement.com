import PropTypes from 'prop-types'
import { FaBan, FaMicrophoneAltSlash, FaUserEdit, FaExclamationTriangle, FaUsers, FaLanguage } from 'react-icons/fa'

const Feature = ({ icon, header, children }) => (
  <div className="flex">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
        {icon}
      </div>
    </div>
    <div className="ml-4">
      <dt className="text-lg leading-6 font-medium text-gray-900">
        {header}
      </dt>
      <dd className="mt-2 text-base text-gray-500">
        {children}
      </dd>
    </div>
  </div>
)

Feature.propTypes = {
  icon: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export const Features = () => (
  <div className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          A better way to manage your community
        </p>
      </div>

      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <Feature icon={<FaBan />} header="Flexible banning">
            Block nuisance players, their IP addresses and prevent profane names from joining your server.
          </Feature>
          <Feature icon={<FaMicrophoneAltSlash />} header="Reduce spam">
            Mute players spamming chat, including shadow muting.
          </Feature>
          <Feature icon={<FaUserEdit />} header="Self moderation">
            Players can report wrongful behaviour even when staff are offline. Staff can then track and resolve reports when online.
          </Feature>
          <Feature icon={<FaExclamationTriangle />} header="Powerful warning system">
            Notify a player of their misdeeds. Automatically issue commands after a set amount of warnings, increasing in severity each time.
          </Feature>
          <Feature icon={<FaUsers />} header="Collaborative">
            Staff can write notes and view a player&apos;s entire record, including unbans and by whom to provide a consistent approach to rule breakers.
          </Feature>
          <Feature icon={<FaLanguage />} header="Localisation">
            Every message can be fully customised, supporting colour codes and even JSON messages.
          </Feature>
        </dl>
      </div>
    </div>
  </div>
)
