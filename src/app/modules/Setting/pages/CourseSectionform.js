import React, { useState ,useEffect} from 'react'
import { Button,Form, Card } from 'react-bootstrap'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'


export default function CourseSectionForm () {
  const { id } = useParams()
  const { cid } = useParams()
  const history = useHistory()
  const [section, setSection] = useState({
    courseId: cid,
    name: '',
    timeInHours: '',
    timeInMinutes: '',
    order: ''
  })
useEffect(()=>{
  if(id){
    axios.get("/api/Course/courseSection/"+id).then((res)=>{
      debugger;
      setSection(res.data)
    }).catch((err)=>{
console.log(err);
    })
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  // const uploadFile = async () => {}
  const Savesection = async(e)=> {
      debugger;
      e.preventDefault();
    axios
      .post('/api/Course/courseSection', section)
      .then((res) => {
        history.push(history.push('/setting/course/' + cid + '/sections'))
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <Form onSubmit={Savesection} className='form'>
              <Card.Body>
                <Form.Group>
                  <Form.Label>section Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Section Title'
                    value={section.name}
                    onChange={event =>
                      setSection({ ...section, name: event.target.value })
                    }
                  />

                  <Form.Label>Time in Hours</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Time in hours'
                    value={section.timeInHours}
                    onChange={event =>
                      setSection({
                        ...section,
                        timeInHours: event.target.value
                      })
                    }
                  />

                  <Form.Label>Time in Minutes</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Time in minutes'
                    value={section.timeInMinutes}
                    onChange={event =>
                      setSection({
                        ...section,
                        timeInMinutes: event.target.value
                      })
                    }
                  />

                  <Form.Label>section order</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='order'
                    value={section.order}
                    onChange={event =>
                      setSection({ ...section, order: event.target.value })
                    }
                  />
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Card.Footer>
            </Form>
          </Card>
        </div>
      </div>
   </> 
  )
}
