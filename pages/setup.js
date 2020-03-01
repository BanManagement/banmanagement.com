import { Container, Grid, Header, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'
import { getInitialProps } from '../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Setup' isMobileFromSSR={isMobileFromSSR}>
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
          <Header as='h2'>Cross-Server Syncing Guides</Header>
          <Grid columns={1} divided stackable>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <a href='/setup/sync/all'>Share punishments across all servers</a>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <a href='/setup/sync/individual'>Server specific punishments with global punishment functionality</a>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <a href='/setup/sync/mixed'>Share specific punishments types across servers</a>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header as='h1'>Migration Guides</Header>
          <Grid columns={2} divided stackable>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <a href='/setup/migration/advancedban'>AdvancedBan</a>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <a href='/setup/migration/vanilla'>Vanilla Minecraft</a>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <a href='/setup/migration/h2'>BanManager H2</a>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
