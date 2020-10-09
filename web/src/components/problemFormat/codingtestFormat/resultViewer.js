import React, { Component } from 'react'
import { withApollo } from '@apollo/react-hoc'
import { gql } from 'apollo-boost'

import { Nav, Card, ListGroup, ListGroupItem } from 'react-bootstrap'

const GET_RUN_RESULT_QUERY = gql`
  query getRunResult(
    $id: String!
    $problem: Int!
    $lang: String!
    $code: String!
    $sample: Boolean!
  ) {
    getRunResult(
      id: $id
      problem: $problem
      lang: $lang
      code: $code
      sample: $sample
    ) {
      type
      res
      runtime
      in
      ans
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

  async runQuery(code, submit) {
    console.log(this.props)
    const { data } = await this.props.client.query({
      query: GET_RUN_RESULT_QUERY,
      variables: {
        id: 'tmp',
        problem: this.props.problem.id,
        lang: 'cpp',
        code: code,
        sample: !submit,
      },
    })

    this.setState({
      results: submit ? (
        <Card>
          <Card.Body>
            <Card.Title>채점 결과</Card.Title>
            {data.getRunResult.map((item, index) => (
              <div key={index}>
                <small>{`테스트 ${index + 1} `}</small>
                {item.type === 'ac' && (
                  <span style={{ color: 'blue' }}>정답입니다!</span>
                )}
                {item.type === 'wa' && (
                  <span style={{ color: 'red' }}>틀렸습니다</span>
                )}
                {item.type === 'runtime_err' && (
                  <span style={{ color: 'red' }}>런타임 에러</span>
                )}
                <small>{` (${
                  Math.round(item.runtime * 1000 * 100) / 100
                }ms)`}</small>
                <br />
              </div>
            ))}
          </Card.Body>
        </Card>
      ) : (
        data.getRunResult.map((item, index) => (
          <div key={index}>
            <Card>
              <Card.Body>
                <Card.Title>Test Case {index + 1}</Card.Title>
                {item.type !== 'compile_err' && (
                  <div>
                    {'입력값'}
                    <blockquote>
                      <pre>{item.in}</pre>
                    </blockquote>
                    {'정답'}
                    <blockquote>
                      <pre>{item.ans}</pre>
                    </blockquote>
                  </div>
                )}
                {'출력값'}
                <blockquote>
                  <pre>{item.res}</pre>
                </blockquote>

                {item.type === 'ac' && (
                  <span style={{ color: 'blue' }}>정답입니다!</span>
                )}
                {item.type === 'wa' && (
                  <span style={{ color: 'red' }}>틀렸습니다</span>
                )}
                {item.type === 'runtime_err' && (
                  <span style={{ color: 'red' }}>런타임 에러</span>
                )}
                {item.type === 'compile_err' && (
                  <span style={{ color: 'red' }}>컴파일 에러</span>
                )}
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  {`실행시간: ${Math.round(item.runtime * 1000 * 100) / 100}ms`}
                </ListGroupItem>
              </ListGroup>
            </Card>
            <br />
          </div>
        ))
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
              <Nav.Link
                onClick={() => {
                  this.setState({
                    results: [],
                  })
                  this.runQuery(
                    this.props.editor.editor &&
                      this.props.editor.editor.getValue(),
                    true
                  )
                }}
              >
                제출
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  this.setState({
                    results: [],
                  })
                  this.runQuery(
                    this.props.editor.editor &&
                      this.props.editor.editor.getValue(),
                    false
                  )
                }}
              >
                실행
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Footer>
      </Card>
    )
  }
}

ResultViewer.propTypes = {}

export default withApollo(ResultViewer)
