import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Form, Card, Col } from 'react-bootstrap'
import JoditEditor from 'jodit-react'


export default function ClassForm() {
  let { id, cid } = useParams()
  const [ClassVar, setClass] = useState({ name: '', description: '',fees:""})
  let history = useHistory()

  useEffect(() => {
    if (id) {
      debugger;
      axios.get('/api/branch/class/' + id).then(res => {
        if (res.data) {
          setClass({
            id: res.data._id,
            name: res.data.name,
            description: res.data.description,
            fees: res.data.fees,
          })
          // initial._id = id
          // initial.name = res.data.name
          // initial.description = res.data.description
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const saveClassFormData = async event => {
    event.preventDefault()
    debugger
    await axios
      .post('/api/branch/class', ClassVar)
      .then(res => {
        debugger;
        history.push('/setting/class');
      })
      .catch(err => {
        console.log(err)
      })
  }
  const getData = () => {
    debugger
  }
  const editor = React.useRef(null)
  const config = {
    defaultActionOnPaste: 'insert_as_html',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  const handleDescripiton = e => {
    debugger;
    setClass({
      ...ClassVar , 
      description : e.target.innerHTML
    })
  }

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <Card.Body>
              <Form onSubmit={saveClassFormData}>
                <Form.Group controlId='formTitle' className="row">
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Class Title'
                    required
                    value={ClassVar.name}
                    onChange={event =>
                      setClass({ ...ClassVar, name: event.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId='formTitle' className="row">
                  <Form.Label>Fees</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='amount'
                    value={ClassVar.fees}
                    onChange={event =>
                      setClass({ ...ClassVar, fees: event.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId='formTitle' className="row">
                  {/* <Col>
                  
                  <Form.Label>description</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Class description'
                      value={ClassVar.description}
                      onChange={event =>
                        setClass({ ...ClassVar, description: event.target.value })
                      }
                    />
                    </Col> */}



                  <Form.Label>Description</Form.Label>
                  < JoditEditor
                    ref={editor}
                    value={ClassVar.description}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={handleDescripiton} // preferred to use only this option to update the content for performance reasons
                  />


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
