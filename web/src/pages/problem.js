import React, { Component } from 'react'
import DefaultLayout from '../layout/defaultLayout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class Problem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DefaultLayout>
        <Container>
          <Row xs>
            <div>
              <p>Problem</p>
              <h3>제 3차 세계대전</h3>
              <hr />
              시간 제한: 1초
              <br />
              메모리 제한: 512MB
              <hr />
              <h3>문제</h3>
              <hr />
              <p>
                때는 2987년, 2차 세계대전 이후 평화를 유지한 채 놀라운 기술적
                발전을 거두고 있던 인간은 은하계 최악의 그리고 최강의 전투 종족
                달렉과 전쟁을 하게 된다. 전투를 지휘하던 윤상건은 우리은하
                전역에 있는 전투 우주선을 최대 개의 그룹으로 나누어 각 그룹끼리
                집결시키고 자 한다. 한 그룹에 속한 개의 우주선을 한곳에 이동
                시키는데 드는 비용은 다음과 같이 정의된다. 각 우주선은 3차원
                직교좌표공간에서의 좌표값 , , 값을 가진다. , , 값은 각각 해당
                그룹에 속한 개 우주선 의 , , 에 대한 산술평균값이다. 즉 다음과
                같다. 3차원 직교좌표공간에서 3개의 우주선이 한 직선 위에
                존재하거나 4개의 우주선이 하나의 평면 위에 존재하지 않는 다.
                상건이는 최대 개의 그룹으로 전투 우주선을 나누어 각 그룹의 집결
                비용의 합을 최소화 하려고 한다. 지구 연방 최고 의 코더인 당신이
                상건이를 도와주자!
              </p>
              <h3>입력</h3>
              <hr />
              <h3>출력</h3>
              <hr />
            </div>
          </Row>
        </Container>
      </DefaultLayout>
    )
  }
}

Problem.propTypes = {}

export default Problem
