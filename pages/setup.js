import { Container, Grid, Header, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'
import { getInitialProps } from '../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Setup' isMobileFromSSR={isMobileFromSSR}>
      <Container
        style={{ marginTop: '1em', display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
      >
        <Segment vertical>
          <Container text>
            <Header as='h1'>Setup Guides</Header>
            <Grid columns={2} divided stackable>
              <Grid.Row>
                <Grid.Column>
                  <Segment>
                    <a href='/setup/minecraft-server'>Minecraft Server Plugin</a>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <a href='/setup/web-application'>Web Application</a>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </Container>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
