import React from 'react'
import { List } from 'semantic-ui-react'

export default class ConfigList extends React.Component {
  renderItems (options) {
    return Object.entries(options).map(([ header, description ]) => {
      if (typeof description === 'string' || description.props) {
        return (
          <List.Item key={header}>
            <List.Icon />
            <List.Content>
              <List.Header>{header}</List.Header>
              <List.Description>{description}</List.Description>
            </List.Content>
          </List.Item>
        )
      } else {
        return (
          <List.Item key={header}>
            <List.List>
              <List.Item>
                <List.Icon />
                <List.Content>
                  <List.Header>{header}</List.Header>
                  <List.List>{this.renderItems(description)}</List.List>
                </List.Content>
              </List.Item>
            </List.List>
          </List.Item>
        )
      }
    })
  }

  render () {
    return <List>{this.renderItems(this.props.options)}</List>
  }
}
