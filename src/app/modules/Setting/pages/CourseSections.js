import React, { useState, useEffect } from 'react'
import { Button, Form, Accordion, Card, Col, Nav, Row } from 'react-bootstrap'
import axios from 'axios'

import { useParams, useHistory } from 'react-router-dom'


import AddContentButton from "../components/ContentAddButton"

export default function CourseSections () {
  //id of Course
  const { id } = useParams()
  console.log(id);
  const  history  = useHistory()
  const [sections, setSections] = useState([])
  const [expanded, setExpanded] = useState('panel1')
  const [course, setCourse] = useState(null)

  const handleChange = panel => () => {
    if (expanded != panel) setExpanded(panel)
  }
  const CreateSection =()  => {
    history.push('/Setting/Course/' + id + '/sectionForm')
  }

  const EditSection = (secId)=> {
    history.push('/Setting/Course/'+id+'/sectionForm/' + secId)
  }
  const DeleteSection = id => {
    debugger
    if (window.confirm('Do you realy Want to delete Compelete Section ?')) {
      debugger
      axios
        .delete('/api/course/courseSection/', {
          data: { id }
        })
        .then(response => {
          loaddata()
        })
    }
  }
  const loaddata = () => {
    console.log(id);
    axios
      .get('/api/course/course/' + id)
      .then(response => {
        setCourse(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const addSectionContent = (id, typeId) => {
    history.push('/setting/Course/section/' + id + '/type/' + typeId)
  }
  const EditContent = id => {
    history.push('/setting/Course/section/content' + id)
  }
  const DeleteContent = id => {
    if (window.confirm('Do you realy Want to delete this Content ?')) {
      debugger
      axios
        .delete('/api/course/courseSectionContent', {
          data: { id: id }
        })
        .then(response => {
          this.loaddata()
        })
    }
  }
  useEffect(() => {
    loaddata();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <Card>
              <Card.Header as='h5'>
                {course ? course.title : ''}
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
                    course.sections.map(item => (
                      <Card key={item._id}>
                        <Card.Header>
                          <div className='row'>
                            <div className='col ANewSec'>
                              <Accordion.Toggle
                                as={Button}
                                variant='text'
                                eventKey={item._id}
                              >
                                <h5>{item.name}</h5>
                              </Accordion.Toggle>
                            </div>
                            <Col md='auto'>
                              <div
                                className='btn-group'
                                role='group'
                                aria-label=''
                              >
                               <AddContentButton  sectionId= {item._id} courseId={id}/>
                                <button
                                  className=' btn btn-primary pull-right'
                                  style={{ marginLeft: 'auto' }}
                                  onClick={e => {
                                    EditSection(item._id)
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className=' btn btn-danger pull-right'
                                  onClick={event => {
                                    DeleteSection(item._id)
                                  }}
                                >
                                  delete
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
                                  className='row'
                                  key={c._id}
                                  style={{ margin: '10px' }}
                                >
                                  <Col>{c.title}</Col>

                                  <Col>{c.type}</Col>
                                  <Col xs md='2'>
                                    <div
                                      className='btn-group'
                                      role='group'
                                      aria-label=''
                                    >
                                      <button
                                        className='btn btn-primary pull-right'
                                        onClick={event => {
                                          this.EditSectionContent(
                                            item,
                                            c,
                                            event
                                          )
                                        }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className='btn btn-danger pull-right'
                                        onClick={event => {
                                          this.DeleteSectionContent(c._id)
                                        }}
                                      >
                                        delete
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
