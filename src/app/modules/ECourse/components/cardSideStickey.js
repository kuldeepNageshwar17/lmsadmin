import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

export default function cardSideStickey ({data }) {
  return (
    <div
      style={{
        position: '-webkit-sticky',
        position: 'sticky',
        top: 120
      }}
    >
      <Card>
        <Card.Header as='h5'>Course</Card.Header>
        <Card.Body>
          <Row>
            <Col>Test:&nbsp;{data[0].noOftests}</Col>
          </Row>
          <Row>
            <Col>Sections: &nbsp;{data.length}</Col>
          </Row>
          <Row>
            <Col>Price : 200</Col>
          </Row>
          <Row>
            <Col><button className="btn btn-danger">Update Course</button></Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
