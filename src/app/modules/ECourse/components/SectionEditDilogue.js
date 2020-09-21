import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
// import { useParams } from "react-router-dom";

import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Input } from '../../../../_metronic/_partials/controls'
import { actions } from './../_redux/EcourseRedux'

const SectionEditSchema = Yup.object().shape({
  _id: Yup.string().nullable(true),
  name: Yup.string().required('Firstname is required'),
  timeInHours: Yup.number().required('Time  is required'),
  timeInMinutes: Yup.number().required('Time is required'),
  order: Yup.number(),
  courseId: Yup.mixed()
    .nullable(false)
    .required('Course is required')
})

function SectionEditDilogue ({
  show,
  actionsLoading,
  CourseID,
  dispatch,
  Section
})


{
  const [section, setsection] = useState(Section != null ?{ ...Section, courseId: CourseID }:{
    _id: null,
    courseId: CourseID,
    name: '',
    timeInHours: null,
    timeInMinutes:null ,
    order: null
  })
  
  let history = useHistory()
  const onHide = () => {
    console.log(CourseID)
    dispatch(actions.SetCurrentSection(null))
    history.push('/Ecourse/CourseContent/?id=' + CourseID)
  }
  return (
    <div>
      <Modal
        size='md'
        show={show}
        onHide={onHide}
        aria-labelledby='example-modal-sizes-title-md'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-md'>
  {section._id!=null?"Edit":"New"} section
          </Modal.Title>
        </Modal.Header>
        <>
          <Formik
            // enableReinitialize={true}
            initialValues={section}
            validationSchema={SectionEditSchema}
            onSubmit={values => {
              debugger
              console.log(values)
              let sec = {
                _id: values._id,
                courseId: values.courseId,
                name: values.name,
                timeInHours: values.timeInHours,
                timeInMinutes: values.timeInMinutes,
                order:values.order
              }
              axios
                .post('/api/course/courseSection', sec)
                .then(response => {
                  onHide()
                })
                .catch(err => {
                  console.log(err)
                })
            }}
          >
            {({ handleSubmit }) => (
              <>
                <Modal.Body className='overlay overlay-block cursor-default'>
                  {actionsLoading && (
                    <div className='overlay-layer bg-transparent'>
                      <div className='spinner spinner-lg spinner-success' />
                    </div>
                  )}
                  <Form className='form form-label-right'>
                    <div className='form-group row'>
                      <div className='col-lg-12'>
                        <Field                        
                          name='name'
                          component={Input}
                          placeholder='title'
                          label='Section Title'
                        />
                      </div>
                      <div className='col-lg-12'>
                        <Field
                          name='timeInHours'
                          component={Input}
                          placeholder='timeInHours'
                          label='timeInHours'
                          type="number"
                        />
                      </div>
                      <div className='col-lg-12'>
                        <Field
                          name='timeInMinutes'
                          component={Input}
                          placeholder='timeInMinutes'
                          label='timeInMinutes'
                          type="number"
                        />
                      </div>

                      <div className='col-lg-12'>
                        <Field
                          name='order'
                          component={Input}
                          placeholder='order'
                          label='order'
                          type="number"
                        />
                      </div>
                    </div>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type='button'
                    onClick={onHide}
                    className='btn btn-light btn-elevate mr-2'
                  >
                    Cancel
                  </button>
                  <></>
                  <button
                    type='submit'
                    onClick={() => handleSubmit()}
                    className='btn btn-primary btn-elevate'
                  >
                    Save
                  </button>
                </Modal.Footer>
              </>
            )}
          </Formik>
        </>
      </Modal>
    </div>
  )
}

function mapStateToProps (state) {
  debugger
  console.log(state.course.CurrentCourseId)
  return {
    CourseID: state.course.CurrentCourseId,
    Section: state.course.CurrentSection
  }
}
export default connect(mapStateToProps)(SectionEditDilogue)
