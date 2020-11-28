import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


function StudentForm() {
  const [Student, setStudent] = useState({
    name: '',
    password: '',
    email: '',
    mobile: '',
    confirmPasswors: '',
    currentBatch: '',
    fees: ''
  })
  const [confirm, setconfirm] = useState({
    confirmPassword: "",
    checkMobileNo: ""
  })
  const [Batches, setBatches] = useState([])

  let { id } = useParams()
  let history = useHistory()
  useEffect(() => {
    debugger
    axios
      .get('/api/student/Batchesddr')
      .then(res => {
        setBatches(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    debugger
    if (id) {
      axios
        .get('/api/student/student/' + id)
        .then(res => {
          debugger
          setStudent(res.data.student)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [id])
  const getFees = async (id) => {
    var data = { id }

    axios.post('/api/student/getFeesOfClass', data).then((res) => {
      setStudent({ ...Student, fees: res.data.fees, currentBatch: id })
    }).catch((error) => {
      setStudent({ ...Student, currentBatch: id })
    })


  }
  const saveStudent = event => {
    event.preventDefault()
    debugger
    console.log("student", Student)
    axios
      .post('/api/student/student', Student)
      .then(res => {
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
            {' '}
            <Form onSubmit={saveStudent} className='form'>
              <Card.Body>
                <Form.Group className='row'>
                  <div className='col-md-4' controlId='fromName'>
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=' Full  Name'
                      required
                      value={Student.name}
                      onChange={event =>
                        setStudent({ ...Student, name: event.target.value })
                      }
                    />
                  </div>
                  <div className='col-md-4' controlId='formBatch'>
                    <Form.Label>Student Batch </Form.Label>
                    <Form.Control
                      as='select'
                      placeholder=''
                      // disabled={setStudent._id?"true":"false"}
                      value={Student.currentBatch}
                      required
                      onChange={event => {
                        // setStudent({
                        //   ...Student,
                        //   currentBatch: event.target.value
                        // })
                        getFees(event.target.value);
                      }
                      }
                    >
                      <option value="">select Batch</option>
                      {Batches.map(item => (
                        <option value={item._id} key={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                  <div className='col-md-4' controlId='formFees'>
                    <Form.Label> Fees </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Fees'
                      value={Student.fees}
                      required
                      onChange={event =>
                        setStudent({ ...Student, fees: event.target.value })
                      }
                    />
                  </div>
                  <div className='col-md-4' controlId='formEmail'>
                    <Form.Label> Email </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='user email'
                      value={Student.email}
                      required
                      onChange={event =>
                        setStudent({ ...Student, email: event.target.value })
                      }
                    />
                  </div>
                  <div className='col-md-4' controlId='formmobile'>
                    <Form.Label> Mobile </Form.Label>
                    <Form.Control
                      type='phone'
                      placeholder='user mobile'
                      required
                      value={Student.mobile}
                      onChange={event => {
                        if (event.target.value.length < 10) {
                          setconfirm({ ...confirm, checkMobileNo: "Please must be of 10 digits" })
                        }
                        else {
                          setconfirm({ ...confirm, checkMobileNo: "" })
                        }
                        setStudent({ ...Student, mobile: event.target.value })
                      }}
                    />
                    {confirm.checkMobileNo && <div className="text-danger">{confirm.checkMobileNo}</div>}
                  </div>
                  {!id && (
                    <>
                      <div className='col-md-4' controlId='form'>
                        <Form.Label> Password </Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='user pasword'
                          required
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
                          required
                          onChange={event =>
                            setStudent({
                              ...Student,
                              confirmPassword: event.target.value
                            })
                          }
                          onBlur={event => {
                            if (Student.password !== event.target.value) {
                              return setconfirm({
                                ...confirm,
                                confirmPassword: "Password DoesNot Match"
                              })
                            }
                            else {
                              setconfirm({
                                ...confirm,
                                confirmPassword: ""
                              })
                            }
                          }}
                        />
                        {confirm.confirmPassword && <div className="text-danger">{confirm.confirmPassword}</div>}
                      </div>

                    </>)
                  }

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
export default StudentForm
