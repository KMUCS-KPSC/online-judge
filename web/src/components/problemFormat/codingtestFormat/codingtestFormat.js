import React, { Component } from 'react'
import { Card, Container, Row, Col, Nav } from 'react-bootstrap'

import MarkdownRender from '../../markdownRender'
import RightViewer from './rightViewer'

class CodingTestFormat extends Component {
  constructor(props) {
    super(props)

    this.rightColumn = React.createRef()
  }

  render() {
    return (
      <Card className="mw-100" style={{ height: '100%' }} xl>
        <Card.Header style={{ padding: '10px' }}>
          <Nav variant="tabs" defaultActiveKey="#first" default>
            <Nav.Item>
              <Nav.Link href="#first">문제 1</Nav.Link>
            </Nav.Item>
            {this.props.problems &&
              this.props.problems.slice(1).map((item, index) => (
                <Nav.Item key={index}>
                  <Nav.Link>문제 {index + 1}</Nav.Link>
                </Nav.Item>
              ))}
          </Nav>
        </Card.Header>
        <Card.Body style={{ height: '100%', padding: '0px' }}>
          <Container className="mw-100" style={{ height: '100%' }} xl>
            <Row style={{ height: '100%' }}>
              <Col style={{ height: '100%' }} className="border-right">
                <Row
                  style={{
                    height: '100%',
                    overflow: 'scroll',
                    padding: '10px',
                  }}
                >
                  <div>
                    <MarkdownRender>
                      {this.props.problems &&
                        this.props.problems[0] &&
                        this.props.problems[0].markdown}
                    </MarkdownRender>
                  </div>
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
        </Card.Body>
      </Card>
    )
  }
}

CodingTestFormat.propTypes = {}

export default CodingTestFormat
