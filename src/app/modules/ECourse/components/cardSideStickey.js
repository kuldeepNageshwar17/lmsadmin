import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

export default function cardSideStickey () {
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
            <Col>Test:20</Col>
          </Row>
          <Row>
            <Col>Sections: 5</Col>
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
