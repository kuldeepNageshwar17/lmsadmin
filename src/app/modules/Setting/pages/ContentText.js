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
import JoditEditor from 'jodit-react'

export default function ContentText() {
  const [Content, setContent] = useState({
    description: '',
    title: '',
    contentUrl: '',
    type: 'text'
  })
  const { id, cid } = useParams()
  const history = useHistory()

  const saveData = async event => {
    event.preventDefault()
    debugger
    let data = Content
    let formData = new FormData()
    for (var key in data) {
      formData.append(key, data[key])
    }
    debugger
    await axios
      .post('api/course/SectionContent/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        history.goBack()
      })
      .catch(err => {
        console.log('error in file upload :' + err)
      })
  }

  const config = {
    defaultActionOnPaste: 'insert_as_html',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  useEffect(() => {

    if (cid) {
      axios
        .get('/api/course/sectionContent/' + cid)
        .then(res => {
          setContent(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [cid, id])
  const editor = useRef(null)
  const handleChangeDesripiton = e => {
    debugger
    // console.log(this.editor.current)
    setContent({
      ...Content,
      description: e.target.innerHTML
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
                  <Col className='col-md-12'>
                    <Form.Label>Tittle</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Content Name'
                      value={Content.title}
                      onChange={event =>
                        setContent({ ...Content, title: event.target.value })
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Col className='col-md-12'>
                    <Form.Label>Dscription</Form.Label>
                    <div className='col-md-12'>
                      <JoditEditor
                        ref={editor}
                        value={Content.description}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={handleChangeDesripiton} // preferred to use only this option to update the content for performance reasons
                      />
                    </div>
                  </Col>
                </Form.Group>
                {/* <Form.Group>
                  <Col className='col-md-12'>
                    <Form.Label>File upload </Form.Label>
                    <Form.Control
                      type='file'
                      //   value={Content.file}
                      onChange={event =>
                        setContent({
                          ...Content,
                          file: event.target.files[0]
                        })
                      }
                    />
                  </Col>
                </Form.Group> */}
                
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
                <Button
                  variant='secondary' className='ml-3'
                  type='button'
                  onClick={() => {
                    if (history.length > 1) {
                      // this will take you back if there is history
                      history.goBack()
                    }
                  }}
                >
                  Cancel
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
