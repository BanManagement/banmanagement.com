import PropTypes from 'prop-types'
import Image from 'next/image'
import { render } from 'minecraft-text'
import { messages } from 'data/messages'

export const Message = ({ name, type = '' }) => {
  if (!messages[name]) throw new Error(`Unknown message ${name}`)

  const { tokens, message } = messages[name]

  let exampleMessage = message.replace('\\n', '\n')

  if (tokens) {
    for (const [key, value] of Object.entries(tokens)) {
      if (!value) throw new Error(`Missing token value for ${key} ${name}`)

      exampleMessage = exampleMessage.replace(`[${key}]`, value.example)
    }
  }

  if (!exampleMessage.startsWith('&')) {
    exampleMessage = '&f' + exampleMessage
  }

  let example

  if (type === 'denied') {
    example = (
      <div className="relative text-center mt-8">
        <div className="mc-denied-screen" />
        <div className="relative p-4">
          <p className="mc-gray">Disconnected by Server</p>
          <p className="font-minecraft z-10 relative" dangerouslySetInnerHTML={{
            __html: render(exampleMessage, '&')
          }}></p>
          <p className="mc-button w-3/6">
            <span>Back to server list</span>
          </p>
        </div>
      </div>
    )
  } else if (type === 'none') {
    example = ''
  } else {
    example = (
      <div className="relative">
        <Image
          src="/images/message-background.png"
          alt="Minecraft hill"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          className="z-0"
        />
        <p className="font-minecraft z-10 relative p-3" dangerouslySetInnerHTML={{
          __html: render(exampleMessage, '&')
        }}></p>
      </div>
    )
  }

  return (
    <>
      {tokens &&
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Example</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tokens).map(token => (
              <tr key={token}>
                <td>{token}</td>
                <td>{tokens[token].example}</td>
                <td>{tokens[token].description}</td>
              </tr>
            ))}
          </tbody>
        </table>}
      <p><strong>Example</strong></p>
      <code>
        {message}
      </code>
      {example}
    </>
  )
}

Message.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string
}
