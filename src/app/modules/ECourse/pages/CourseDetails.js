import React, { useEffect, useState  } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Row, Col, Badge, Tabs, Tab } from 'react-bootstrap'
import axios from 'axios'
// import CourseBlock from '../Components/CourseBlock'
import Announcement from '../components/Announcement'
import Curriculam from '../components/Curriculam'
import Faqs from '../components/FAQs'
import Overview from '../components/Overview'
import Reviews from '../components/Reviews'
import CardSideStickey from '../components/cardSideStickey'

export default function CoursesDetails () {

  const [course, setCourses] = useState(null)
  const {courseId} = useParams()
  useEffect(() => {}, [])
  return (
    <div>
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
                        <h3>Learn JavaScript From Scratch</h3>
                        <p>
                          Master JavaScript with the most complete course!
                          Projects Excellent course. we explain the core
                          concepts in javascript that are usually glossed over
                          in other courses
                        </p>
                        <div>
                          <Badge variant='secondary'>3.5</Badge>
                          <span classNameName='fa fa-star checked'></span>
                          <span classNameName='fa fa-star checked'></span>
                          <span classNameName='fa fa-star checked'></span>
                          <span classNameName='fa fa-star'></span>
                          <span classNameName='fa fa-star'></span>
                          <span classNameName='fa fa-child ml-15 mr-2'>
                            {' '}
                          </span>{' '}
                          1200 Enrolled
                        </div>
                        <p>
                          Created by <b>kuldeep Nageshwar</b> Last updated
                          10/2019
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
                    <Overview />
                  </Tab>
                  <Tab eventKey='curriculam' title='Curriculam'>
                    <Curriculam />
                  </Tab>
                  <Tab eventKey='Faq' title='Faq'>
                    <Faqs />
                  </Tab>
                  <Tab eventKey='reviews' title='Reviews'>
                    <Reviews />
                  </Tab>
                  <Tab eventKey='Announcement' title='Announcement'>
                    <Announcement />
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>


        <CardSideStickey />

        
        </Col>
      </Row>
    </div>
  )
}
