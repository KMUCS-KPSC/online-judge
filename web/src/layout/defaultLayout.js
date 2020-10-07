import React, { Component } from 'react'
import NavBar from '../components/navBar'
import Footer from '../components/footer'

class DefaultLayout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

DefaultLayout.propTypes = {}

export default DefaultLayout
