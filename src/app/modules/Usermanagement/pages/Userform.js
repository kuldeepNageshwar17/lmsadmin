import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Userform () {
  const [User, setUser] = useState({   
    name: '',
    role:"",
    password: '',
    email: '',
    mobile: '',
    confirmPassword: '',
    branch: ''
  })
  const [Roles, setRoles] = useState([])
  const [ShowBranch, setShowBranch] = useState(false)
  const [Branches, setBranches] = useState([])

  let { id } = useParams()
  let history = useHistory()
  useEffect(() => {

    if(id){
      axios
      .get('/api/staff/User/'+id)
      .then(res => {
        if(res.data.roles.length){
          setUser({...res.data,"role" :res.data.roles[0]})
        }else{
          setUser(res.data)
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
    // if (id) {
    //     axios
    //     .get('/api/setting/ge/' + id)
    //     .then(res => {
    //       debugger;
    //       setUser(res.data)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  }, [id])
  useEffect(() => {
    debugger;

  //   for (let i = 0; i < Roles.length; i++) {
  //     if (cities[i].population > 3000000) {
  //         bigCities.push(cities[i]);
  //     }
  // }
    var role = Roles.filter(m => m.id === User.role)
    if (role.length) {
      role[0].type === 1 ? setShowBranch(true) : setShowBranch(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User])

  const saveUser = event => {
    event.preventDefault()
    debugger
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
                    onChange={event =>
                      setUser({ ...User, name: event.target.value })
                    }
                  />
                </Col>
                <Col>
                <Form.Label>User Role </Form.Label>
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
                  </Form.Control>
                </Col>
                <Col>
                <Form.Label>User Branch </Form.Label>
                  <Form.Control
                    as='select'
                    placeholder=''
                    disabled={ShowBranch}
                    value={User.branch}
                    onChange={event =>
                      setUser({ ...User, branch: event.target.value })
                    }
                  >
                    <option>select Branch</option>
                    {Branches.map(item => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

                <Form.Group controlId='formEmail'  className='row'>
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
                  <Col>  <Form.Label> Mobile </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='user mobile'
                    value={User.mobile}
                    onChange={event =>
                      setUser({ ...User, mobile: event.target.value })
                    }
                  /></Col>
                  <Col><Form.Label> Password </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='user pasword'
                    value={User.pasword}
                    onChange={event =>
                      setUser({ ...User, password: event.target.value })
                    }
                  /></Col>
                  <Col><Form.Label> Confirm Password </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm  pasword'
                    value={User.confirmPassword}
                    onChange={event =>
                      setUser({ ...User, confirmPassword: event.target.value })
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
export default Userform
