import React, { Component } from 'react'
import { Nav, NavDropdown, Card, Container, Row, Col } from 'react-bootstrap'

import MarkdownRender from '../../markdownRender'
import ResultViewer from './resultViewer'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/theme-github'

const defaultCPP = `\
#include <iostream>
using namespace std;

int main(){
  ios::sync_with_stdio(false);
  cin.tie(0);
  cout << "Hello, world!" << endl;
  return 0;
}`

class CodingTestFormat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sSize: 10,
    }

    this.ratio = 60
    this.editor = React.createRef()
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
          <Col className="h-100 d-flex flex-column">
            <Row style={{ minHeight: `${this.ratio}%` }} className="border">
              <Card style={{ height: '100%', width: '100%' }}>
                <Card.Header style={{ padding: '0px' }}>
                  <Nav className="justify-content-end">
                    <Nav.Item>
                      <NavDropdown title="언어">
                        <NavDropdown.Item>C++</NavDropdown.Item>
                        <NavDropdown.Item>Java</NavDropdown.Item>
                        <NavDropdown.Item>Python3</NavDropdown.Item>
                      </NavDropdown>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body style={{ padding: '0px' }}>
                  <AceEditor
                    style={{ height: '100%', width: '100%' }}
                    mode="c_cpp"
                    theme="github"
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    defaultValue={defaultCPP}
                    ref={(ref) => {
                      this.editor = ref
                      console.log(this.editor)
                    }}
                  />
                </Card.Body>
              </Card>
            </Row>
            <Row className="border" style={{ height: `${100 - this.ratio}%` }}>
              <ResultViewer editor={this.editor} result={this.state.results} />
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

CodingTestFormat.propTypes = {}

export default CodingTestFormat
