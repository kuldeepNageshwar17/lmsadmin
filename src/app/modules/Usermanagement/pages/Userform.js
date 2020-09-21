import React,{useState,useEffect}from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Userform() {
    const [User, setUser] = useState({
        _id: null,
        name: '',
        roles: [],
        password:"",
        email:"",
        mobile:"",        
        confirmPasswors:""

      })
      const [Roles, RolesClasses] = useState([])
    
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
    
      const saveUser = event => {
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
              <Form onSubmit={saveUser}>
                <Form.Group controlId='formTitle'>
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder=' Full  Name'
                    value={User.name}
                    onChange={event =>
                        setUser({ ...User, name: event.target.value })
                    }
                  />
                  <Form.Text className='text-muted'>User Name</Form.Text>
                </Form.Group>

                <Form.Group controlId='formRoles'>
                  <Form.Label>User Role </Form.Label>
                  <Form.Control
                    as='select'
                    placeholder=''
                    // disabled={setUser._id?"true":"false"}
                    value={User.Roles}
                    onChange={event =>
                      setUser({ ...User, Roles : event.target.value })
                    }
                  >
                    <option>select Role</option>
                    {Roles.map(item => (
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
                    value={User.email}
                    onChange={event =>
                        setUser({ ...User, email: event.target.value })
                    }
                  />                  
                  <Form.Text className='text-muted'>Email</Form.Text>
                </Form.Group>


                
                <Form.Group controlId='formmobile'>
                  <Form.Label> Mobile </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='user mobile'
                    value={User.mobile}
                    onChange={event =>
                        setUser({ ...User, mobile: event.target.value })
                    }
                  />                  
                  <Form.Text className='text-muted'>Mobile</Form.Text>
                </Form.Group>


                  
                <Form.Group controlId='form'>
                  <Form.Label> Password </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='user pasword'
                    value={User.pasword}
                    onChange={event =>
                        setUser({ ...User, password: event.target.value })
                    }
                  />                  
                  <Form.Text className='text-muted'>password</Form.Text>
                </Form.Group>
                <Form.Group controlId='form'>
                  <Form.Label> Confirm Password </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm  pasword'
                    value={User.confirmPassword}
                    onChange={event =>
                        setUser({ ...User, confirmPassword: event.target.value })
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
export default Userform
