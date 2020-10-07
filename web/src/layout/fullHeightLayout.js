import React, { Component } from 'react'
import NavBar from '../components/navBar'
import Footer from '../components/footer'

class FullHeightLayout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <NavBar style={{ flex: '0' }} />
        <div style={{ overflow: 'hidden', flex: '1', position: 'relative' }}>
          {this.props.children}
        </div>
        <Footer style={{ flex: '0' }} />
      </div>
    )
  }
}

FullHeightLayout.propTypes = {}

export default FullHeightLayout
