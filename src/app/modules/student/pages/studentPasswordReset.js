import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function PasswordReset () {
  const [Student, setStudent] = useState({
    password: '',
    confirmPassword: ''
  })

  let { id } = useParams()
  let history = useHistory()

  const saveStudent = event => {
    event.preventDefault()
    debugger
    axios
      .post('/api/student/StudentPasswordReset/' + id, Student)
      .then(res => {
        alert('Password Changed')
        history.push('/student')
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
            <Form onSubmit={saveStudent} className='form'>
              <Card.Body>
                <Form.Group className='row'>
                  <div className='col-md-4' controlId='form'>
                    <Form.Label> Password </Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='user pasword'
                      value={Student.pasword}
                      onChange={event =>
                        setStudent({
                          ...Student,
                          password: event.target.value
                        })
                      }
                    />
                  </div>
                  <div className='col-md-4' controlId='form'>
                    <Form.Label> Confirm Password </Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Confirm  pasword'
                      value={Student.confirmPassword}
                      onChange={event =>
                        setStudent({
                          ...Student,
                          confirmPassword: event.target.value
                        })
                      }
                    />
                  </div>
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Card.Body>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default PasswordReset
