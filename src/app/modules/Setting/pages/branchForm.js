import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function BranchForm () {
  const [Branch, setBranch] = useState( { id:null,name: '', code: '', address: { address: '', city: '', state: '' } }
  )

  let { id } = useParams()
  let history = useHistory()
  useEffect(() => {

    debugger;
    if(id){
      axios
      .get('/api/branch/branch/' + id)
      .then(res => {
        setBranch(res.data)
      })
      .catch(err => {
        console.log(err)
        return {}
      })
    }
  }, [id])

  const saveBranchData = event => {
    event.preventDefault()
    debugger
    axios
      .post('/api/branch/branch', Branch)
      .then(res => {
        history.push('/setting/Branch')
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
              <Form onSubmit={saveBranchData}>
                <Form.Group controlId='formTitle'>
                  <Form.Label>Branch Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Branch Name'
                    value={Branch.name}
                    onChange={event =>
                      setBranch({ ...Branch, name: event.target.value })
                    }
                  />
                  <Form.Text className='text-muted'>branch Name</Form.Text>
                </Form.Group>

                <Form.Group controlId='formcode'>
                  <Form.Label>Branch code</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Branch code'
                    value={Branch.code}
                    onChange={event =>
                      setBranch({ ...Branch, code: event.target.value })
                    }
                  />
                  <Form.Text className='text-muted'>branch Name</Form.Text>
                </Form.Group>

                <Form.Group controlId='address'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder=' street  address  / house number /shop number /'
                    value={Branch.address.address}
                    onChange={event =>
                      setBranch({
                        ...Branch,
                        address: {
                          ...Branch.address,
                          address: event.target.value
                        }
                      })
                    }
                  />
                  <Form.Text className='text-muted'>address</Form.Text>
                </Form.Group>

                <Form.Group controlId='city'>
                  <Form.Label>city </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='city'
                    value={Branch.address.city}
                    onChange={event =>
                      setBranch({
                        ...Branch,
                        address: { ...Branch.address, city: event.target.value }
                      })
                    }
                  />
                  <Form.Text className='text-muted'>city</Form.Text>
                </Form.Group>

                <Form.Group controlId='state'>
                  <Form.Label>state </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='state'
                    value={Branch.address.state}
                    onChange={event =>
                      setBranch({
                        ...Branch,
                        address: {
                          ...Branch.address,
                          state: event.target.value
                        }
                      })
                    }
                  />
                  <Form.Text className='text-muted'>city</Form.Text>
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
