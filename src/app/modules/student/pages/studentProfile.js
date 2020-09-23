import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../_metronic/_partials/controls'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { Tabs, Tab,Form, ProgressBar, Alert } from 'react-bootstrap'

import { useParams } from 'react-router-dom'
const { API_URL } = process.env;
console.log(API_URL)

function StudentProfile () {
  const [student, setstudent] = useState({})
  const [batch, setBatch] = useState({})
  const history = useHistory()
  let { id } = useParams()
  

  const uploadProfile = () => {
    debugger;
    console.log(uploadFile.current.files);
    if(uploadFile.current.files.length){
      var files = uploadFile.current.files[0]
    
      let formData = new FormData();
      formData.append("file", files);
     axios.post('api/student/ChangeProfileImage/'+id , formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  }).then((res)=>{
       if(res.data.status){
         alert(" profile updated")
         setstudent({...student,profileImage:res.data.name})
       }
     }).catch((err)=>{console.log(err)})
    }
   

  
  }
  const uploadFile = useRef(null)

  useEffect(() => {
    console.log(id)
    debugger
    axios
      .get('/api/student/student/' + id)
      .then(res => {
        setstudent(res.data.student)
        if (res.data.batches.length) {
          setBatch(res.data.batches[0])
        }
      })
      .catch(err => {
        console.log('Errore in getting student')
      })
  }, [id])
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <form method='post'>
              <CardHeader title='Profile'>
                <CardHeaderToolbar>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      history.push('/Student/StudentForm')
                    }}
                  >
                    New Student
                  </button>
                </CardHeaderToolbar>
              </CardHeader>
              <CardBody>
                <div class='row'>
                  <div class='col-md-4'>
                    <div class='profile-img'>
                      {
                        student.profileImage?(<img
                          src={toAbsoluteUrl(
                          `http://localhost:4000/uploads/Profiles/${student.profileImage}`
                          )}
                          alt=''
                        />):(<img
                        src={toAbsoluteUrl(
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog'
                        )}
                        alt=''
                      />)
                      }
                     
                      <div class='file btn btn-lg btn-primary'>
                        Change Photo
                        <input
                        onChange={uploadProfile}
                          ref={uploadFile}
                          type='file'
                          name='file'
                        />
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <Form.Label readOnly>Study Progress</Form.Label>
                      <ProgressBar variant='success' now={60} label='60%' />
                    </div>
                  </div>
                  <div class='col-md-8'>
                    <div class='profile-head'>
                      <h5>{student.name}</h5>
                      <h6>Web Developer and Designer</h6>
                    </div>
                    <div class='col-md-12'>
                      <div className='row'>
                        <button
                          type='button'
                          onClick={e => {
                            history.push('/Student/StudentForm/' + id)
                          }}
                          class='btn btn-primary col-md-3'
                          name='btnAddMore'
                          value='Edit Profile'
                        >
                          edit profile
                        </button>
                      </div>
                    </div>
                    <div className='separator separator-dashed mt-8 mb-5'></div>
                    <Form.Group className='row'>
                      <div className='col-md-6 StdPrfl'>
                        <Form.Label readOnly>{student.name}</Form.Label>
                      </div>
                      <div className='col-md-6 StdPrfl'>
                        <Form.Label readOnly>{student.email}</Form.Label>
                      </div>
                      <div className='col-md-6 StdPrfl'>
                        <Form.Label readOnly>{student.mobile}</Form.Label>
                      </div>
                      <div className='col-md-6 StdPrfl'>
                        <Form.Label readOnly>{batch.name}</Form.Label>
                      </div>
                      <div className='col-md-6 StdPrfl'>
                        <Form.Label readOnly>{student.createdAt}</Form.Label>
                      </div>
                    </Form.Group>
                  </div>
                  <div className='col-md-12'>
                    <div className='row'>
                      <div className='col-md-4'>
                        <Alert variant='success'>
                          <Alert.Heading>Hey, nice to see you</Alert.Heading>
                          <p>
                            Aww yeah, you successfully read this important alert
                            message. This example text is going to run a bit
                            longer so that you can see how spacing within an
                            alert works with this kind of content.
                          </p>
                        </Alert>
                      </div>
                      <div className='col-md-4'>
                        <Alert variant='success'>
                          <Alert.Heading>Hey, nice to see you</Alert.Heading>
                          <p>
                            Aww yeah, you successfully read this important alert
                            message. This example text is going to run a bit
                            longer so that you can see how spacing within an
                            alert works with this kind of content.
                          </p>
                        </Alert>
                      </div>
                      <div className='col-md-4'>
                        <Alert variant='success'>
                          <Alert.Heading>Hey, nice to see you</Alert.Heading>
                          <p>
                            Aww yeah, you successfully read this important alert
                            message. This example text is going to run a bit
                            longer so that you can see how spacing within an
                            alert works with this kind of content.
                          </p>
                        </Alert>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-12' style={{ display: 'none' }}>
                    <Tabs defaultActiveKey='profile'>
                      <Tab eventKey='home' title='Home'>
                        <div className='tab-item-wrapper'>
                          <h5>Home Dashbord</h5>
                          <p>
                            At vero eos et accusamus et iusto odio dignissimos
                          </p>
                        </div>
                      </Tab>

                      <Tab eventKey='profile' title='Profile'>
                        <div className='tab-item-wrapper'>
                          <h5>Profile Details</h5>
                          <p>
                            At vero eos et accusamus et iusto odio dignissimos
                          </p>
                        </div>
                      </Tab>

                      <Tab eventKey='contact' title='Contact'>
                        <div className='tab-item-wrapper'>
                          <h5>Contact Info</h5>
                          <p>
                            At vero eos et accusamus et iusto odio dignissimos
                          </p>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </CardBody>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
