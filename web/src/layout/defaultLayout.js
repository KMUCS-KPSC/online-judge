import React, {Component} from 'react';
import Footer from '../components/footer'
import {
    Navbar,
    Container,
    NavbarBrand,
} from 'react-bootstrap';


class DefaultLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

DefaultLayout.propTypes = {};

export default DefaultLayout;