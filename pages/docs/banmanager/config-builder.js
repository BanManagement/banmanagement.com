import PropTypes from 'prop-types'
import { Layout } from 'components/layout'
import { BreadcrumbHeader } from 'components/breadcrumb-header'
import { Wizard } from 'components/pages/docs/banmanager/config-builder/wizard'

const breadcrumbs = [['Docs', '/docs'], ['Config Builder', '/docs/banmanager/config-builder']]

export async function getStaticProps () {
  const res = await fetch('https://raw.githubusercontent.com/BanManagement/BanManager/master/common/src/main/resources/config.yml')
  const content = await res.text()

  return {
    props: {
      configYaml: content
    },
    revalidate: 3600 // Cache for an hour
  }
}

function ConfigBuilderV7Page ({ configYaml }) {
  return (
    <Layout title="Config Builder v7" description="Generate a BanManager config for your Minecraft server">
      <BreadcrumbHeader breadcrumbs={breadcrumbs} />
      <div className="py-12 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 text-center">
          <Wizard configYaml={configYaml} />
        </div>
      </div>
    </Layout>
  )
}

ConfigBuilderV7Page.propTypes = {
  configYaml: PropTypes.string
}

export default ConfigBuilderV7Page
