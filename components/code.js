import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaRegClipboard, FaRegCopy } from 'react-icons/fa'

export const Code = ({ children, language }) => {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <div className='text-left pt-px pb-0 text-sm font-medium font-ligatures-contextual ml-0 overflow-auto max-h-96 relative'>
      <CopyToClipboard
        onCopy={() => setIsCopied(true)}
        className='absolute right-1.5 top-1.5 p-2 m-0 border-none cursor-pointer'
        text={children}
      >
        <button type="button" aria-label="Copy to Clipboard">
          {isCopied ? <FaRegClipboard /> : <FaRegCopy />}
        </button>
      </CopyToClipboard>

      <SyntaxHighlighter language={language} customStyle={{ marginTop: '0px' }}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

Code.propTypes = {
  children: PropTypes.PropTypes.string.isRequired,
  language: PropTypes.string
}
