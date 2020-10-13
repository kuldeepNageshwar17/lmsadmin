import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function ExamForm () {
  const [Test, setTest] = useState({
    name: '',
    description: '',
    class: '',
    totalMarks: '',
    timeInHours: '',
    timeInMinutes: '',
    passingMarks: ''
  })
  const [Class, setClasses] = useState([])
  // const [Years, setYears] = useState([])

  let { id } = useParams()
  let history = useHistory()
  useEffect(() => {
    debugger
    // axios
    //   .get('/api/Examination/getAllClasssesDdr')
    //   .then(res => {
    //     setClasses(res.data.classes)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    // debugger
    // if (id) {
    //   axios
    //     .get('/api/Examination/getExam/' + id)
    //     .then(res => {
    //       debugger
    //       if (res.data) setTest(res.data)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  }, [id])

  const saveTest = event => {
    event.preventDefault()
    debugger
    // axios
    //   .post('/api/Test/:id/saveExamDetails', Test)
    //   .then(res => {
    //     history.push('/Exams')
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <Card.Body>
              <Form onSubmit={saveTest} className='form'>
                <Form.Group controlId='formTitle' className='row'>
                  <div className='col-md-4'>
                    <Form.Label>Test Name</Form.Label>
                    <Form.Control
                      required='true'
                      type='text'
                      placeholder='Test Name'
                      value={Test.name}
                      onChange={event =>
                        setTest({ ...Test, name: event.target.value })
                      }
                    />
                  </div>
                  <div className='col-md-4'>
                    <Form.Label>Total Marks</Form.Label>
                    <Form.Control
                      required='true'
                      type='number'
                      placeholder='Total Marks'
                      value={Test.totalMarks}
                      onChange={event =>
                        setTest({ ...Test, totalMarks: event.target.value })
                      }
                    />set
                  </div>
                  <div className='col-md-4'>
                    <Form.Label>passing  marks</Form.Label>
                    <Form.Control
                      required='true'
                      type='number'
                      placeholder='passing Marks'
                      onChange={event =>
                        setTest({ ...Test, passingMarks: event.target.value })
                      }
                    />
                  </div>
                 

                  <div className='col-md-4'>
                    <Form.Label>Time in Hours</Form.Label>
                    <Form.Control
                      required='true'
                      type='text'
                      placeholder='time in  hours'
                      value={Test.timeInHours}
                      onChange={event =>
                        setTest({ ...Test, timeInHours: event.target.value})
                      }
                    />
                  </div>
                  <div className='col-md-4'>
                    <Form.Label>Time in Minutes</Form.Label>
                    <Form.Control
                      required='true'
                      type='text'
                      placeholder='time in  minutes'
                      value={Test.timeInMinutes}
                      onChange={event =>
                        setTest({ ...Test, timeInMinutes: event.target.value})
                      }
                    />
                  </div>

                  <div className='col-md-12'>
                    <Form.Label>Test description</Form.Label>
                    <Form.Control
                      required='true'
                      type='text'
                      placeholder='Test description'
                      value={Test.description}
                      onChange={event =>
                        setTest({ ...Test, description: event.target.value})
                      }
                    />
                  </div>
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
