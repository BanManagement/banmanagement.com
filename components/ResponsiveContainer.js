import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react'
import MenuLink from '../components/MenuLink'

const renderMenu = (items) => items.map(item => {
  if (item.as === 'a') {
    return <a key={item.name} href={item.href}>{item.name}</a>
  } else {
    return <MenuLink key={item.name} {...item} />
  }
})

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render () {
    const { children, getWidth, heading, leftItems, rightItems } = this.props
    const { fixed } = this.state
    const style = heading ? { minHeight: 500, padding: '1em 0em', display: 'flex', minHeight: '100vh', flexDirection: 'column' } : { padding: 0 }

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth} fireOnMount>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            color='green'
            textAlign='center'
            style={style}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              style={{ borderTop: 0 }}
            >
              <Container>
                <a href='/'><img src='/static/images/banmanager-icon.png' alt='Home' style={{ width: '2.5em' }} /></a>
                {renderMenu(leftItems)}
                <Menu.Item position='right' style={{ padding: 0 }}>
                  {renderMenu(rightItems)}
                </Menu.Item>
              </Container>
            </Menu>
            { heading }
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.node
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render () {
    const { children, getWidth, heading, leftItems } = this.props
    const { sidebarOpened } = this.state
    const style = heading ? { minHeight: 350, padding: '1em 0em', display: 'flex', minHeight: '100vh', flexDirection: 'column' } : { padding: 0 }

    return (
      <Responsive
        fireOnMount
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <MenuLink name='Home' href='/' />
          {renderMenu(leftItems)}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            color='green'
            inverted
            textAlign='center'
            style={style}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large' style={{ border: 'none' }}>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted href='https://demo.banmanagement.com'>
                    Demo
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }} href='https://github.com/BanManagement/BanManager-WebUI'>
                    Source
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            {heading}
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
}

const ResponsiveContainer = ({ children, getWidth, heading, mobile, leftItems, rightItems }) => (
  <div>
    <DesktopContainer getWidth={getWidth} heading={heading ? heading({}) : null} leftItems={leftItems} rightItems={rightItems}>{children}</DesktopContainer>
    <MobileContainer getWidth={getWidth} heading={heading ? heading({ mobile }) : null} leftItems={leftItems}>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.func,
  mobile: PropTypes.bool
}

export default ResponsiveContainer
