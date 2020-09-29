import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function ExamForm () {
  const [Exam, setExam] = useState({   
    name: '',
    description: '',
    class:"",
  })
  const [Classes, setClasses] = useState([])
  // const [Years, setYears] = useState([])

  let { id } = useParams()
  let history = useHistory()
  useEffect(() => {
    debugger
    axios
      .get('/api/Examination/getAllClasssesDdr')
      .then(res => {
        setClasses(res.data.classes)
      })
      .catch(err => {
        console.log(err)
      })
   
    debugger;
    if(id)
    {
      axios
      .get('/api/Examination/getExam/' + id)
      .then(res => {
        debugger;
        if(res.data)
        setExam(res.data)
      })
      .catch(err => {
        console.log(err)

      })
    }
  }, [id])

  const saveExam = event => {
    event.preventDefault()
    debugger
    axios
      .post('/api/Examination/saveExamDetails', Exam)
      .then(res => {
        history.push('/Exams')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <Card.Body>
              <Form onSubmit={saveExam} className='form'>
                <Form.Group controlId='formTitle' className='row'>
                <div className='col-md-4'>
                  <Form.Label>Exam Name</Form.Label>
                  <Form.Control
                  required="true"
                    type='text'
                    placeholder='Exam Name'
                    value={Exam.name}
                    onChange={event =>
                      setExam({ ...Exam, name: event.target.value })
                    }
                  />
                  </div>
                  <div className='col-md-4'>
                  <Form.Label>Select Class </Form.Label>
                  <Form.Control
                   required="true"
                    as='select'
                    placeholder=''
                    // disabled={Exam._id?"true":"false"}
                    value={Exam.class}
                    onChange={event =>
                      setExam({ ...Exam, class: event.target.value })
                    }
                  >
                    <option>select class</option>
                    {Classes.map(item => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                  </div>
                  <div className='col-md-4'>
                 
                  <Form.Label>Exam description</Form.Label>
                  <Form.Control
                                    required="true"

                    type='text'
                    placeholder='Exam description'
                    value={Exam.description}
                    onChange={event =>
                      setExam({ ...Exam, description: event.target.value })
                    }
                  /></div>
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
