import React, { useState, useRef, useEffect } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import JoditEditor from 'jodit-react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

export default function UserCourseForm () {
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
    file: '',
    price : 0,
    error : "",
    courseLanguage : ""
  })
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
        .post('api/course/UseruploadCourseProfile/', formData, {
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
    console.log(":in here" , courseObject.price.toString().substring(0,1) == 0)
    if(courseObject.price.toString().length > 1){
      if(courseObject.price.toString().substring(0,1) == 0){
        setCourse({
          ...Course,
          error: "Please Give Correct Price"
        })
        return ;
      }
    }
    
    await axios
      .post('/api/course/UsersaveCourse/', courseObject)
      .then(result => {
        debugger
        history.goBack()
        history.push('/setting/UserCourses')

      })
      .catch(err => {
        console.log(err)
      })
    debugger
  }
  useEffect(() => {
    debugger
    if (cid) {
      axios
        .get('/api/course/UsercourseList/' + cid)
        .then(res => {
          setCourse(res.data)
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
                <Form.Group className='row'>
                <div controlId='formDesc' className='col-md-6'>
                    <Form.Label>Course Price</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Course Price'
                      value={Course.price}
                      onChange={event =>
                        setCourse({
                          ...Course,
                          price: event.target.value
                        })
                      }
                    />
                   {Course.error && Course.error.length > 0 &&  <Form.Text className='text-muted'>
                   {Course.error}
                    </Form.Text> }
                  </div>
                   <div className='col-md-4'>
                    <Form.Label>Select Language </Form.Label>
                    <Form.Control
                      required='true'
                      as='select'
                      placeholder=''
                      // disabled={Exam._id?"true":"false"}
                      value={Course.courseLanguage}
                      onChange={event =>
                        setCourse({
                          ...Course,
                          courseLanguage: event.target.value
                        })
                      }
                    >
                      <option value="">select class</option>
                      
                        <option value={"English"} key={"English"}>
                          English
                        </option>
                        <option value={"Hindi"} key={"Hindi"}>
                          Hindi
                        </option>
                    
                      
                    </Form.Control>
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
                  <Form.Label>Course Picture</Form.Label>
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
