import React from 'react'
 
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../_metronic/_partials/controls'
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import { Tabs, Tab, Button, Form, } from 'react-bootstrap';

import { useParams } from 'react-router-dom'

function StudentProfile ({ history }) {
  let { id } = useParams()
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
          <form method="post">
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
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={toAbsoluteUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog")} alt=""/>
                            <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-md-8">
                        <div class="profile-head">
                                    <h5>
                                        Kshiti Ghelani
                                    </h5>
                                    <h6>
                                        Web Developer and Designer
                                    </h6> 
                            
                        </div>
                        <div class="col-md-12"><div className="row">
                        <input type="submit" class="btn btn-primary col-md-3" name="btnAddMore" value="Edit Profile"/>
                    </div></div>
                    <div className="separator separator-dashed mt-8 mb-5"></div>
                    <Form.Group className='row'>
<div className='col-md-6 StdPrfl'>
<Form.Label readOnly>Student Name</Form.Label>
</div>
<div className='col-md-6 StdPrfl'>
<Form.Label readOnly>Email</Form.Label> 
</div>
<div className='col-md-6 StdPrfl'>
<Form.Label readOnly>Phone No</Form.Label> 
</div>
<div className='col-md-6 StdPrfl'>
<Form.Label readOnly>Subjects</Form.Label> 
</div>
<div className='col-md-6 StdPrfl'>
<Form.Label readOnly>Join Date</Form.Label> 
</div>
       </Form.Group>
        
      </div>
      
          <div className="col-md-12" style={{display: 'none' }}>

            <Tabs defaultActiveKey="profile">
              <Tab eventKey="home" title="Home">
                <div className="tab-item-wrapper">
                  <h5>Home Dashbord</h5>
                  <p>At vero eos et accusamus et iusto odio dignissimos</p>
                </div>
              </Tab>

              <Tab eventKey="profile" title="Profile">
                <div className="tab-item-wrapper">
                  <h5>Profile Details</h5>
                  <p>At vero eos et accusamus et iusto odio dignissimos</p>
                </div>
              </Tab>

              <Tab eventKey="contact" title="Contact">
                <div className="tab-item-wrapper">
                  <h5>Contact Info</h5>
                  <p>At vero eos et accusamus et iusto odio dignissimos</p>
                </div>
              </Tab>
            </Tabs>
 
        </div>
    </div>
                        
                
                    
     
            </CardBody></form>   
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
