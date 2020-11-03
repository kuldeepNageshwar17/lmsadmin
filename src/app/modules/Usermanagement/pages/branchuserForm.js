import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap'

export default function BranchUserform () {
  let { id } = useParams()

  const [User, setUser] = useState({
    name: '',
    role: '',
    password: '',
    email: '',
    mobile: '',
    confirmPassword: '',
    roles: []
  })
  const [Roles, setRoles] = useState([])
  const [RolesDdr, setRolesDdr] = useState([])
  const [RoleState, setRoleState] = useState(false)

  console.log(id)
  let history = useHistory()

  useEffect(() => {
    debugger
    if (id) {
      axios
        .get('/api/staff/User/' + id)
        .then(res => {
          if (res.data.roles.length) {
            setUser({ ...res.data, role: res.data.roles[0] })
          } else {
            setUser(res.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    axios
      .get('/api/staff/UserRolesBranch')
      .then(res => {
        setRoles(res.data)
        var roles = res.data.map(item => {
          return { key: item.id, label: item.name }
        })
        setRolesDdr(roles)
        // setRoles(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

  useEffect(() => {
    debugger
    if (User.roles && User.roles.length) {
      // Roles.forEach(item=>{
      //   debugger;
      //   if(item.id===User.role && item.type === 1){
      //     setRoleState(true);
      //   }
      // })
      if (!Roles.filter(m => m.id === User.role).length) {
        setRoleState(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User.roles, Roles])

  const saveUser = event => {
    event.preventDefault()
    debugger
    axios
      .post('/api/staff/UserForm', User)
      .then(res => {
        history.push('/user/BranchUser')
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
              <Form onSubmit={saveUser}>
                <Form.Group >
                  <Col>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=' Full  Name'
                      value={User.name}
                      onChange={event =>
                        setUser({ ...User, name: event.target.value })
                      }
                    />
                  </Col>
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
                        handleOnChange={selected => {
                          setUser({ ...User, roles: selected })
                          // console.log(selected)
                        }}
                      />
                    )}
                  </div>

                  {/* <Col>
                    <Form.Label>User Role </Form.Label>
                    <Form.Control
                      as='select'
                      placeholder=''
                      disabled={RoleState}
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
                    </Form.Control>
                  </Col> */}
                  <Col>
                    <Form.Label> Email </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='user email'
                      value={User.email}
                      onChange={event =>
                        setUser({ ...User, email: event.target.value })
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group >
                  <Col>
                    <Form.Label> Mobile </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='user mobile'
                      value={User.mobile}
                      onChange={event =>
                        setUser({ ...User, mobile: event.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label> Password </Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='user pasword'
                      value={User.pasword}
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
                      onChange={event =>
                        setUser({
                          ...User,
                          confirmPassword: event.target.value
                        })
                      }
                    />
                  </Col>
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
