import React, { Component } from 'react'
import { Navbar, Container, NavbarBrand } from 'react-bootstrap'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark>
          <Container>
            <NavbarBrand>Online Judge</NavbarBrand>
            <p>Copyright © 2020 by KPSC. All Rights Reserved</p>
          </Container>
        </Navbar>
      </div>
    )
  }
}

Footer.propTypes = {}

export default Footer
