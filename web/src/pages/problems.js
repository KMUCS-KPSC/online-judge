import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Query} from "react-apollo";
import DefaultLayout from '../layout/defaultLayout'
import BasicTable from '../components/basicTable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const GET_PROBLEMS_QUERY = gql`
    query {
        getProblems{
            id,
            name,
            difficulty,
            ac,
            wa,
        }
    }`;

class Problems extends Component {
    constructor(props) {
        super(props);

        const rows = [
            {
                href: '#',
                row: ['0001', <a href='/problem/0001'>{'이거 보여주려고 어그로 끌었다'}</a>, '최고 난이도', '00.00%'],
            },
            {
                href: '#',
                row: ['0002', <a href='/problem/0001'>{'ICPC World Final'}</a>, '최고 난이도', '00.00%'],
            },
        ];
        
        this.state = {
            headers: [
                '문제번호',
                '문제이름',
                '난이도',
                '정답률',
            ],
            problems: rows,
        };
    }

    render() {
        return (
            <DefaultLayout>
                <Query query={GET_PROBLEMS_QUERY}
                       onCompleted={data => {
                            const problems = [];
                            
                            for(let i = 0; i < data.getProblems.length; i++){
                                let row = {
                                    href: '#',
                                    row: [
                                        data.getProblems[i].id,
                                        <a href={`/problem/${data.getProblems[i].id}`}>{data.getProblems[i].name}</a>,
                                        data.getProblems[i].difficulty,
                                        (data.getProblems[i].ac / (data.getProblems[i].ac + data.getProblems[i].wa) * 100).toFixed(2) + '%',
                                    ]
                                };
                                problems.push(row);
                            }
                            
                            this.setState({
                                problems: problems,
                            });
                       }}>
                    {({loading, error, data}) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return <div/> ;
                    }}
                </Query>
                <Container>
                    <Row xs>
                        <div>
                            <p>Problems</p>
                            <BasicTable headers={this.state.headers} rows={this.state.problems} />
                        </div>
                    </Row>
                </Container>
            </DefaultLayout>
        );
    }
}

Problems.propTypes = {};

export default Problems;
