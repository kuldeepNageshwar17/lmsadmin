import React from 'react'
import { Row, Col,Card } from 'react-bootstrap'

export default function Reviews(){
    return (
        <Card classNameName='col-md-12'>
        <Card.Header as='h5'>Course</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <div style={{ width: '80%' }}>
                <h3>Learn JavaScript From Scratch</h3>
                <p>
                  Master JavaScript with the most complete course! Projects
                  Excellent course. we explain the core concepts in javascript
                  that are usually glossed over in other courses
                </p>
               
                <p>
                  Created by <b>kuldeep Nageshwar</b> Last updated 10/2019
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}
