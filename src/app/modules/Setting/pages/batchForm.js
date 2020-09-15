import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function BatchForm () {
  const [Batch, setBatch] = useState({
    _id: null,
    name: '',
    year: '',
    classId: ''
  })
  const [Classes, setClasses] = useState([])
  const [Years, setYears] = useState([])

  let { id } = useParams()
  let history = useHistory()
  useEffect(() => {
    debugger
    axios
      .get('/api/setting/getBranchClassddr')
      .then(res => {
        setClasses(res.data.classes)
      })
      .catch(err => {
        console.log(err)
      })
    axios
      .get('/api/setting/getBranchYearDdr')
      .then(res => {
        setYears(res.data)
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
        setBatch(res.data)
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

  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <Card>
            <Card.Body>
              <Form onSubmit={saveBatch}>
                <Form.Group controlId='formTitle'>
                  <Form.Label>Batch Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Batch Name'
                    value={Batch.name}
                    onChange={event =>
                      setBatch({ ...Batch, name: event.target.value })
                    }
                  />
                  <Form.Text className='text-muted'>Batch Name</Form.Text>
                </Form.Group>

                <Form.Group controlId='formClass'>
                  <Form.Label>Select Class </Form.Label>
                  <Form.Control
                    as='select'
                    placeholder=''
                    disabled={Batch._id?"true":"false"}
                    value={Batch.classId}
                    onChange={event =>
                      setBatch({ ...Batch, classId: event.target.value })
                    }
                  >
                    <option>select class</option>
                    {Classes.map(item => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Text className='text-muted'>Class</Form.Text>
                </Form.Group>

                <Form.Group controlId='formYear'>
                  <Form.Label>Select Year </Form.Label>
                  <Form.Control
                    as='select'
                    placeholder=''
                    value={Batch.year}
                    onChange={event =>
                      setBatch({ ...Batch, year: event.target.value })
                    }
                  >
                    <option>select Years</option>
                    {Years.map(item => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Text className='text-muted'>Year</Form.Text>
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
