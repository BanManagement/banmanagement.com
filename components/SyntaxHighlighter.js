import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import yaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml'
// import bash from 'react-syntax-highlighter/dist/esm/styles/hljs/bash'
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('yaml', yaml)
// SyntaxHighlighter.registerLanguage('bash', bash)

const Component = ({ children, ...options }) => <SyntaxHighlighter {...options} style={docco}>{children}</SyntaxHighlighter>

export default Component
