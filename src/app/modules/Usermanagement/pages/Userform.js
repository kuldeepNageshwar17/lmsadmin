import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card, Col} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap'
// import { ToastContainer, toast } from 'react-toastify';

function Userform () {
  const [User, setUser] = useState({
    name: '',
    // role: '',
    password: '',
    email: '',
    mobile: '',
    confirmPassword: '',
    branch: '',
    roles: []
  })
  const [MatchPassword , setMatchPassword] = useState([])
  const [Roles, setRoles] = useState([])
  const [RolesDdr, setRolesDdr] = useState([])
  const [ShowBranch, setShowBranch] = useState(false)
  const [Branches, setBranches] = useState([])

  let { id } = useParams()
  let history = useHistory()
  useEffect(() => {
    if (id) {
      axios
        .get('/api/staff/User/' + id)
        .then(res => {
          if (res.data.roles.length) {
            setUser({ ...res.data, password: '', role: res.data.roles[0] })
          } else {
            setUser({ ...res.data, password: '' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    axios
      .get('/api/staff/UserRolesIstitute')
      .then(res => {
        setRoles(res.data)
        var roles = res.data.map(item => {
          return { key: item.id, label: item.name }
        })
        setRolesDdr(roles)
      })
      .catch(err => {
        console.log(err)
      })
    axios
      .get('/api/branch/Branch')
      .then(res => {
        setBranches(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  useEffect(() => {
    
debugger;
    var role = Roles.filter(m => User.roles.includes(m.id))
    if (role.length) {
    var adminRole= role.some(a=>a.type === 1) ;
      setShowBranch(!adminRole);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User])

  const saveUser = event => {
    event.preventDefault()
    if(MatchPassword){
      return alert(MatchPassword)
    }
    
    axios
      .post('/api/staff/UserFormInstitute', User)
      .then(res => {
        history.push('/user')
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
            <Card.Body>
              <Form onSubmit={saveUser}>
                <Form.Group className='row'>
                  <Col>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=' Full  Name'
                      value={User.name}
                      required
                      onChange={event =>
                        setUser({ ...User, name: event.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    <div className='app'>
                      <div className='preview-values '>
                        <Form.Label>User Role </Form.Label>
                        {/* {User.roles} */}
                      </div>
                      {/* {User.roles} */}
                      {RolesDdr.length && (
                        <DropdownMultiselect
                       
                          options={RolesDdr}
                          name='roles'
                          selected={User.roles}
                          required
                          handleOnChange={selected => {
                            setUser({ ...User, roles: selected })
                            // console.log(selected)
                          }}
                        />
                      )}
                    </div>
                    {/* <Form.Label>User Role </Form.Label>
                    <Form.Control
                      as='select'
                      placeholder=''
                      // disabled={setUser._id?"true":"false"}
                      value={User.role}
                      onChange={event =>
                        setUser({ ...User, role: event.target.value })
                      }
                    >
                      <option>select Role</option>
                      {Roles.map(item => (
                        <option value={item.id} key={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Control> */}
                  </Col>
                   <Col>

                   { ShowBranch && 
                   <>
                     <Form.Label>User Branch </Form.Label>
                    <Form.Control
                      as='select'
                      placeholder=''
                      disabled={!ShowBranch}
                      value={User.branch}
                      onChange={event =>
                        setUser({ ...User, branch: event.target.value })
                      }
                    >
                      <option value="">select Branch</option>
                      {Branches.map(item => (
                        <option value={item._id} key={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Control>
                    </>
                    }
                   
                  </Col>
                </Form.Group>

                <Form.Group controlId='formEmail' className='row'>
                  <Col>
                    <Form.Label> Email </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder='user email'
                      value={User.email}
                      required
                      onChange={event =>
                        setUser({ ...User, email: event.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    {' '}
                    <Form.Label> Mobile </Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='user mobile'
                      value={User.mobile}
                      required
                      onChange={event => {
                        
                        setUser({ ...User, mobile: event.target.value })
                      }}
                      onBlur = {event => {
                        if( event.target.value.length < 10){
                          return alert("Mobile number must be of 10 digit")
                        }
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Label> Password </Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='user pasword'
                      value={User.pasword}
                      required
                      onChange={event =>
                        setUser({ ...User, password: event.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label> Confirm Password </Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Confirm  pasword'
                      value={User.confirmPassword}
                      required
                      onChange={event =>
                        setUser({
                          ...User,
                          confirmPassword: event.target.value
                        })
                      }
                      onBlur={event => {
                        if(User.password === event.target.value){
                          setMatchPassword("")
                        }
                        else{
                          setMatchPassword("Password don't match.")
                        }
                       
                      }}
                      
                    />
                    {MatchPassword && <div className="text-danger">{MatchPassword}</div> }
                  </Col>
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
                {/* <ToastContainer limit={5} style={{backgroundColor : "red"}}/> */}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default Userform
