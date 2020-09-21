import React,{useState,useEffect}from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function StudentForm() {
    const [Student, setStudent] = useState({
        _id: null,
        name: '',        
        password:"",
        email:"",
        mobile:"",        
        confirmPasswors:"",
        currentBatch:"",


      })
      const [Batches, setBatches] = useState([])
    
      let { id } = useParams()
      let history = useHistory()
      useEffect(() => {
        debugger
        // axios
        //   .get('/api/setting/getBranchClassddr')
        //   .then(res => {
        //     setClasses(res.data.classes)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
        debugger;
        if(id)
        {
        //   axios
        //   .get('/api/setting/getBatch/' + id)
        //   .then(res => {
        //     debugger;
        //     setBatch(res.data)
        //   })
        //   .catch(err => {
        //     console.log(err)
    
        //   })
        }
      }, [id])
    
      const saveStudent = event => {
        event.preventDefault()
        debugger
        // axios
        //   .post('/api/setting/createBatch', Batch)
        //   .then(res => {
        //     history.push('/setting/Batch')
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      }
    return (
        <div>
      <div className='row'>
        <div className='col-md-6'>
          <Card>
            <Card.Body>
              <Form onSubmit={saveStudent}>
                <Form.Group controlId='fromName '>
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder=' Full  Name'
                    value={Student.name}
                    onChange={event =>
                        setStudent({ ...Student, name: event.target.value })
                    }
                  />
                  <Form.Text className='text-muted'>Student Name</Form.Text>
                </Form.Group>

                <Form.Group controlId='formBatch'>
                  <Form.Label>Student Batch </Form.Label>
                  <Form.Control
                    as='select'
                    placeholder=''
                    // disabled={setStudent._id?"true":"false"}
                    value={Student.Roles}
                    onChange={event =>
                      setStudent({ ...Student, currentBatch : event.target.value })
                    }
                  >
                    <option>select Batch</option>
                    {Batches.map(item => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Text className='text-muted'>Roles</Form.Text>
                </Form.Group>

                <Form.Group controlId='formEmail'>
                  <Form.Label> Email </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='user email'
                    value={Student.email}
                    onChange={event =>
                        setStudent({ ...Student, email: event.target.value })
                    }
                  />                  
                  <Form.Text className='text-muted'>Email</Form.Text>
                </Form.Group>


                
                <Form.Group controlId='formmobile'>
                  <Form.Label> Mobile </Form.Label>
                  <Form.Control
                    type='phone'
                    placeholder='user mobile'
                    value={Student.mobile}
                    onChange={event =>
                        setStudent({ ...Student, mobile: event.target.value })
                    }
                  />                  
                  <Form.Text className='text-muted'>Mobile</Form.Text>
                </Form.Group>


                  
                <Form.Group controlId='form'>
                  <Form.Label> Password </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='user pasword'
                    value={Student.pasword}
                    onChange={event =>
                        setStudent({ ...Student, password: event.target.value })
                    }
                  />                  
                  <Form.Text className='text-muted'>password</Form.Text>
                </Form.Group>
                <Form.Group controlId='form'>
                  <Form.Label> Confirm Password </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm  pasword'
                    value={Student.confirmPassword}
                    onChange={event =>
                        setStudent({ ...Student, confirmPassword: event.target.value })
                    }
                  />                  
                  <Form.Text className='text-muted'>password</Form.Text>
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
export default StudentForm
