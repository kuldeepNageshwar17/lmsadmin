import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import JoditEditor from 'jodit-react'

export default function SectionalTestForm () {
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

  let { id ,  tid ,sid } = useParams()
  let history = useHistory()
  useEffect(() => {
    
    debugger
    if (tid) {
      axios.get(`/api/Test/getTestById/${tid}`)
    .then(res => {
    debugger;
    console.log("res" , res)
    setTest(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    }
  }, [tid, id])

  const saveTest = event => {
    event.preventDefault()
    axios
      .post(`/api/Test/${sid}/saveTestDetails`, Test)
      .then(res => {
        history.push(`/Test/${id}/section/${sid}/tests`)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const editor = React.useRef(null)
  const config = {
    defaultActionOnPaste: 'insert_as_html',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  const handleDescripiton = e => {
    debugger;
    setTest({
      ...Test , 
      description : e.target.innerHTML
    })
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
                      value={Test.passingMarks}
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
                    < JoditEditor
                    ref={editor}
                    value={Test.description}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={handleDescripiton} // preferred to use only this option to update the content for performance reasons
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
