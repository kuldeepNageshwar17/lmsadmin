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
            <Col></Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
