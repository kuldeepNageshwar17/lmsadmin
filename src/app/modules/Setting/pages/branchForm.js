import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Col ,ListGroup ,Dropdown } from 'react-bootstrap'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../_metronic/_partials/controls'
import { useHistory } from 'react-router-dom'

export default function BranchForm () {
  const [Branch, setBranch] = useState( { id:null,name: '',  address: { address: '',pincode : "" ,  city: '', state: '' } }
  )
  const [postal , setPostal] = useState()
  const [postalError , setPostalError] = useState()
  let { id } = useParams()
  let history = useHistory()
  useEffect(() => {

    debugger;
    if(id){
      axios
      .get('/api/branch/branch/' + id)
      .then(res => {
        setBranch(res.data)
      })
      .catch(err => {
        console.log(err)
        return {}
      })
    }
  }, [id , Branch.address.state])

  const saveBranchData = event => {
    event.preventDefault()
    debugger
    axios
      .post('/api/branch/branch', Branch)
      .then(res => {
        history.push('/setting/Branch')
      })
      .catch(err => {
        console.log(err)
      })
  }
  const getAddress = (pincode) => {
 
   
    axios.get(`api/branch/getPostalAddress/${pincode}`).then((res)=>{
     
    if(res.data[0].Status == 'Error'){
      setPostalError(`${res.data[0].Message} : Give Correct PinCode`)
      setPostal("") 
    }else{
      setPostalError('')
      setPostal(res.data[0].PostOffice)
    }
    }).catch((error) => {

    })

  }
  
  const selectPostalName = (name  , District , state) => {
    setBranch({
      ...Branch,
      address: {...Branch.address, division : name ,  city: District  , state : state  }
      
    }) 
  }
  

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
          <CardHeader title='Add Branch'>
            
         </CardHeader>
            <CardBody>
              <Form onSubmit={saveBranchData}>
                <Form.Group controlId='formTitle' className="row">
                  <Col><Form.Label>Branch Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Branch Name'
                    required
                    value={Branch.name}
                    onChange={event =>
                      setBranch({ ...Branch, name: event.target.value })
                    }
                  /></Col>
                  <Col><Form.Label>PinCode</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Postal Code'
                    required
                    value={Branch.address.pincode}
                    onChange={event =>{
                      setBranch({ ...Branch,
                        address: {
                        ...Branch.address,
                        pincode: event.target.value
                      } })
                      if(event.target.value.length >= 6){
                        getAddress(event.target.value)
                      }
                    }}
                  />
                  {postalError && <Form.Text style={{color : 'red'}}>{postalError}</Form.Text>}
                  
                 {postal && postal.length  && 
                 <Dropdown>
                 <Dropdown.Toggle variant="success" id="dropdown-basic">
                   Select Division
                 </Dropdown.Toggle>
               
                 <Dropdown.Menu>
                  
                 
                 {postal && postal.length  && postal.map((single => {
                   return <Dropdown.Item key={single.Name}  onClick ={() =>  selectPostalName(single.Name , single.District , single.State) }>{single.Name}</Dropdown.Item>
                         
                 })) 
                  } 
                   </Dropdown.Menu>
               </Dropdown>}</Col>
                  {postal && console.log(postal)}
                  <Col><Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder=' street  address  / house number /shop number /'
                    value={Branch.address.address}
                    onChange={event =>
                      setBranch({
                        ...Branch,
                        address: {
                          ...Branch.address,
                          address: event.target.value
                        }
                      })
                    }
                  /></Col>
                </Form.Group>
                
                <Form.Group controlId='city' className="row">
                  <Col><Form.Label>Division </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='city'
                    value={Branch.address.division}
                  /></Col>
                  </Form.Group>
                <Form.Group controlId='city' className="row">
                  <Col><Form.Label>city </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='city'
                    value={Branch.address.city}
                   
                  /></Col>
                  <Col><Form.Label>state </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='state'
                    value={Branch.address.state}
                    
                  /></Col>
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
