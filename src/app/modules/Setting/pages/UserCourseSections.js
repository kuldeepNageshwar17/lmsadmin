import React, { useState, useEffect } from 'react'
import { Button, Form, Accordion, Card, Col, Nav, Row } from 'react-bootstrap'
import axios from 'axios'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { useParams, useHistory } from 'react-router-dom'

import AddContentButton from '../components/ContentAddButton'

export default function UserCourseSections () {
  //id of Course
  const { id } = useParams()
  const history = useHistory()
  const [sections, setSections] = useState([])
  const [expanded, setExpanded] = useState('panel1')
  const [course, setCourse] = useState(null)

  const handleChange = panel => () => {
    if (expanded != panel) setExpanded(panel)
  }
  const CreateSection = () => {
    history.push('/setting/Usercourse/' + id + '/sectionForm')
  }

  const EditSection = secId => {
    history.push('/Setting/Usercourse/' + id + '/sectionForm/' + secId)
  }
  const DeleteSection = id => {
    debugger
    if (window.confirm('Do you realy Want to delete Compelete Section ?')) {
      debugger
      axios
        .delete('/api/course/deleteUserCourseSection/' + id)
        .then(response => {
          loaddata()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  const loaddata = () => {
    axios
      .get('/api/course/getUserCourse/' + id)
      .then(res => {
        debugger
        console.log('res' , res.data)
        setCourse(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const editContent = (id, sectionId) => {
    history.push('/setting/course/section/' + sectionId + '/content/' + id)
  }
  const showContent = ( sectionId) => {
    console.log(id , sectionId)
    history.push(`/setting/course/${id}/showCourse`)
  }

  const deleteContent = id => {
    debugger
    if (window.confirm('Do you realy Want to delete Compelete Section ?')) {
      axios
        .delete('/api/Course/sectionContent/' + id)
        .then(res => {
          loaddata()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  useEffect(() => {
    loaddata()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <Card>
              <Card.Header as='h5'>
                {course && course.class ? course.class.name + '->' : ''}
                {course ? course.title : ''}
                <Button
                  variant='primary'
                  className='btn btn-outline-primary ml-2 float-right'
                  type='button'
                  onClick={() => {
                    if (history.length > 1) {
                      // this will take you back if there is history
                      history.goBack()
                    }
                  }}
                >
                  back
                </Button>
                <button
                  className='btn btn-primary float-right'
                  onClick={CreateSection}
                >
                  Add New Section
                </button>
              </Card.Header>
              <Card.Body>
                <Accordion>
                  {course &&
                    course.sections.sort((a, b) => a.order - b.order).map(item => (
                      
                      <Card key={item._id}>
                        <Card.Header>
                          <div className='row'>
                            <div className='col ANewSec'>
                              <Accordion.Toggle
                                as={Button}
                                variant='text'
                                eventKey={item._id}
                              >{console.log("item" , item)}
                                <h5>{item.name}</h5>
                              </Accordion.Toggle>
                            </div>
                            <Col md='auto'>
                              <div
                                className='btn-group'
                                role='group'
                                aria-label=''
                              >
                                {/* <AddContentButton
                                  sectionId={item._id}
                                  courseId={id}
                                /> */}
                                <button
                                className="btn btn-primary"
                                  onClick={() => {
                                    history.push(`/test/${id}/section/${item._id}/tests`)
                                  }}
                                >
                                  Tests
                                </button>
                                <button
                                 className="btn btn-primary"
                                  onClick={() => {
                                    history.push(`/setting/Usercourse/section/${item._id}/content/`)
                                  }}
                                >
                                  Add Content
                                </button>

                                <button
                                  className=' btn btn-primary pull-right'
                                  style={{ marginLeft: 'auto' }}
                                  onClick={e => {
                                    EditSection(item._id)
                                  }}
                                >
                                  <span className='svg-icon svg-icon-md'>
                                    <SVG
                                      title='Edit Content'
                                      src={toAbsoluteUrl(
                                        '/media/svg/icons/Communication/Write.svg'
                                      )}
                                    />
                                  </span>
                                </button>
                                <button
                                  className=' btn btn-danger pull-right'
                                  onClick={event => {
                                    DeleteSection(item._id)
                                  }}
                                >
                                  <span className='svg-icon svg-icon-md'>
                                    <SVG
                                      src={toAbsoluteUrl(
                                        '/media/svg/icons/General/Trash.svg'
                                      )}
                                      title='Delete Content'
                                    />
                                  </span>
                                </button>
                              </div>
                            </Col>
                          </div>
                        </Card.Header>
                        <Accordion.Collapse eventKey={item._id}>
                          <Card.Body>
                            {item.contents.map(c => {
                              return (
                                <div
                                  className='row mb-5 brd_b'
                                  key={c._id}
                                  // style={{ margin: '10px' }}
                                >
                                  <Col className='secTitle'>{c.title}</Col>

                                  <Col className='secType'>{`${c.videoUrl || c.videoDescription ? "Video" : ""}  ${c.pdfUrl || c.pdfDescription? "| Pdf" : ""} ${c.imageUrl || c.imageDescription? "| Image" : ""} ${c.audioUrl ? "| Audio" : ""} ${c.textDescription ? "Text" : ""} `}</Col>
                                  {/* <Col className='secUrl'>
                                    {c.contentUrl ? 'true' : 'false'}
                                  </Col> */}
                                  <Col xs md='2' className='secAction'>
                                    <div
                                      className='btn-group float-right'
                                      role='group'
                                      aria-label=''
                                    >
                                      <button
                                        className='btn btn-outline-primary pull-right'
                                        onClick={event => {
                                          showContent( item._id)
                                        }}
                                      >
                                        Show
                                      </button>
                                      <button
                                        className='btn btn-outline-primary pull-right'
                                        onClick={event => {
                                          editContent(c._id, item._id)
                                        }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className='btn btn-outline-danger pull-right'
                                        onClick={event => {
                                          deleteContent(c._id)
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </Col>
                                </div>
                              )
                            })}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                </Accordion>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
