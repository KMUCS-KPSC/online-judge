import React, {Component} from 'react';
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
} from 'react-bootstrap';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">KPSC Online Judge</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/problems">문제 목록</Nav.Link>
                        <Nav.Link href="/contest">대회</Nav.Link>
                        <Nav.Link href="/rank">랭킹</Nav.Link>
                        <Nav.Link href="/discuss">토론</Nav.Link>
                        <NavDropdown title="메뉴" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">로그아웃</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">내정보</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">기부하기</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">무조건 기부하기</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavBar.propTypes = {};

export default NavBar;
