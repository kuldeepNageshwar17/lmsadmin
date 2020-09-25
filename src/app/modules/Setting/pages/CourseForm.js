import React, { useState, useRef } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import JoditEditor from 'jodit-react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

export default function CourseForm () {
  const config = {
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
  const { id } = useParams()
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

    var ImageUrl="";
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
          ImageUrl=res.data.name
          // setCourse({ ...Course, posterImageUrl: res.data.name })
        })
        .catch(() => {
          console.log('error in file upload')
        })
    }

    console.log(ImageUrl)
    await axios
      .post('/api/course/course/' + id, {...Course,posterImageUrl:ImageUrl})
      .then(result => {
        debugger
        history.push('/setting/courses/' + id)
      })
      .catch(err => {
        console.log(err)
      })
    debugger
  }
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
