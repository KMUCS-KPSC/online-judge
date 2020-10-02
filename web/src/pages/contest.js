import React, {Component} from 'react';
import BasicTable from '../components/basicTable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class Contest extends Component {
    constructor(props) {
        super(props);

        const rows = [
            {
                href: '#',
                row: ['2029 ICPC World Final', 'Taste Why Frame', '인공지능', '2029년 8월 1일', '2029년 8월 2일', '종료'],
            },
            {
                href: '#',
                row: ['2131 우리은하 대학생 프로그래밍 경진대회', 'Taste Why Frame', '인공지능', '2131년 8월 1일', '2131년 8월 2일', '종료'],
            },
        ];
        
        this.state = {
            headers: [
                '대회이름',
                '우승',
                '준우승',
                '시작',
                '종료',
                '상태',
            ],
            contests: rows,
        };
    }

    render() {
        return (
            <Container>
                <Row xs>
                    <div>
                        <p>Contest</p>
                        <BasicTable headers={this.state.headers} rows={this.state.contests} />
                    </div>
                </Row>
            </Container>
        );
    }
}

Contest.propTypes = {};

export default Contest;
