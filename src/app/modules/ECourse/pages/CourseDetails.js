import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Badge, Tabs, Tab } from 'react-bootstrap'
import axios from 'axios'
// import CourseBlock from '../Components/CourseBlock'
import Announcement from '../components/Announcement'
import Curriculam from '../components/Curriculam'
import Faqs from '../components/FAQs'
import Overview from '../components/Overview'
import Reviews from '../components/Reviews'
import CardSideStickey from '../components/cardSideStickey'
import {
  useParams,
  useHistory
} from 'react-router'
export default function CoursesDetails () {
  const [coursedetails, setCoursesdetails] = useState(null)
  const [averageRating , setAverageRating] = useState()
  const [noOfStudent , setnoOfStudent] = useState()

  const {courseId} = useParams()
  const history = useHistory()
  const EditHandler = () => {
    history.push('/setting/CourseForm/' + coursedetails[0].class + '/' + courseId)
  }
  useEffect(() => {
    debugger
    axios.get('/api/course/courseDetailByCourseId/' + courseId).then((res)=>{
      console.log(res.data)
      setCoursesdetails(res.data)
    }).catch((res)=>{

    })
    axios.get('/api/course/getAverageRatings/' + courseId).then((res)=>{
      setAverageRating(res.data[0])
    }).catch((res)=>{

    })
    axios.get('/api/course/noOfStudentInCourse/' + courseId).then((res)=>{
      setnoOfStudent(res.data)
    }).catch((res)=>{

    })
    
  }, [])
  return (
    <div>
      {coursedetails && coursedetails.length && (
      <Row>
        <Col md={9}>
          <Row>
            <Col>
              <Card classNameName='col-md-12'>
                <Card.Header as='h5'>Course</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <div style={{ width: '80%' }}>
                        <h3>{coursedetails &&  coursedetails[0].title}</h3>
                        <p>{coursedetails &&  coursedetails[0].Description}
                        </p>
                        <div>
                          <Badge variant='secondary'>{averageRating && averageRating.averageRating.toFixed(2)}</Badge>
                          <span classNameName='fa fa-star checked'></span>
                          <span classNameName='fa fa-star checked'></span>
                          <span classNameName='fa fa-star checked'></span>
                          <span classNameName='fa fa-star'></span>
                          <span classNameName='fa fa-star'></span>
                          <span classNameName='fa fa-child ml-15 mr-2'>
                            {' '}
                          </span>{' '}
                          {noOfStudent && noOfStudent.noOfStudent} Student Enrolled
                        </div>
                        <p>
                        Created by <b>{coursedetails.length && coursedetails[0].createdBy[0].name}</b> Last updated &nbsp;
                          {coursedetails && coursedetails[0].modifiedDate.slice(0, 10)}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <Tabs defaultActiveKey='overview' id='uncontrolled-tab-example'>
                  <Tab eventKey='overview' title='Overview'>
                    <Overview overview={coursedetails[0].overview}/>
                  </Tab>
                  <Tab eventKey='curriculam' title='Curriculam'>
                    <Curriculam data={coursedetails}/>
                  </Tab>
                  <Tab eventKey='Faq' title='Faq'>
                    <Faqs />
                  </Tab>
                  <Tab eventKey='reviews' title='Reviews'>
                    <Reviews id={courseId} />
                  </Tab>
                  <Tab eventKey='Announcement' title='Announcement'>
                    <Announcement  id={coursedetails[0].createdBy[0]._id}/>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>


        <CardSideStickey EditHandler={EditHandler} data={coursedetails}/>

        
        </Col>
      </Row>
      )}
    </div>
  )
}
