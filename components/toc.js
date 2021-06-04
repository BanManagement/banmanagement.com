import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const linkClassName = 'toc-link'
const linkActiveClassName = 'toc-active'
const topOffset = 100

function Headings ({
  toc,
  isChild
}) {
  if (!toc.length) return null

  return (
    <ul
      className={clsx('overflow-x-hidden text-gray-500 font-medium text-sm', {
        'ml-4': isChild
      })}>
      {toc.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={`block transform transition-colors duration-200 py-2 hover:text-gray-900 text-gray-500 ${linkClassName}`}
            dangerouslySetInnerHTML={{
              __html: heading.value
            }}
          >
          </a>
          <Headings isChild toc={heading.children} />
        </li>
      ))}
    </ul>
  )
}

Headings.propTypes = {
  toc: PropTypes.array,
  isChild: PropTypes.bool
}

function TOC ({ toc }) {
  const [lastActiveLink, setLastActiveLink] = useState(undefined)

  useEffect(() => {
    function setActiveLink () {
      function getActiveHeaderAnchor () {
        const headersAnchors = Array.from(
          document.getElementsByClassName('heading-link')
        )

        const firstAnchorUnderViewportTop = headersAnchors.find((anchor) => {
          const { top } = anchor.getBoundingClientRect()
          return top >= topOffset
        })

        if (firstAnchorUnderViewportTop) {
          // If first anchor in viewport is under a certain threshold, we consider it's not the active anchor.
          // In such case, the active anchor is the previous one (if it exists), that may be above the viewport
          if (
            firstAnchorUnderViewportTop.getBoundingClientRect().top >= topOffset
          ) {
            const previousAnchor =
              headersAnchors[
                headersAnchors.indexOf(firstAnchorUnderViewportTop) - 1
              ]
            return previousAnchor ?? firstAnchorUnderViewportTop
          } else { // If the anchor is at the top of the viewport, we consider it's the first anchor
            return firstAnchorUnderViewportTop
          }
        } else { // no anchor under viewport top? (ie we are at the bottom of the page)
          // highlight the last anchor found
          return headersAnchors[headersAnchors.length - 1]
        }
      }

      const activeHeaderAnchor = getActiveHeaderAnchor()

      if (activeHeaderAnchor) {
        let index = 0
        let itemHighlighted = false

        // @ts-expect-error: Must be <a> tags.
        const links = document.getElementsByClassName(
          linkClassName
        )
        while (index < links.length && !itemHighlighted) {
          const link = links[index]
          const { href } = link
          const anchorValue = decodeURIComponent(
            href.substring(href.indexOf('#') + 1)
          )

          if (activeHeaderAnchor.parentElement.id === anchorValue) {
            if (lastActiveLink) {
              lastActiveLink.classList.remove(linkActiveClassName)
            }
            link.classList.add(linkActiveClassName)
            setLastActiveLink(link)
            itemHighlighted = true
          }

          index += 1
        }
      }
    }

    document.addEventListener('scroll', setActiveLink)
    document.addEventListener('resize', setActiveLink)

    setActiveLink()

    return () => {
      document.removeEventListener('scroll', setActiveLink)
      document.removeEventListener('resize', setActiveLink)
    }
  })

  return (
    <Headings toc={toc} />
  )
}

TOC.propTypes = {
  toc: PropTypes.array
}

export default TOC
