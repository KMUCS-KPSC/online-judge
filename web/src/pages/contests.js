import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import DefaultLayout from '../layout/defaultLayout'
import BasicTable from '../components/basicTable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const GET_CONTESTS_QUERY = gql`
  query {
    getContests {
      id
      name
      first
      second
      start
      end
      status
    }
  }
`

class Contests extends Component {
  constructor(props) {
    super(props)

    const rows = []

    this.state = {
      headers: ['대회이름', '우승', '준우승', '시작', '종료', '상태'],
      contests: rows,
    }
  }

  render() {
    return (
      <DefaultLayout>
        <Query
          query={GET_CONTESTS_QUERY}
          onCompleted={(data) => {
            const contests = []

            for (let i = 0; i < data.getContests.length; i++) {
              let row = {
                href: '#',
                row: [
                  <a key={i} href={`/contest/${data.getContests[i].id}`}>
                    {data.getContests[i].name}
                  </a>,
                  data.getContests[i].first,
                  data.getContests[i].second,
                  data.getContests[i].start,
                  data.getContests[i].end,
                  data.getContests[i].status,
                ],
              }
              contests.push(row)
            }

            this.setState({
              contests: contests,
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
              <p>Contests</p>
              <BasicTable
                headers={this.state.headers}
                rows={this.state.contests}
              />
            </div>
          </Row>
        </Container>
      </DefaultLayout>
    )
  }
}

Contests.propTypes = {}

export default Contests
