import PropTypes from 'prop-types'
import clsx from 'clsx'

export const Step = ({ stepNumber, status, label }) => {
  let statusIcon = <span className="text-gray-700 text-center w-full">{stepNumber}</span>

  if (status === 'completed') {
    statusIcon = <span className="text-white text-center w-full"><i className="fa fa-check w-full fill-current white"></i></span>
  }

  return (
    <div className="flex-1">
      <div className={clsx('w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center', {
        'bg-white border-2 border-gray-100': status === 'todo',
        'bg-green-500': status === 'completed'
      })}>
        {statusIcon}
      </div>
      <span className="text-xs content-center text-center">
        {label}
      </span>
    </div>
  )
}

Step.propTypes = {
  stepNumber: PropTypes.number,
  status: PropTypes.oneOf(['todo', 'completed']),
  label: PropTypes.string
}
