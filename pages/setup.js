import { Container, Divider, Header, List, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'
import SyntaxHighlighter from '../components/SyntaxHighlighter'

// Code examples as JSX does not preserve newlines
const code = {
  messagesYml: `ban:
  player:
    disallowed: '&6You have been banned from this server for &4[reason] Use [pin]'`,
  mkdir: `mkdir /home/banmanager
cd /home/banmanager`,
  clone: `git clone https://github.com/BanManagement/BanManager-WebUI.git
git clone https://github.com/BanManagement/BanManager-WebAPI.git`,
  apiInstall: `cd /home/banmanager/BanManager-WebAPI
npm ci --production`,
  uiInstall: `cd /home/banmanager/BanManager-WebUI
npm ci --production`,
  uiEnv: `NODE_ENV=production
API_HOST=https://api.demo.banmanagement.com`
}

export default () => <DefaultLayout title='Setup'>
  <Segment vertical>
    <Container text>
      <Header as='h1'>How to install</Header>
      <p>A full guide for installing, configuring and running BanManager WebUI for use in production</p>
      <Header as='h2'>Prerequisites</Header>
      <p>The recommended installation requires the following stack:</p>
      <List bulleted>
        <List.Item><a href='https://dev.bukkit.org/projects/ban-management'>BanManager</a> setup on a Bukkit compatible server</List.Item>
        <List.Item>MySQL (this can be the same database used above but must be accessible)</List.Item>
        <List.Item>Git</List.Item>
        <List.Item><a href='https://nodejs.org/'>Node.js</a> 8 or above</List.Item>
        <List.Item>NGINX or equivalent (for SSL)</List.Item>
        <List.Item>A server with at least 1GB memory</List.Item>
        <List.Item>A registered domain name</List.Item>
      </List>
      <Divider horizontal>-</Divider>

      <Header as='h2'>Initial Setup</Header>
      <p>There are three parts, the Bukkit plugin which enables web only features, the UI which renders the page, and the API which is responsible for all state management.</p>

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

      <Header as='h2'>API</Header>
      <p>First we setup the API component as it is where all major configuration is handled.</p>
      <Header as='h3'>Install</Header>
      <SyntaxHighlighter language='bash'>{code.apiInstall}</SyntaxHighlighter>

      <p>Once dependencies have been downloaded and installed, run the setup command:</p>
      <SyntaxHighlighter language='bash'>npm run setup</SyntaxHighlighter>

      <Header as='h3'>Install questions</Header>
      <p>During the installation, the CLI will ask a number of questions to configure the application. Press <kbd>Enter</kbd> to use the default value. If you make a mistake during the installation process, simply restart the setup.</p>
      <p>The CLI will generate a .env file containing the necessary environment variables in order for the application to run. This will automatically be used on start up. If you do not wish to use this, simply remove the file and pass them in yourself when running the process.</p>

      <Header as='h4'>UI Site Hostname</Header>
      <p>Enter the exact URL your site will be available at, including the protocol for HTTP or HTTPS. For example <code>https://demo.banmanagement.com</code></p>
      <Header as='h4'>API Port</Header>
      <p>The port the API process should bind to. This defaults to port 3000. Pick a high numbered port that is not being used.</p>
      <Header as='h4'>Cookie Session Name</Header>
      <p>This defaults to bm-ui-sess and it is not recommended this be changed unless you plan on running multiple instances on the same domain.</p>
      <Header as='h4'>Top Level Cookie Domain</Header>
      <p>Ideally the API application will be running on a subdomain. In order to allow cookies to be shared between the applications, this should be set to the top level domain name. For example, if it is being run on <code>https://api.demo.banmanagement.com</code>, and the site is accessible via <code>https://demo.banmanagement.com</code>, then this value should be set to <code>demo.banmanagement.com</code>. If this value is incorrect, you will not be able to login.</p>
      <Header as='h4'>Contact Email Address</Header>
      <p>On setup, tokens are generated to enable push notifications. This is a requirement from vendors in order to contact you if this functionality is abused. This should be an email address that can receive mail.</p>
      <Header as='h4'>Database Host</Header>
      <p>This should be the host of the database used to setup web specific tables such as logins. This can be the same database used by the BanManager Bukkit plugin, but it does not have to be. The setup process will create the tables for you.</p>
      <Header as='h4'>Database Port</Header>
      <p>As above, this will default to 3306</p>
      <Header as='h4'>Database User</Header>
      <p>As above. Ensure this user has permissions to create tables.</p>
      <Header as='h4'>Database Password</Header>
      <p>As above</p>
      <Header as='h4'>Database Name</Header>
      <p>As above</p>
      <Header as='h4'>Add BanManager Server</Header>
      <p>In order to save time, you'll be asked to paste the contents of your <code>BanManager/config.yml</code> file. This will be used to retrieve the database connection for your punishment data. If these details are different (i.e. 127.0.0.1 but the API is running on a different server), ensure you modify this before pasting. You'll be able to add additional servers via the UI after setup. If tables are not found or the connection fails, you will be reprompted to paste in the YAML again.</p>
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
      <p>This is required to setup your login and associate your data. If you're not sure what this is, use a lookup tool such as <a href='https://mcuuid.net/'>https://mcuuid.net/</a> to lookup your UUID.</p>

      <Header as='h3'>Run</Header>
      <SyntaxHighlighter language='bash'>node server.js</SyntaxHighlighter>
      <p>In order to access the API publicly, it's recommended to use a web server such as NGINX. This is not covered by this setup guide.</p>
      <p>Note, you should use your OS recommended process manager to keep the API running in the background, e.g. systemd or you can use an alternative such as <a href='https://github.com/Unitech/pm2'>PM2</a>. This part is also not covered in the setup guide. However, you may find numerous <a href='https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04'>articles</a> elsewhere which cover this.</p>

      <Divider horizontal>-</Divider>

      <Header as='h2'>UI</Header>
      <p>Next we setup the UI component which is what you and your players will be viewing in a web browser.</p>
      <Header as='h3'>Install</Header>
      <SyntaxHighlighter language='bash'>{code.uiInstall}</SyntaxHighlighter>

      <p>Once dependencies have been downloaded and installed, create a <code>.env</code> file in the directory. This part is not yet covered by a CLI tool and must be setup manually.</p>
      <p>Add the following into the file, replacing the hostname with yours. Please note that this must be a publicly accessible domain, localhost will not work unless you are running this locally.</p>
      <SyntaxHighlighter language='bash'>{code.uiEnv}</SyntaxHighlighter>

      <p>Next, run the build command to generate the UI. This may take some time.</p>
      <SyntaxHighlighter language='bash'>npm run build</SyntaxHighlighter>

      <Header as='h3'>Run</Header>
      <p>Once complete, start the server. Note, please review the API Run section to cover this properly.</p>
      <SyntaxHighlighter language='bash'>node server.js</SyntaxHighlighter>

      <p>That's it! Now head over to your UI domain and login.</p>
    </Container>
  </Segment>
</DefaultLayout>
