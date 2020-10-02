import React, {Component} from 'react';
import BasicTable from '../components/basicTable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class Rank extends Component {
    constructor(props) {
        super(props);

        const rows = [
            ['1', 'Taste Why Frame', '맞았는뒈 왜 틀뤼쥐', 'Inf', 'Inf', 'Inf', 'Inf'],
        ];
        
        this.state = {
            headers: [
                '등수',
                '아이디',
                '상태 메시지',
                '맞은문제',
                '제출',
                '정답 비율',
                '코드포스 레이팅',
            ],
            users: rows,
        };
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md">
                    <p>Rank</p>
                    <BasicTable headers={this.state.headers} rows={this.state.users} />
                </Row>
            </Container>
        );
    }
}

Rank.propTypes = {};

export default Rank;
