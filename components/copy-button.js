import { useState } from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaRegClipboard, FaRegCopy } from 'react-icons/fa'

export const CopyButton = ({ children }) => {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <CopyToClipboard
      onCopy={() => setIsCopied(true)}
      className='col-copy cursor-pointer'
      text={children}
    >
      <button type="button" aria-label="Copy to Clipboard">
        {isCopied ? <FaRegClipboard /> : <FaRegCopy />}
      </button>
    </CopyToClipboard>
  )
}

CopyButton.propTypes = {
  children: PropTypes.PropTypes.string.isRequired
}
