import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
// import { useParams } from "react-router-dom";

import { connect } from 'react-redux'
import { Modal, Card, Select } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Input } from '../../../../_metronic/_partials/controls'
import { actions } from './../_redux/EcourseRedux'

const ContentEdit = Yup.object().shape({
  _id: Yup.string().nullable(true),
  courseId: Yup.string().required('Course ID is required'),
  sectionId: Yup.string().required('section is required'),
  title: Yup.string().required('title is required'),
  type: Yup.string().required('type is required'),
  // file: Yup.mixed().required('file is required')
  // contentUrl: Yup.string().required('Name is required')
})

function ContentEditDilogue ({ CourseID, dispatch, Content, Section }) {
  const [content, setContent] = useState(
    Content != null
      ? { ...Content, courseId: CourseID, sectionId: Section._id }
      : {
          _id: null,
          courseId: CourseID,
          sectionId: Section._id,
          title: '',
          type: '',
          contentUrl: '',
          file: null
        }
  )
  const [ContenTypeDDr, setContenTypeDDr] = useState([])
  let history = useHistory()
  const onHide = () => {
    // console.log(CourseID)
    // var CourseID
   

    history.push('/Ecourse/CourseContent/?id=' + CourseID)
  }
  useEffect(() => {
    axios('/api/Course/getContentType')
      .then(response => {
        debugger
        return response.data
      })
      .then(data => {
        // let typesFromApi = data.map(team => {
        //   return {value: team, display: team}
        // });
        let ddr = [{ value: '', text: 'select your ContentType' }].concat(data)
        console.log(ddr)
        setContenTypeDDr(ddr)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  return (
    <Card>
      <Card.Header>Section Content</Card.Header>

      <Formik
        // enableReinitialize={true}
        initialValues={content}
        validationSchema={ContentEdit}
        onSubmit={values => {
          debugger
          console.log(values)
          let sec = {
            _id: values._id,
            courseId: content.courseId,
            title: values.title,
            sectionId: content.sectionId,
            type: values.type,
            contentUrl: values.contentUrl
          }
         
         if(sec._id&&!values.file){
          axios
          .post('/api/course/courseSectionContent', sec)
          .then(response => {
            onHide()
          })
          .catch(err => {
            console.log(err)
          })

         }
         else{
          var formData = new FormData()
          formData.append('file', values.file[0])
          formData.append('courseId',content.courseId)
          axios
            .post('/api/course/courseSectionContentFile',formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => {
              debugger
              sec.contentUrl = response.data.name
              if (sec.contentUrl) {
                axios
                  .post('/api/course/courseSectionContent', sec)
                  .then(response => {
                    onHide()
                  })
                  .catch(err => {
                    console.log(err)
                  })
              } else {
                alert('error in file upload')
              }
            })
            .catch(err => {
              console.log(err)
            })

         }
          
        }}
      >
        {formik => {
          console.log(formik)

          return (
            <>
              <Form
                className='form form-label-right'
                onSubmit={formik.handleSubmit}
              >
                <Card.Body>
                  <div className='row'>
                    <div className='col-lg-6'>
                      <div className='form-group'>
                        <label for='title'>Title</label>
                        <Field
                          name='title'
                          placeholder='title'
                          label='section title'
                          className='form-control'
                        />
                        <ErrorMessage name='title' />
                      </div>
                    </div>
                    <div className='col-lg-3'>
                      <div className='form-group'>
                        <label for='type'>Type</label>

                        <Field
                          as='select'
                          name='type'
                          label='Content Type'
                          className='form-control'
                        >
                          {ContenTypeDDr.map(item => (
                            <option value={item.value} key={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name='type' />
                      </div>
                    </div>
                    <div className='col-lg-3'>
                      <div className='form-group'>
                        <label for='file'>File</label>
                        <input
                          id='file' 
                          name='file'
                          type='file'
                          onChange={event => {
                            formik.setFieldValue(
                              'file',
                              event.currentTarget.files
                            )
                          }}
                        />
                        <ErrorMessage name='file' />
                      </div>
                    </div>

                    <div className='col-lg-12'></div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <button
                    type='button'
                    onClick={onHide}
                    className='btn btn-light btn-elevate mr-2'
                  >
                    Cancel
                  </button>
                  <></>
                  <button type='submit' className='btn btn-primary btn-elevate' disabled={formik.isSubmitting || !formik.dirty}>
                    Save
                  </button>
                </Card.Footer>
              </Form>
            </>
          )
        }}
      </Formik>
    </Card>
  )
}
function mapStateToProps (state) {
  debugger
  console.log(state.course.CurrentCourseId)
  return {
    CourseID: state.course.CurrentCourseId,
    Section: state.course.CurrentSection,
    Content: state.course.CurrentContent
  }
}
export default connect(mapStateToProps)(ContentEditDilogue)
