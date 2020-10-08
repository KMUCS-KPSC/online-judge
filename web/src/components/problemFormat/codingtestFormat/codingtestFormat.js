import React, { Component } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'

import MarkdownRender from '../../markdownRender'
import RightViewer from './rightViewer'

class CodingTestFormat extends Component {
  constructor(props) {
    super(props)

    this.rightColumn = React.createRef()
  }

  render() {
    return (
      <Container className="mw-100" style={{ height: '100%' }} xl>
        <Row style={{ height: '100%' }}>
          <Col style={{ height: '100%' }} className="border">
            <Row className="border flex-grow-1" style={{ height: '100%' }}>
              <Card style={{ height: '100%', width: '100%' }}>
                <Card.Header style={{ padding: '10px' }}>문제</Card.Header>
                <Card.Body style={{ height: '100%', overflow: 'scroll' }}>
                  <MarkdownRender>
                    {this.props.problem ? this.props.problem.markdown : ''}
                  </MarkdownRender>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col
            className="h-100 d-flex flex-column"
            ref={(ref) => (this.rightColumn = ref)}
          >
            <RightViewer rightColumn={this.rightColumn} />
          </Col>
        </Row>
      </Container>
    )
  }
}

CodingTestFormat.propTypes = {}

export default CodingTestFormat
