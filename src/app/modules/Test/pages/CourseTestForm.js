import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card , Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import JoditEditor from 'jodit-react'

export default function TestForm () {
  const [Test, setTest] = useState({
    name: '',
    description: '',
    class: '',
    testLevel : '',
    totalMarks: '',
    timeInHours: '',
    timeInMinutes: '',
    passingMarks: ''
  })
  const [CourseId , setCourseId] = useState()
  const [CourseList , setCourseList] = useState()
  const [Class, setClasses] = useState([])
  // const [Years, setYears] = useState([])
  const editor = React.useRef(null)
  const config = {
   defaultActionOnPaste: 'insert_as_html',
   askBeforePasteFromWord: false,
   askBeforePasteHTML: false,
   readonly: false // all options from https://xdsoft.net/jodit/doc/
}
const handleDescripiton = e => {
  debugger;
  console.log(e.target.innerHTML)
  setTest({
    ...Test,
    description : e.target.innerHTML
  })
}
  let { id ,  TId } = useParams()
  let history = useHistory()
  useEffect(() => {
    setCourseId(id)
    if(id == undefined){
      axios.get('/api/course/getAllClassCoursesNameForTestadd').then(res => {
        setCourseList(res.data)
      })
    }
    debugger
    if (id) {
      axios.get(`/api/Test/getTestById/${TId}`)
    .then(res => {
    debugger;
    setTest(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    }
  }, [TId, id])

  const saveTest = event => {
    event.preventDefault()
    axios
      .post(`/api/Course/${CourseId}/saveTestDetails`, Test)
      .then(res => {
        if(id == undefined){
          history.push(`/Test/testlist`)

        }
        else{
        history.push(`/Test/CourseTest/${id}/tests`)

        }
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
              <Form onSubmit={saveTest} className='form'>

                <Form.Group controlId='formTitle' className='row'>

                {id == undefined && <div className='col-md-4'>
                    <Form.Label>Select Class </Form.Label>
                    <Form.Control
                      required='true'
                      as='select'
                      placeholder=''
                      // disabled={Exam._id?"true":"false"}
                      // value={Exam.class}
                      onChange={event =>
                        setCourseId(event.target.value)
                      }
                    >
                      <option value="" >select class</option>
                      {CourseList && CourseList.length && CourseList.map(item => (
                        <option value={item.courses._id} key={item.courses._id}>
                          {item.courses.title}
                        </option>
                      ))
                      }
                    </Form.Control>
                  </div>
                }

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
                    />
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
                      type='number'
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
                      type='number'
                      placeholder='time in  minutes'
                      value={Test.timeInMinutes}
                      onChange={event =>
                        setTest({ ...Test, timeInMinutes: event.target.value})
                      }
                    />
                  </div>
                  <div className='col-md-4'>
                    <Form.Label>Test Level</Form.Label>
                      
                      <Form.Control as="select" defaultValue="Choose..." required={true} onChange={(event) =>
                        setTest({ ...Test, testLevel: event.target.value})}>
                          <option value="">Test Level</option>
                        <option>Easy</option>
                        <option>Intermediate</option>
                        <option>Hard</option>
                      </Form.Control>
                  </div>
                  
                  <div className='col-md-12'>
                    <Form.Label>Test description</Form.Label>
                    < JoditEditor
                        ref={editor}
                        value={Test.description}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={event =>
                          setTest({ ...Test, description : event.target.innerHTML})
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
