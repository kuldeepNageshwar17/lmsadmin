import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import JoditEditor from 'jodit-react'

export default function BatchForm () {
  const [Batch, setBatch] = useState({   
    name: '',
    description: '',
    class:"",
  })
  const [Classes, setClasses] = useState([])
  // const [Years, setYears] = useState([])

  let { id } = useParams()
  let history = useHistory()
  useEffect(() => {
    debugger
    axios
      .get('/api/setting/getClassesDdr')
      .then(res => {
        setClasses(res.data.classes)
      })
      .catch(err => {
        console.log(err)
      })
   
    debugger;
    if(id)
    {
      axios
      .get('/api/setting/getBatch/' + id)
      .then(res => {
        debugger;
        if(res.data.length)
        setBatch(res.data[0])
      })
      .catch(err => {
        console.log(err)

      })
    }
  }, [id])

  const saveBatch = event => {
    event.preventDefault()
    debugger
    axios
      .post('/api/setting/createBatch', Batch)
      .then(res => {
        history.push('/setting/Batch')
      })
      .catch(err => {
        console.log(err)
      })
  }
  const editor = React.useRef(null)

  const config = {
    defaultActionOnPaste: 'insert_as_html',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  
  const handleBatchDescription = e => {
    setBatch({
      ...Batch,
      description : e.target.innerHTML
    })
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <Card.Body>
              <Form onSubmit={saveBatch}>
                <Form.Group controlId='formTitle'>
                  <Form.Label>Batch Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Batch Name'
                    required
                    value={Batch.name}
                    onChange={event =>
                      setBatch({ ...Batch, name: event.target.value })
                    }
                  /> 
                  <Form.Label>Select Class </Form.Label>
                  <Form.Control
                    as='select'
                    placeholder=''
                    // disabled={Batch._id?"true":"false"}
                    value={Batch.class}
                    required
                    onChange={event =>
                      setBatch({ ...Batch, class: event.target.value })
                    }
                  >
                    <option value="">select class</option>
                    {Classes.map(item => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Text className='text-muted'>Class</Form.Text>
                
                  <Form.Label>Batch description</Form.Label>
                  <JoditEditor
                    ref={editor}
                    value={Batch.description}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={handleBatchDescription} // preferred to use only this option to update the content for performance reasons
                  />
                  {/* <Form.Control
                    type='text'
                    placeholder='Batch description'
                    value={Batch.description}
                    onChange={event =>
                      setBatch({ ...Batch, description: event.target.value })
                    }
                  />
                  <Form.Text className='text-muted'>Batch description</Form.Text> */}
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
