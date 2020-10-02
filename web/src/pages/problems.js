import React, {Component} from 'react';
import BasicTable from '../components/basicTable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


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
            <Container>
                <Row xs>
                    <div>
                        <p>Problems</p>
                        <BasicTable headers={this.state.headers} rows={this.state.problems} />
                    </div>
                </Row>
            </Container>
        );
    }
}

Problems.propTypes = {};

export default Problems;
