import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, Row } from 'react-bootstrap'
import CourseBlocks from '../components/courseblocks'

import { useHistory } from 'react-router-dom'

export default function Courses (props) {
  const { id } = useParams()
  const history = useHistory()

  const CourseContenHandler = id => {
    debugger
    history.push('/ecourse/courseOverview')
  }

  // const [Courses, setCourse] = useState([])
  const [Class, setClass] = useState([])
  const updateData = () => {
    debugger
    axios
      .get('/api/course/getAllCoursesOfAllClasses')
      .then(res => {
        debugger
        console.log("data 1" , res.data)
        setClass(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    updateData()
  }, [id])
  return (
    <div>
      {Class && (
        <div className='row'>
          <div className='col-md-12'>
            <Row>
              <Card className='col-md-12'>
                <Card.Header as='h5'>
                  Course
                 
                    <button
                      type='button'
                      className='btn btn-primary pull-left'
                      style={{float:"right"}}
                      onClick={() => {
                        history.push('/setting/CourseForm/')
                      }}
                    >
                      New course
                    </button>
                 
                </Card.Header>
                <Card.Body>
                  <Row>
                    {Class &&
                      Class.length != 0 &&
                      Class.map(item => (

                        <CourseBlocks item={item} key={item.courses._id} />
                      ))}
                    {Class && Class.length == 0 && (
                      <p>NO COURSE IS AVAILABLE FOR YOU</p>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </div>
        </div>
      )}
    </div>
  )
}
