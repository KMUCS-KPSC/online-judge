import React, { Component } from 'react'
import { withApollo } from '@apollo/react-hoc'
import { gql } from 'apollo-boost'
import { Nav, NavDropdown, Card, Container, Row, Col } from 'react-bootstrap'

import MarkdownRender from '../markdownRender'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/theme-github'

const GET_RUN_RESULT_QUERY = gql`
  query getRunResult(
    $id: String!
    $problem: Int!
    $lang: String!
    $code: String!
  ) {
    getRunResult(id: $id, problem: $problem, lang: $lang, code: $code) {
      type
      res
    }
  }
`

const defaultCPP = `\
#include <iostream>
using namespace std;

int main(){
  ios::sync_with_stdio(false);
  cin.tie(0);
  cout << "Hello, world!" << endl;
  return 0;
}`

class ResultViewer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>{this.props.result && this.props.result}</div>
  }
}

class CodingTestFormat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sSize: 10,
      results: [],
    }

    this.editor = React.createRef()
  }

  async runQuery(code) {
    const { data } = await this.props.client.query({
      query: GET_RUN_RESULT_QUERY,
      variables: { id: 'tmp', problem: 1, lang: 'cpp', code: code },
    })
    console.log(data.getRunResult)

    this.setState({
      results: (
        <Card body>
          <pre>{data.getRunResult.res}</pre>
        </Card>
      ),
    })
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
            <Row style={{ height: '70%' }} className="border">
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
                <Card.Footer style={{ padding: '0px' }}>
                  <Nav className="justify-content-end">
                    <Nav.Item>
                      <Nav.Link>제출</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => {
                          this.runQuery(
                            this.editor.editor && this.editor.editor.getValue()
                          )
                        }}
                      >
                        실행
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link>초기화</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Footer>
              </Card>
            </Row>
            <Row className="border flex-grow-1">
              <Card style={{ height: '100%', width: '100%' }}>
                <Card.Header style={{ padding: '10px' }}>실행결과</Card.Header>
                <Card.Body>
                  <ResultViewer result={this.state.results} />
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

CodingTestFormat.propTypes = {}

export default withApollo(CodingTestFormat)
