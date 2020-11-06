import React from 'react'
import { Row, Col,Card } from 'react-bootstrap'

export default function Overview ({overview}) {
  return (
    <Card classNameName='col-md-12'>
    <Card.Header as='h5'>Overview</Card.Header>
    <Card.Body>
      <Row>
        <Col>
          <div style={{ width: '80%' }}>
            {overview && overview}
          </div>
          
        </Col>
      </Row>
    </Card.Body>
  </Card>
  )
}
