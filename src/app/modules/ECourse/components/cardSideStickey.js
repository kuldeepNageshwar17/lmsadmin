import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
export default function cardSideStickey ({ data ,EditHandler }) {
  
  return (
    <div
      style={{
        position: '-webkit-sticky',
        position: 'sticky',
        top: 120
      }}
    >
      <Card>
      <Card.Header as='h5'>{data[0].title}</Card.Header>
        <Card.Body>
          <Row><img src={`${window.$apihost }/uploads/CourseProfile/`+data[0].posterImageUrl} alt ={data[0].title} width={"100%"} className="p-5"></img></Row>
          <Row>
            <Col>Test:&nbsp;{data[0].noOftests}</Col>
          </Row>
          <Row>
            <Col>Sections: &nbsp;{data.length}</Col>
          </Row>
          <Row>
            <Col><button className="btn btn-danger" onClick={ EditHandler}>Update Course</button></Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
