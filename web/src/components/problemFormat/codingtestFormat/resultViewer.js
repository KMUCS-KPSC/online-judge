import React, { Component } from 'react'
import { withApollo } from '@apollo/react-hoc'
import { gql } from 'apollo-boost'

import { Nav, Card } from 'react-bootstrap'

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

class ResultViewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
    }
  }

  async runQuery(code) {
    console.log(this.props)
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
      <Card style={{ height: '100%', width: '100%' }} scrollable={true}>
        <Card.Header style={{ padding: '10px' }}>실행결과</Card.Header>
        <Card.Body style={{ 'overflow-y': 'scroll' }}>
          {this.state.results && this.state.results}
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
                    this.props.editor.editor &&
                      this.props.editor.editor.getValue()
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
    )
  }
}

ResultViewer.propTypes = {}

export default withApollo(ResultViewer)
