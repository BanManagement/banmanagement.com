import { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

export const Steps = ({ children, activeStep }) => {
  let count = 0

  Children.forEach(children, child => child.props.label ? count++ : null)

  const steps = Children.map(children, (child, index) => {
    const stepNumber = index + 1
    const status = index < activeStep ? 'completed' : 'todo'
    const childProps = {
      stepNumber,
      status,
      ...child.props
    }

    if (!child.props.label) return null

    return (
      <>
        {cloneElement(child, childProps)}
        {stepNumber < count &&
          <div className="w-2/12 align-center items-center align-middle content-center flex -mt-11">
            <div className="w-full bg-gray-100 rounded items-center align-middle align-center flex-1">
              <div className="bg-green-100 text-xs leading-none py-1 text-center text-gray-darkest rounded " style={{ width: status === 'completed' ? '100%' : '0%' }}></div>
            </div>
          </div>
        }
      </>
    )
  })
  return (
    <>
      <div className="flex pb-3">
        {steps}
      </div>
    </>
  )
}

Steps.propTypes = {
  children: PropTypes.node.isRequired,
  activeStep: PropTypes.number.isRequired
}
