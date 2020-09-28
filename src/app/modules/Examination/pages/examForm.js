import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function BatchForm () {
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
      .get('/api/Exams/getClassesDdr')
      .then(res => {
        setClasses(res.data.classes)
      })
      .catch(err => {
        console.log(err)
      })
   
    // debugger;
    // if(id)
    // {
    //   axios
    //   .get('/api/setting/getBatch/' + id)
    //   .then(res => {
    //     debugger;
    //     if(res.data.length)
    //     setExam(res.data[0])
    //   })
    //   .catch(err => {
    //     console.log(err)

    //   })
    // }
  }, [id])

  const saveBatch = event => {
    event.preventDefault()
    debugger
    axios
      .post('/api/setting/createBatch', Exam)
      .then(res => {
        history.push('/setting/Exam')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <Card>
            <Card.Body>
              <Form onSubmit={saveBatch}>
                <Form.Group controlId='formTitle'>
                  <Form.Label>Exam Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Exam Name'
                    value={Exam.name}
                    onChange={event =>
                      setExam({ ...Exam, name: event.target.value })
                    }
                  />
                  <Form.Text className='text-muted'>Exam Name</Form.Text>
                </Form.Group>

                <Form.Group controlId='formClass'>
                  <Form.Label>Select Class </Form.Label>
                  <Form.Control
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
                  <Form.Text className='text-muted'>Class</Form.Text>
                </Form.Group>             
                <Form.Group controlId='formTitle'>
                  <Form.Label>Exam description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Exam description'
                    value={Exam.description}
                    onChange={event =>
                      setExam({ ...Exam, description: event.target.value })
                    }
                  />
                  <Form.Text className='text-muted'>Exam description</Form.Text>
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
