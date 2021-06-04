import PropTypes from 'prop-types'
import clsx from 'clsx'
import { machine } from 'components/pages/docs/banmanager/config-builder/machine'

export const AskQuestion = (question) => {
  const Question = ({ handleNext, currentState }) => {
    const options = currentState.nextEvents.map(option => {
      const canChoose = machine.transition(currentState, option).changed
      return (
        <li
          key={option}
          className={clsx('mt-6 mb-12 md:mb-0 md:mt-10 py-3 px-8 text-white rounded-lg shadow', {
            'cursor-pointer bg-red-500 hover:bg-red-600': canChoose,
            'cursor-not-allowed bg-gray-300': !canChoose
          })}
          onClick={() => handleNext(option)}
        >
          {option}
        </li>
      )
    })

    return (
      <>
        <h2 className="text-xl leading-7 sm:text-xl">{question}</h2>
        <ul>{options}</ul>
      </>
    )
  }

  Question.propTypes = {
    handleNext: PropTypes.func.isRequired,
    currentState: PropTypes.object.isRequired
  }

  return Question
}
