import React, { Component } from 'react'
import MarkdownRender from '../markdownRender'

class DefaultFormat extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <MarkdownRender>
          {this.props.problem ? this.props.problem.markdown : ''}
        </MarkdownRender>
      </div>
    )
  }
}

DefaultFormat.propTypes = {}

export default DefaultFormat
