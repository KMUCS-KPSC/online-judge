import React, {Component} from 'react';
import DefaultLayout from '../layout/defaultLayout'

class Landing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DefaultLayout>
                <p>Hello, world!</p>
            </DefaultLayout>
        );
    }
}

Landing.propTypes = {};

export default Landing;
