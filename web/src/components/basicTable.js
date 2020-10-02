import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'

class BasicTable extends Component {
    constructor(props) {
        super(props);
    }

    headers = () => {
        const head = [];
        for(let i = 0; i < this.props.headers.length; ++i){
            head.push(<th>{this.props.headers[i]}</th>);
        }
        return head;
    }

    rows = () => {
        const rows = [];
        for(let i = 0; i < this.props.rows.length; ++i){
            const row = [];
            for(let j = 0; j < this.props.rows[i].length; ++j)
                row.push(<td>{this.props.rows[i][j]}</td>);
            rows.push(<tr>{row}</tr>);
        }
        return rows;
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <this.headers />
                    </tr>
                </thead>
                <tbody>
                    <this.rows />
                </tbody>
            </Table>
        );
    }
}

BasicTable.propTypes = {};

export default BasicTable;
