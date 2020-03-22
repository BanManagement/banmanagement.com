import React from 'react'
import { Container, Divider, Header, List, Segment } from 'semantic-ui-react'
import DefaultLayout from '../../components/DefaultLayout'
import SyntaxHighlighter from '../../components/SyntaxHighlighter'
import { getInitialProps } from '../../utils'

// Code examples as JSX does not preserve newlines
const code = {
  messagesYml: `ban:
  player:
    disallowed: '&6You have been banned from this server for &4[reason] Use [pin]'`,
  mkdir: `mkdir /home/banmanager
cd /home/banmanager`,
  clone: 'git clone https://github.com/BanManagement/BanManager-WebUI.git',
  uiInstall: `cd /home/banmanager/BanManager-WebUI
npm ci --production`,
  uiEnv: `CONTACT_EMAIL
ENCRYPTION_KEY
SESSION_KEY
NOTIFICATION_VAPID_PUBLIC_KEY
NOTIFICATION_VAPID_PRIVATE_KEY
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME`
}

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Setup Web Application' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>Setup Web Application</Header>
          <p>A full guide for installing, configuring and running BanManager WebUI for use in production</p>
          <Header as='h2'>Prerequisites</Header>
          <p>The recommended installation requires the following stack:</p>
          <List bulleted>
            <List.Item><a href='/setup/minecraft-server'>BanManager</a> setup on a Bukkit/Sponge compatible server</List.Item>
            <List.Item>MySQL (this can be the same database used above but must be accessible)</List.Item>
            <List.Item>Git</List.Item>
            <List.Item><a href='https://nodejs.org/'>Node.js</a> 8 or above</List.Item>
            <List.Item>NGINX or equivalent (for SSL)</List.Item>
            <List.Item>A server with at least 1GB memory</List.Item>
            <List.Item>A registered domain name</List.Item>
          </List>
          <Divider horizontal>-</Divider>

          <Header as='h2'>Initial Setup</Header>
          <p>There are two parts, the Minecraft plugin which enables web only features and the UI which renders the page and provides a GraphQL API.</p>

          <Header as='h3'>BanManager-WebEnhancer setup</Header>
          <p>This is a required Bukkit plugin which enables web only features.</p>
          <List ordered>
            <List.Item><a href='https://ci.frostcast.net/job/BanManager-WebEnhancer/'>Download</a> and add the jar to your Bukkit compatible server. The <a href='https://github.com/BanManagement/BanManager-WebEnhancer'>source code</a> is also available.</List.Item>
            <List.Item>
            Edit <code>plugins/BanManager/messages.yml</code>, and add a <code>[pin]</code> token to the ban.player.disallowed &amp; tempban.player.disallowed messages, e.g.
              <br />
              <SyntaxHighlighter language='yaml'>{code.messagesYml}</SyntaxHighlighter>
            </List.Item>
            <List.Item>Restart the server or enable BanManager-WebEnhancer plugin and execute /bmreload</List.Item>
          </List>

          <Header as='h3'>Docker Images</Header>
          <p>Coming Soon</p>

          <Header as='h3'>Create a directory</Header>
          <p>Create a directory on your server for your installation. This can be a different server than your Minecraft server (as long it can connect to the MySQL database). We'll name it 'banmanager' in this example but you can use whatever you like.</p>
          <SyntaxHighlighter language='bash'>{code.mkdir}</SyntaxHighlighter>

          <Header as='h3'>Download the applications</Header>
          <SyntaxHighlighter language='bash'>{code.clone}</SyntaxHighlighter>

          <Divider horizontal>-</Divider>

          <Header as='h2'>UI</Header>
          <Header as='h3'>Install</Header>
          <SyntaxHighlighter language='bash'>{code.uiInstall}</SyntaxHighlighter>

          <p>Once dependencies have been downloaded and installed, run the setup command:</p>
          <SyntaxHighlighter language='bash'>npm run setup</SyntaxHighlighter>

          <Header as='h3'>Install questions</Header>
          <p>During the installation, the CLI will ask a number of questions to configure the application. Press <kbd>Enter</kbd> to use the default value. If you make a mistake during the installation process, simply restart the setup.</p>
          <p>The CLI will generate a .env file containing the necessary environment variables in order for the application to run. This will automatically be used on start up. If you do not wish to use this, simply remove the file and pass in the environment variables yourself when running the process.</p>

          <Header as='h4'>Contact Email Address</Header>
          <p>On setup, tokens are generated to enable push notifications. This is a requirement from vendors in order to contact you if this functionality is abused. This should be an email address that can receive mail.</p>
          <Header as='h4'>Database Host</Header>
          <p>This should be the host of the database used to setup web specific tables such as logins. This can be the same database used by the BanManager Minecraft plugin, but it does not have to be. The setup process will create the tables for you.</p>
          <Header as='h4'>Database Port</Header>
          <p>As above, this will default to 3306</p>
          <Header as='h4'>Database User</Header>
          <p>As above. Ensure this user has permissions to create tables.</p>
          <Header as='h4'>Database Password</Header>
          <p>As above</p>
          <Header as='h4'>Database Name</Header>
          <p>As above</p>
          <Header as='h4'>Add BanManager Server</Header>
          <p>You will be prompted to specify details of your BanManager plugin database connection details. If tables are not found or the connection fails, you will be reprompted the question again.</p>
          <Header as='h4'>playerPins table</Header>
          <p>This is the name of the table which contains login pins. By default this is set to bm_player_pins and is the value within your <code>BanManager-WebEnhancer/config.yml</code> file.</p>
          <Header as='h4'>playerReportLogs table</Header>
          <p>This is the name of the table which contains report log data. By default this is set to bm_report_logs and is the value within your <code>BanManager-WebEnhancer/config.yml</code> file.</p>
          <Header as='h4'>serverLogs table</Header>
          <p>This is the name of the table which contains report log data. By default this is set to bm_server_logs and is the value within your <code>BanManager-WebEnhancer/config.yml</code> file.</p>
          <Header as='h4'>Console UUID</Header>
          <p>BanManager generates a UUID to use when punishing players by the console. This can be found in your <code>BanManager/console.yml</code> file. This record must exist.</p>
          <Header as='h4'>Server Name</Header>
          <p>Like the legacy UI, you can name servers in order to differentiate between where punishments occurred. This is useful for multi-server setups. This can be whatever you like.</p>
          <Header as='h4'>Your Email Address</Header>
          <p>Set this to an address you wish to use to login with. This does not need to be the same email address as your Mojang account.</p>
          <Header as='h4'>Your Password</Header>
          <p>Set this to a value you wish to use to login with. This does not and should NOT be the same password as your Mojang account. If you forget this password, you can login using a pin generated in-game via <code>/bmpin</code> command (requires BanManager-WebEnhancer).</p>
          <Header as='h4'>Your Minecraft Player UUID</Header>
          <p>This is required to setup your login and associate your data. If you're not sure what this is, use a lookup tool such as <a href='https://mcuuid.net/'>https://mcuuid.net/</a> to lookup your online UUID.</p>

          <Header as='h3'>Run</Header>
          <p>The following environment variables are required and should have been generated by the previous setup step.</p>
          <SyntaxHighlighter language='bash'>{code.uiEnv}</SyntaxHighlighter>
          <p>If you are not using the .env file, you must pass these variables yourself in the next steps.</p>

          <p>Next, run the build command to generate the UI. This may take some time.</p>
          <SyntaxHighlighter language='bash'>npm run build</SyntaxHighlighter>

          <p>Now start the server:</p>
          <SyntaxHighlighter language='bash'>node server.js</SyntaxHighlighter>

          <p>By default the server will bind to port 3000. To change this specify the port via a <code>PORT</code> environment variable.</p>
          <p>It is highly recommended to use a web server such as NGINX to provide HTTPS support and defend against a number of common web attacks. Certificates for HTTPS can be obtained freely via <a href='https://letsencrypt.org/'>Let's Encrypt</a>. This is not covered by this setup guide.</p>
          <p>Note, you should use your OS recommended process manager to keep the API running in the background, e.g. systemd or you can use an alternative such as <a href='https://github.com/Unitech/pm2'>PM2</a>. This part is also not covered in the setup guide. However, you may find numerous <a href='https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04'>articles</a> elsewhere which cover this.</p>

          <p>That's it! Now head over to your UI domain and login.</p>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
