import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import DefaultLayout from '../layout/defaultLayout'
import BasicTable from '../components/basicTable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const GET_PROBLEMS_QUERY = gql`
  query {
    getProblems {
      id
      name
      difficulty
      ac
      wa
    }
  }
`

class Problems extends Component {
  constructor(props) {
    super(props)

    const rows = []

    this.state = {
      headers: ['문제번호', '문제이름', '난이도', '정답률'],
      problems: rows,
    }
  }

  render() {
    return (
      <DefaultLayout>
        <Query
          query={GET_PROBLEMS_QUERY}
          onCompleted={(data) => {
            const problems = []

            for (let i = 0; i < data.getProblems.length; i++) {
              let row = {
                href: '#',
                row: [
                  data.getProblems[i].id,
                  <a key={i} href={`/problem/${data.getProblems[i].id}`}>
                    {data.getProblems[i].name}
                  </a>,
                  data.getProblems[i].difficulty,
                  (
                    (data.getProblems[i].ac /
                      (data.getProblems[i].ac + data.getProblems[i].wa)) *
                    100
                  ).toFixed(2) + '%',
                ],
              }
              problems.push(row)
            }

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
        <Container>
          <Row xs>
            <div>
              <p>Problems</p>
              <BasicTable
                headers={this.state.headers}
                rows={this.state.problems}
              />
            </div>
          </Row>
        </Container>
      </DefaultLayout>
    )
  }
}

Problems.propTypes = {}

export default Problems
