import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap'

export default function BranchUserform () {
  let { id } = useParams()
  let history = useHistory()

  const [User, setUser] = useState({})
  const [RolesDdr, setRolesDdr] = useState([])
  const [confirm, setconfirm] = useState({
    confirmPassword: '',
    checkMobileNo: ''
  })
  useEffect(() => {
    debugger
    axios
      .get('/api/staff/UserRolesBranch')
      .then(res => {
        var roles = res.data.map(item => {
          return { key: item.id, label: item.name }
        })
        setRolesDdr(roles)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    if (id) {
      debugger
      axios
        .get('/api/staff/User/' + id)
        .then(res => {
          setUser(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [id])

  // useEffect(() => {
  //   debugger
  //   if (User.roles && User.roles.length) {
  //     // Roles.forEach(item=>{
  //     //   debugger;
  //     //   if(item.id===User.role && item.type === 1){
  //     //     setRoleState(true);
  //     //   }
  //     // })
  //     if (!Roles.filter(m => m.id === User.role).length) {
  //       setRoleState(true)
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [User.roles, Roles])

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
                <Form.Group>
                  <Col>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=' Full  Name'
                      required
                      value={User.name}
                      onChange={event =>
                        setUser({ ...User, name: event.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    <div className='app'>
                      <div className='preview-values '>
                        <Form.Label>User Role </Form.Label>
                      </div>

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
                  </Col>

                  <Col>
                    <Form.Label> Email </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='user email'
                      required
                      value={User.email}
                      onChange={event =>
                        setUser({ ...User, email: event.target.value })
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group>
                  <Col>
                    <Form.Label> Mobile </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='user mobile'
                      value={User.mobile}
                      required={User._id ? true : false}
                      onChange={event => {
                        if (event.target.value.length < 10) {
                          setconfirm({
                            ...confirm,
                            checkMobileNo: 'Please must be of 10 digits'
                          })
                        } else {
                          setconfirm({ ...confirm, checkMobileNo: '' })
                        }
                        setUser({ ...User, mobile: event.target.value })
                      }}
                    />
                    {confirm.checkMobileNo && (
                      <div className='text-danger'>{confirm.checkMobileNo}</div>
                    )}
                  </Col>

                  <Col>
                    <Form.Label> Password </Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='user pasword'
                      required
                      value={User.password}
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
                        if (User.password !== event.target.value) {
                          return setconfirm({
                            ...confirm,
                            confirmPassword: 'Password DoesNot Match'
                          })
                        } else {
                          setconfirm({
                            ...confirm,
                            confirmPassword: ''
                          })
                        }
                      }}
                    />
                  </Col>
                  {confirm.confirmPassword && (
                    <div className='text-danger'>{confirm.confirmPassword}</div>
                  )}
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
