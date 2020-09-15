import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams ,useHistory} from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'




export default function ClassForm () {
  let { id } = useParams()
  const [Class, setClass] = useState({ id: null, name: '', description: '' })
  let history = useHistory()

  useEffect(() => {
    if (id) {
      debugger;
      axios.get('/api/branch/class/' + id).then(res => {
        if (res.data) {
          console.log("data",res.data);
          setClass({
            id: res.data._id,
            name: res.data.name,
            description: res.data.description
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
      .post('/api/branch/class', Class)
      .then(res => {
        history.push('/setting/class')
      })
      .catch(err => {
        console.log(err)
      })
  }
  const getData = () => {
    debugger
  }
  const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  
  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <Card>
            <Card.Body>
              <Form onSubmit={saveClassFormData}>
                <Form.Group controlId='formTitle'>
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Class Title'
                    value={Class.name}
                    onChange={event =>
                      setClass({ ...Class, name: event.target.value })
                    }
                  />
                  <Form.Text className='text-muted'>class Name</Form.Text>
                </Form.Group>
                <Form.Group controlId='formTitle'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Class description'
                    value={Class.description}
                    onChange={event =>
                      setClass({ ...Class, description: event.target.value })
                    }
                  />
                  <Form.Text className='text-muted'>Description</Form.Text>
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
