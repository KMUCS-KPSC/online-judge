import React, { Component } from 'react'
import DefaultLayout from '../layout/defaultLayout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class Discuss extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DefaultLayout>
        <Container>
          <Row xs>
            <div>
              <p>Discuss</p>
            </div>
          </Row>
        </Container>
      </DefaultLayout>
    )
  }
}

Discuss.propTypes = {}

export default Discuss
