import PropTypes from 'prop-types'
import { Formik, Field, Form } from 'formik'

export const ConnectionForm = ({ currentState, handleNext }) => {
  const fields = [
    {
      name: 'host',
      label: 'Database Host'
    },
    {
      name: 'port',
      label: 'Database Port',
      type: 'number'
    },
    {
      name: 'name',
      label: 'Database Name'
    },
    {
      name: 'user',
      label: 'Database User'
    },
    {
      name: 'password',
      label: 'Database Password',
      type: 'password'
    }
  ]
  return (
    <Formik
      initialValues={{
        host: '127.0.0.1',
        port: 3306,
        name: 'banmanager',
        user: 'minecraft_server',
        password: ''
      }}
      onSubmit={response => handleNext('success', response)}
    >
      <Form className="flex flex-col p-5 mt-5 space-y-4 lg:p-10 lg:pt-0 lg:space-y-6">
        <h2 className="text-xl leading-7 sm:text-xl">{currentState.context.storageType} Connection Details</h2>
        <h3 className="text-sm">Optional and only to used to generate a config.yml in your browser</h3>
        {fields.map(({ name, label, type }) => (
          <Field key={name} name={name}>
            {({ field }) => (
              <div className="relative">
                <label
                  htmlFor={name}
                  aria-label={label}
                  className="hidden"
                >
                  {label}
                </label>
                <input
                  {...field}
                  className="w-full p-4 font-semibold placeholder-gray-500 border rounded-lg outline-none lg:px-8 focus:ring-accent-blue focus:ring-1"
                  placeholder={label}
                  type={type || 'text'}
                  name={name}
                  id={name}
                />
              </div>
            )}
          </Field>
        ))}
        <button
          type="submit"
          className="mt-6 mb-12 md:mb-0 md:mt-10 py-3 px-8 text-white rounded-lg shadow cursor-pointer bg-red-500 hover:bg-red-600"
        >
          Next
        </button>
      </Form>
    </Formik>
  )
}

ConnectionForm.propTypes = {
  handleNext: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired
}
