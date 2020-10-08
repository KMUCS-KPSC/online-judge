import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import DefaultLayout from '../layout/defaultLayout'
import FullHeightLayout from '../layout/fullHeightLayout'
import { Container, Row } from 'react-bootstrap'
import { DefaultFormat, CodingTestFormat } from '../components/problemFormat'

const GET_PROBLEM_QUERY = gql`
  query getProblem($id: Int!) {
    getProblem(id: $id) {
      id
      name
      markdown
    }
  }
`

class Problem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      problem: null,
    }
  }

  render() {
    return (
      <div>
        <Query
          query={GET_PROBLEM_QUERY}
          variables={{ id: parseInt(this.props.match.params.id) }}
          onCompleted={(data) => {
            const problem = data.getProblem

            console.log(problem)

            this.setState({
              problem: problem,
            })
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error! ${error.message}`
            console.log(data)
            return <div />
          }}
        </Query>
        {this.props.codingtest ? (
          <FullHeightLayout>
            <CodingTestFormat problems={[this.state.problem]} />
          </FullHeightLayout>
        ) : (
          <DefaultLayout>
            <Container xs>
              <Row>
                <DefaultFormat problem={this.state.problem} />
              </Row>
            </Container>
          </DefaultLayout>
        )}
      </div>
    )
  }
}

Problem.propTypes = {}

export default Problem
