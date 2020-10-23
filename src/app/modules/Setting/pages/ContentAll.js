import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Form, Col } from 'react-bootstrap'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../_metronic/_partials/controls'

import { Tabs, Tab } from 'react-bootstrap'
import JoditEditor from 'jodit-react'

export default function VideoContent () {
  const [Content, setContent] = useState({
    title: '',
    videoUrl : '' ,
    videoDescription : '', 
    imageUrl : '' , 
    imageDescription : '',
    pdfDescription : '',
    pdfUrl : '',
    textDescription : '',
    audioUrl : '',
    audioDescription : ''

  })
  const { id, cid } = useParams()
  const history = useHistory()

  const saveData = async event => {
    event.preventDefault()

    // debugger
    // let data = Content
    // let formData = new FormData()
    // for (var key in data) {
    //   formData.append(key, data[key])
    // }
    debugger
    await axios
      .post('api/course/SectionContent/' + id, Content)
      .then(res => {
        history.goBack()
      })
      .catch(err => {
        console.log('error in file upload :' + err)
      })
  }
  const editor = useRef(null)
  const config = {
    defaultActionOnPaste: 'insert_as_html',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  const uploadVideo = async (file) => {
    let formData = new FormData()
    formData.append("file"  , file)
    
    await axios
      .post('api/course/savefile/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        setContent({
          ...Content,
          videoUrl : res.data
        })
        // history.goBack()
      })
      .catch(err => {
        console.log('error in file upload :' + err)
      })

  }
  const uploadImage = async (file) => {
    let formData = new FormData()
    formData.append("file"  , file)
    
    await axios
      .post('api/course/savefile/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        setContent({
          ...Content,
          imageUrl : res.data
        })
        
        // history.goBack()
      })
      .catch(err => {
        console.log('error in file upload :' + err)
      })

  }
  const uploadpdf = async (file) => {
    let formData = new FormData()
    formData.append("file"  , file)
    
    await axios
      .post('api/course/savefile/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        setContent({
          ...Content,
          pdfUrl : res.data
        })
        
        // history.goBack()
      })
      .catch(err => {
        console.log('error in file upload :' + err)
      })

  }
  const uploadAudio = async (file) => {
    let formData = new FormData()
    formData.append("file"  , file)
    
    await axios
      .post('api/course/savefile/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        setContent({
          ...Content,
          audioUrl : res.data
        })
        
        // history.goBack()
      })
      .catch(err => {
        console.log('error in file upload :' + err)
      })

  }
  useEffect(() => {
    if (cid) {
      axios
        .get('/api/course/sectionContent/' + cid)
        .then(res => {
          console.log("here in update" , res.data)
          setContent(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [cid, id])
  const handlePdfDesripiton = e => {
    setContent({
      ...Content,
      pdfDescription : e.target.innerHTML
    })
  }
  const handleVideoDesripiton = e => {
    setContent({
      ...Content,
      videoDescription: e.target.innerHTML
    })
  }
  const handleImageDesripiton = e => {
    setContent({
      ...Content,
      imageDescription : e.target.innerHTML
    })
  }
  const handleTextDesripiton = e => {
    setContent({
      ...Content,
      textDescription : e.target.innerHTML
    })
  }
  const handleAudioDesripiton = e => {
    setContent({
      ...Content,
      audioDescription : e.target.innerHTML
    })
  }

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title='Add Content'></CardHeader>
            <CardBody>
              <Form onSubmit={saveData}>
                <Form.Group>
                  <Col>
                    <Form.Label>Tittle</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Content Name'
                      required
                      value={Content.title}
                      onChange={event =>
                        setContent({
                          ...Content,
                          title: event.target.value
                        })
                      }
                    />
                  </Col>
                </Form.Group>
                <Tabs defaultActiveKey='video' id='uncontrolled-tab-example'>
                  <Tab eventKey='video' title='video'>
                    <Form.Group>
                      <Col className='mt-10'>
                        <Form.Label>File upload </Form.Label>
                        <Form.Control
                          type='file'
                          //   value={Content.file}
                          onChange={event =>
                            uploadVideo(event.target.files[0])
                            // setContent({
                            //   ...Content,
                            //   file: event.target.files[0]
                            // })
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group>
                      <Col className=''>
                        <Form.Label>Description</Form.Label>
                        <div>
                          <JoditEditor
                            ref={editor}
                            value={Content.videoDescription}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={handleVideoDesripiton} // preferred to use only this option to update the content for performance reasons
                          />
                        </div>
                      </Col>
                    </Form.Group>
                  </Tab>
                  <Tab eventKey='text' title='Text'>
                    <Form.Group>
                      <Col className='mt-10'>
                        <Form.Label>Text</Form.Label>
                        <div className=''>
                          <JoditEditor
                            ref={editor}
                            value={Content.textDescription}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={handleTextDesripiton} // preferred to use only this option to update the content for performance reasons
                          />
                        </div>
                      </Col>
                    </Form.Group>
                  </Tab>
                  <Tab eventKey='Image' title='Image'>
                    <Form.Group>
                      <Col className='mt-10'>
                        <Form.Label>File upload </Form.Label>
                        <Form.Control
                          type='file'
                          //   value={Content.file}
                          onChange={event =>
                            uploadImage(event.target.files[0])
                          }
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col className='mt-10'>
                        <Form.Label>Description</Form.Label>
                        <div className=''>
                          <JoditEditor
                            ref={editor}
                            value={Content.imageDescription}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={handleImageDesripiton} // preferred to use only this option to update the content for performance reasons
                          />
                        </div>
                      </Col>
                    </Form.Group>
                  </Tab>
                  <Tab eventKey='Audio' title='Audio'>
                    <Form.Group>
                      <Col className='mt-10'>
                        <Form.Label>Audio Upload </Form.Label>
                        <Form.Control
                          type='file'
                          //   value={Content.file}
                          onChange={event =>
                            uploadAudio(event.target.files[0])
                          }
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col className='mt-10'>
                        <Form.Label>Description</Form.Label>
                        <div className=''>
                          <JoditEditor
                            ref={editor}
                            value={Content.audioDescription}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={handleAudioDesripiton} // preferred to use only this option to update the content for performance reasons
                          />
                        </div>
                      </Col>
                    </Form.Group>
                  </Tab>
                  <Tab eventKey='PDF' title='PDF'>
                    <Form.Group>
                      <Col className='mt-10'>
                        <Form.Label>File upload </Form.Label>
                        <Form.Control
                          type='file'
                          //   value={Content.file}
                          onChange={event =>
                            uploadpdf(event.target.files[0])
                          }
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col className='mt-10'>
                        <Form.Label>Description</Form.Label>
                        <div className=''>
                          <JoditEditor
                            ref={editor}
                            value={Content.pdfDescription}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={handlePdfDesripiton} // preferred to use only this option to update the content for performance reasons
                          />
                        </div>
                      </Col>
                    </Form.Group>
                  </Tab>
                </Tabs>

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
                <Button
                  variant='secondary'
                  className='ml-3'
                  type='button'
                  onClick={() => {
                    if (history.length > 1) {
                      // this will take you back if there is history
                      history.goBack()
                    }
                  }}
                >
                  cancel
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
