import { Container, Header, List, Segment, Table } from 'semantic-ui-react'
import DefaultLayout from '../../components/DefaultLayout'
import { getInitialProps } from '../../utils'
import { commands, flags, globalCommands } from '../../data/commands'
import permissions from '../../data/permissions'

// Code examples as JSX does not preserve newlines

const renderRows = rows => rows.map(row => <Table.Row key={row[0]}>{row.map(r => <Table.Cell key={r}>{r}</Table.Cell>)}</Table.Row>)

function Page ({ isMobileFromSSR }) {
  const commandRows = renderRows(commands)
  const flagRows = renderRows(flags)
  const globalCommandRows = renderRows(globalCommands)
  const permissionRows = renderRows(permissions)

  return (
    <DefaultLayout title='Commands &amp; Permissions' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1' id='commands'>Commands &amp; Permissions</Header>
          <List ordered>
            <List.Item>
              <a href='#commands'>Commands</a>
              <List.List>
                <List.Item><a href='#global-commands'>Global Commands</a></List.Item>
                <List.Item><a href='#command-flags'>Command Flags</a></List.Item>
                <List.Item><a href='#time-format'>Time Format</a></List.Item>
              </List.List>
            </List.Item>
            <List.Item><a href='#permissions'>Permissions</a></List.Item>
          </List>

          <p>All commands have aliases prefixed with bm, e.g. /bmban, /bmtempban etc.</p>
          <p><strong>Key</strong> [optional] {'<required> <option 1 || option 2 || option 3>'}</p>

          <Table celled selectable striped columns={4}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Command</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Flags</Table.HeaderCell>
                <Table.HeaderCell>Permission</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {commandRows}
            </Table.Body>
          </Table>

          <Header as='h3' id='global-commands'>Global Commands</Header>
          <p>These commands are only available if the global database option within your config is enabled. These commands are simply for syncing bans across multiple servers, and do not have as granulated permissions as normal local commands as defined above.</p>
          <p>The time it takes for each action to take affect depends on the interval your global scheduler is set to within your schedules.yml file is. Default is 5 minutes.</p>
          <Table celled selectable striped columns={4}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Command</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Permission</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {globalCommandRows}
            </Table.Body>
          </Table>

          <Header as='h3' id='command-flags'>Flags</Header>
          <p>Some commands allow flags, see above for which commands can use what. Flags (singular or multiple) can be used anywhere after the command name, including the beginning, middle and even end.</p>
          <List bulleted>
            <List.Item>/ban -s confuser test</List.Item>
            <List.Item>/ban confuser -s test</List.Item>
            <List.Item>/ban confuser test -s</List.Item>
            <List.Item>/ban confuser this is the -s reason</List.Item>
          </List>

          <Table celled selectable striped columns={4}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Flag</Table.HeaderCell>
                <Table.HeaderCell>Alias</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Permission</Table.HeaderCell>
                <Table.HeaderCell>Example</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {flagRows}
            </Table.Body>
          </Table>

          <Header as='h3' id='time-format'>Time Format</Header>
          <p>Any commands which denote a <code>{'<timeDiff>'}</code> argument can be used as follows:</p>
          <List bulleted>
            <List.Item>10s = 10 seconds</List.Item>
            <List.Item>10m = 10 minutes</List.Item>
            <List.Item>10h = 10 hours</List.Item>
            <List.Item>10d = 10 days</List.Item>
            <List.Item>10mo = 10 months</List.Item>
            <List.Item>10y = 10 years</List.Item>
          </List>
          <Header as='h4'>Usage</Header>
          <List bulleted>
            <List.Item>/tempban confuser 1d Test</List.Item>
            <List.Item>/tempban confuser 1w3d Test</List.Item>
          </List>

          <Header as='h2' id='permissions'>Permissions</Header>
          <p>Please note that most commands have more permissions than listed above, and will be denoted here. BanManager has been designed to be as flexible as possible, hence the plethora of permissions.</p>
          <Table celled selectable striped columns={4}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Permission</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {permissionRows}
            </Table.Body>
          </Table>

        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
