import PropTypes from 'prop-types'
import Image from 'next/image'
import { FaDownload } from 'react-icons/fa'

const styles = {
  image: 'h-32 w-full relative',
  card: 'pt-8 pb-8 rounded overflow-hidden shadow-lg bg-white mx-auto'
}

export const DownloadCard = ({ title, imgSrc, description, stableUrl, experimentalUrl, coverImage, size = 'sm', children }) => (
  <div className="p-2 sm:p-4 text-center">
    <div className={`${styles.card} max-w-${size}`}>
      <div className="px-6">
        <div className="space-y-5">
          <div>
            <Image className={`${styles.image} ${coverImage ? 'object-cover' : ''}`} src={imgSrc} height="100" width="100" unoptimized alt={`${title} logo`} />
          </div>
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base sm:h-16 md:h-12">
            {description}
          </p>
          {stableUrl && <a
            href={stableUrl}
            className="py-3 px-4 text-white bg-primary-500 hover:bg-primary-800 rounded-lg shadow inline-flex items-center"
          >
            <FaDownload className="fill-current w-4 h-4 mr-2" />
            <span>Download</span>
          </a>
          }
          {stableUrl && experimentalUrl && <br />}
          {experimentalUrl && <a
            href={experimentalUrl}
            className="py-3 px-4 hover:bg-gray-200 font-bold rounded-lg shadow inline-flex items-center"
          >
            <FaDownload className="fill-current w-4 h-4 mr-2" />
            Experimental
          </a>
          }
          {children}
        </div>
      </div>
    </div>
  </div>
)

DownloadCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  coverImage: PropTypes.bool,
  description: PropTypes.string.isRequired,
  stableUrl: PropTypes.string,
  experimentalUrl: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
}
