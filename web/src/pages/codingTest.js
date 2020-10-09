import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import FullHeightLayout from '../layout/fullHeightLayout'
import { CodingTestFormat } from '../components/problemFormat'

const GET_PROBLEM_SET_QUERY = gql`
  query getProblemSet($ids: [Int]!) {
    getProblemSet(ids: $ids) {
      id
      name
      markdown
    }
  }
`

class CodingTest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      problems: [],
    }
  }

  render() {
    return (
      <div>
        <Query
          query={GET_PROBLEM_SET_QUERY}
          variables={{ ids: [1, 2] }}
          onCompleted={(data) => {
            const problems = data.getProblemSet

            console.log('codingtest', problems)

            this.setState({
              problems: problems,
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
        <FullHeightLayout>
          <CodingTestFormat problems={this.state.problems} />
        </FullHeightLayout>
      </div>
    )
  }
}

CodingTest.propTypes = {}

export default CodingTest
