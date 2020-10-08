import React, { Component } from 'react'

import { Nav, Card, Row, NavDropdown } from 'react-bootstrap'

import ResultViewer from './resultViewer'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/theme-github'

const defaultCPP = `\
#include <iostream>
using namespace std;

int main(){
  ios::sync_with_stdio(false);
  cin.tie(0);
  cout << "Hello, world!" << endl;
  return 0;
}`

class RightViewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
    }

    this.dragStartPosition = 0

    this.dragbarSize = 10

    this.ratio = 60
    this.editor = React.createRef()
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Row
          style={{
            height: `calc(${this.ratio}% - ${this.state.offset}px)`,
          }}
          className="border"
        >
          <Card style={{ height: '100%', width: '100%' }}>
            <Card.Header style={{ padding: '0px' }}>
              <Nav className="justify-content-end">
                <Nav.Item>
                  <NavDropdown title="언어">
                    <NavDropdown.Item>C++</NavDropdown.Item>
                    <NavDropdown.Item>Java</NavDropdown.Item>
                    <NavDropdown.Item>Python3</NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body style={{ padding: '0px' }}>
              <AceEditor
                style={{ height: '100%', width: '100%' }}
                mode="c_cpp"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                defaultValue={defaultCPP}
                ref={(ref) => {
                  this.editor = ref
                  console.log(this.editor)
                }}
              />
            </Card.Body>
          </Card>
        </Row>
        <Row
          draggable={true}
          onDragStart={(event) => {
            console.log('dragStart!!', event.pageY)
            this.dragStartPosition = event.pageY
          }}
          onDragEnd={(event) => {
            console.log('dragEnd!!', event.pageY)
            let nextOffset =
              this.state.offset + this.dragStartPosition - event.pageY

            console.log('ref', this.props.rightColumn.clientHeight)
            let fh = this.props.rightColumn.clientHeight
            nextOffset = Math.min(nextOffset, fh * 0.5)
            nextOffset = Math.max(nextOffset, -fh * 0.2)
            console.log(fh)
            this.setState({
              offset: nextOffset,
            })
          }}
          style={{ minHeight: `5px`, cursor: 'ns-resize' }}
        ></Row>
        <Row
          className="border"
          style={{
            height: `calc(${100 - this.ratio}% + ${this.state.offset}px - ${
              this.dragbarSize
            }px)`,
          }}
        >
          <ResultViewer editor={this.editor} result={this.state.results} />
        </Row>
      </div>
    )
  }
}

RightViewer.propTypes = {}

export default RightViewer
