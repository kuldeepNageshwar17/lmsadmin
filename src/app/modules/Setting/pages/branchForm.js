import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card, CardHeader, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function BranchForm () {
  const [Branch, setBranch] = useState( { id:null,name: '',  address: { address: '', city: '', state: '' } }
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
        <div className='col-md-12'>
          <Card>
          <Card.Header>
            Add Branch
         </Card.Header>
            <Card.Body>
              <Form onSubmit={saveBranchData}>
                <Form.Group controlId='formTitle' className="row">
                  <Col><Form.Label>Branch Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Branch Name'
                    value={Branch.name}
                    onChange={event =>
                      setBranch({ ...Branch, name: event.target.value })
                    }
                  /></Col>
                  <Col><Form.Label>Address</Form.Label>
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
                  /></Col>
                </Form.Group>

                <Form.Group controlId='city' className="row">
                  <Col><Form.Label>city </Form.Label>
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
                  /></Col>
                  <Col><Form.Label>state </Form.Label>
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
                  /></Col>
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
