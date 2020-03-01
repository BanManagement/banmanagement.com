import { Container, Header, List, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'
import { getInitialProps } from '../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='FAQ' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>FAQ</Header>

          <Header as='h2' id='startup-issues'>Startup Issues</Header>
          <Header as='h4'>Q: BanManager is showing as red in /plugins</Header>
          <p>Please ensure you have configured the plugin correctly and check either your server log or console for more information</p>

          <Header as='h4'>Q: When trying to /ban a player it displays /ban {'<player> <reason>'}</Header>
          <p>The plugin is not enabled, please check your server startup log for more information</p>

          <Header as='h4'>Q: BanManager is unable to connect to the database</Header>
          <p>This can be caused by a number of issues, below lists the most common. If these do not resolve your issue, feel free to request <a href='/support'>Support</a>.</p>
          <List bulleted>
            <List.Item>Ensure you have created the database. Verify this by logging in with the user you are connecting with (via mysql -p -u) and running <code>SHOW DATABASES;</code>. If the database is not contained in the results, it either has not been created or the user does not have permission to access it.</List.Item>
            <List.Item>If you are connecting to the database from another server, you need to explicitly grant access to it for the remote ip address as follows: <code>GRANT ALL PRIVILEGES ON dbname.* TO username@'IP' IDENTIFIED BY 'password';</code> replacing dbname, username and password with your respective details. Then run <code>FLUSH PRIVILEGES;</code> to ensure they are updated.</List.Item>
            <List.Item>If after verifing the aforementioned checks the plugin is still unable to connect, check the MySQL/MariaDB error logs.</List.Item>
          </List>

          <Header as='h4'>Q: I'd like to use BanManager with Tekkit Classic, which version is compatible?</Header>
          <p>v2.x versions of BanManager have been reported as compatible. At a mimimum you will require <a href='https://dev.bukkit.org/projects/ban-management/files/675342'>v2.2</a>, please ensure <code>useSyncChat</code> is enabled in the config. Please note the following: documentation and guides are for recent BanManager versions only, there may be bugs, cross-server sync is not supported and older versions of BanManager are name based, not UUID meaning a change of name will evade bans for online-mode servers.</p>

          <Header as='h4'>java.sql.SQLSyntaxErrorException: Table 'bm_players' doesn't exist</Header>
          <p>This occurs when the wrong JDBC driver is in use. If you are using MariaDB, ensure <code>storageType</code> is set to <code>mariadb</code>.</p>

          <Header as='h4'>me.confuser.banmanager.internal.mysql.cj.exceptions.CJException: Access denied for user 'root'@'localhost'</Header>
          <p>It is not recommended you use root to connect to the database. Please use or create a non-root user to connect with.</p>

          <Header as='h4'> [bm-local housekeeper] WARN me.confuser.banmanager.internal.hikari.pool.ProxyLeakTask - Connection leak detection triggered</Header>
          <p>This is usually caused by a slow database connection. If this is expected, disable this check by setting <code>leakDetection </code> to 0. Otherwise, check the resources your database server has and tweak accordingly.</p>

          <Header as='h2' id='sync'>Cross-Server Sync</Header>
          <Header as='h4'>Q: I punished a player but it doesn't appear to have synced across all servers</Header>
          <p>Each server polls for data changes including new punishments. Open your <code>schedules.yml</code> file and check your timings. By default local punishments are checked every 30 seconds and global punishments every 2 minutes. Checking more frequently will increase database usage. If this is insufficient, enable <code>checkOnJoin</code> in your config.yml; this will check the database for new punishments when a player joins each server.</p>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
