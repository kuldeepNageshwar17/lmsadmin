import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function CourseBlocks ({ item }) {
  const history = useHistory()
  return (
    <>
      <Col md={4} sm={12}>
        <Card>
          {console.log(item)}
          <Card.Body>
            <Card.Title>
              Class Name :{item.classes.name}{' '}
              <span
                style={{ float: 'right' }}
                className='badge badge-secondary'
              >
                {}
              </span>
            </Card.Title>
            <Card.Text></Card.Text>
            <Card.Text>Course Name : {item.courses.title}</Card.Text>
            <Card.Text>
              Description :{' '}
              <div
                dangerouslySetInnerHTML={{ __html: item.courses.Description }}
              ></div>
            </Card.Text>
            <div>
              <Card.Text>Ratings : {item.courses.numberOfRatings}</Card.Text>
              <Card.Text>
                Student Enrolled : {item.courses.numberOfStudent}
              </Card.Text>
              <Card.Text>

                {/* Overview : <div  dangerouslySetInnerHTML={{    __html: item.courses.overview }}></div> */}
              </Card.Text>
              <Card.Text>Sections : {item.count}</Card.Text>
            </div>
            <img src={`${window.$apihost }/uploads/CourseProfile/`+item.courses.posterImageUrl} alt ={item.courses.title} width={"100%"} className="p-5"></img>

            <Button
              variant='primary'
              className="mr-10"
              onClick={() => {
                history.push(`/ecourse/courseOverview/${item.courses._id}`)
              }}
            >
              Details
            </Button>
            <Button
              variant='primary'
              className="mr-10"

              onClick={() => {
                history.push(`/setting/course/${item.courses._id}/sections`)
              }}
            >
              Content
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                history.push(`/Test/CourseTest/${item.courses._id}/tests`)
              }}
            >
              Tests
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
