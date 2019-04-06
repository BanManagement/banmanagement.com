import { Container, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'
import { getInitialProps } from '../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Support' isMobileFromSSR={isMobileFromSSR}>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Segment vertical>
          <Container text>
          Coming Soon
          </Container>
        </Segment>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
