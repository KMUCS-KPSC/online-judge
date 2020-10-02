import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class Discuss extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row xs>
                    <div>
                        <p>Discuss</p>
                    </div>
                </Row>
            </Container>
        );
    }
}

Discuss.propTypes = {};

export default Discuss;
