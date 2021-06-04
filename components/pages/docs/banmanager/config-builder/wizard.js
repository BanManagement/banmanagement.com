import PropTypes from 'prop-types'
import { useMachine } from '@xstate/react'
import { machine, stages } from 'components/pages/docs/banmanager/config-builder/machine'
import { FinalStage } from 'components/pages/docs/banmanager/config-builder/final-stage'
import { Steps } from 'components/pages/docs/banmanager/config-builder/steps'
import { Step } from 'components/pages/docs/banmanager/config-builder/step'

export const Wizard = ({ configYaml }) => {
  const [current, send] = useMachine(machine)

  const currentStageId = current.value
  const activeStep = stages.findIndex(s => {
    return s.id === currentStageId || s.parent === currentStageId
  })

  return (
    <div className="max-w-xl mx-auto my-4">
      <div className="border-b-2 pb-4 mb-6">
        <Steps activeStep={activeStep}>
          {stages.map(stage => {
            return (
              <Step key={stage.id} label={stage.label} />
            )
          })}
        </Steps>
      </div>
      {current.matches('success')
        ? <FinalStage currentState={current} configYaml={configYaml} />
        : stages.map(stage => (
          <Stage
            key={stage.id}
            handleNext={(type, response) => send({ type, response })}
            isActive={current.matches(stage.id)}
            currentState={current}
            component={stage.component}
          />
        ))
      }
    </div>
  )
}

Wizard.propTypes = {
  configYaml: PropTypes.string
}

function Stage ({ isActive, component, handleNext, currentState, options }) {
  return isActive && component({ handleNext, currentState, options })
}
