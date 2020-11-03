import React, { useState, useRef, useEffect } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import JoditEditor from 'jodit-react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

export default function CourseForm () {
  const config = {
    defaultActionOnPaste: 'insert_as_html',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  const editor = useRef(null)
  const [Course, setCourse] = useState({
    rating: 0,
    numberOfRatings: 0,
    numberOfStudent: 0,
    title: '',
    Description: '',
    overview: '',
    posterImageUrl: '',
    file: ''
  })
  const [ClassList , setClassList] = useState()
  const [ClassId , setClassId] = useState()
  const { id } = useParams()
  const { cid } = useParams()
  const history = useHistory()
  const onChangeOverView = e => {
    debugger
    // console.log(this.editor.current)
    setCourse({
      ...Course,
      overview: e.target.innerHTML
    })
  }
  // const uploadFile = async () => {}
  const SaveCourse = async event => {
    event.preventDefault()
    debugger
    var ImageUrl = ''
    let courseObject =Course;
    if (Course.file) {
      let formData = new FormData()
      formData.append('file', Course.file)
      debugger
      await axios
        .post('api/course/uploadCourseProfile/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          debugger
          ImageUrl = res.data.name
          // setCourse({ ...Course, posterImageUrl: res.data.name })
        })
        .catch(() => {
          console.log('error in file upload')
        })
    }

    if (ImageUrl) {
      courseObject.posterImageUrl=ImageUrl
    }
    // console.log(ImageUrl)
    debugger
    await axios
      .post('/api/course/course/' + ClassId, courseObject)
      .then(result => {
        debugger
        if(id == undefined){

          history.push('/ecourse/Courses')
        }
        else{
          history.push('/setting/courses/' + id)
        }
        
      })
      .catch(err => {
        console.log(err)
      })
    debugger
  }
  useEffect(() => {
    debugger
    setClassId(id)
    axios.get('/api/course/getAllClassNameForCourseAdd')
          .then(res => {
            setClassList(res.data[0].classes)
          }).catch(err => {
            console.log(err)
          })

    if (cid) {
      axios
        .get('/api/course/course/' + cid)
        .then(res => {
          setCourse(res.data.course)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [cid])
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <Form onSubmit={SaveCourse} className='form'>
              <Card.Body>
                <Form.Group className='row'>
                  
               {id == undefined && <div className='col-md-4'>
                    <Form.Label>Select Class </Form.Label>
                    <Form.Control
                      required='true'
                      as='select'
                      placeholder=''
                      // disabled={Exam._id?"true":"false"}
                      // value={Exam.class}
                      onChange={event =>
                        setClassId(event.target.value)
                      }
                    >
                      <option>select class</option>
                      {ClassList && ClassList.length && ClassList.map(item => (
                        <option value={item._id} key={item._id}>
                          {item.name}
                        </option>
                      ))
                      }
                    </Form.Control>
                  </div>
                }
                  <div className='col-md-6' controlId='formTitle'>
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Course Title'
                      value={Course.title}
                      required
                      onChange={event =>
                        setCourse({ ...Course, title: event.target.value })
                      }
                    />
                    <Form.Text className='text-muted'>
                      new course title.
                    </Form.Text>
                  </div>
                  <div controlId='formDesc' className='col-md-6'>
                    <Form.Label>Course Description</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Course Description'
                      value={Course.Description}
                      onChange={event =>
                        setCourse({
                          ...Course,
                          Description: event.target.value
                        })
                      }
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId='formOverview' className='row'>
                  <Form.Label className='col-md-12 text-left mb-5'>
                    Course Overview
                  </Form.Label>
                  {/* <Form.Control type='text' placeholder='Course Overview' /> */}
                  <div className='col-md-12 mb-5'>
                    <JoditEditor
                      ref={editor}
                      value={Course.overview}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={onChangeOverView} // preferred to use only this option to update the content for performance reasons
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId='Image'>
                  <Form.Label>Course Description</Form.Label>
                  <Form.Control
                    type='file'
                    //   value={Course.Description}
                    onChange={event =>
                      setCourse({ ...Course, file: event.target.files[0] })
                    }
                  />
                </Form.Group>
                {Course.posterImageUrl && (
                  <img                     src={
                      'http://localhost:4000/uploads/CourseProfile/' +
                      Course.posterImageUrl
                    }
                    width='200px'
                  />
                )}
              </Card.Body>
              <Card.Footer>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Card.Footer>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}
