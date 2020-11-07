import React  , {useEffect,  useRef , useState} from 'react'
import { Row, Col,Card ,Button  , Form } from 'react-bootstrap'
import axios from 'axios'
import JoditEditor from 'jodit-react'
import {
  useParams,
  useHistory
} from 'react-router'
export default function Announcement({ id}){
const [announcement , setannouncement]  = useState({
  title : "" , 
  Description : ""
})
const [announcements , setannoucements] = useState()

  const editor = useRef(null)
  const config = {
    defaultActionOnPaste: 'insert_as_html',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  const {courseId} = useParams()
  useEffect(() => {
    update()
  }, [])
  const update =() => {
    axios.get('/api/course/getAnnouncement/' + courseId).then((res)=>{
      setannoucements(res.data)
    }).catch((res)=>{

    })
  }
  const handleAnnouncement = e => {
    setannouncement({...announcement,Description :  e.target.innerText })
  }

  const saveAnnouncement =  async event => {
    event.preventDefault()
    debugger;
    await axios.post('/api/course/saveAnnouncement/' + courseId , announcement).then((res) => {
    }).catch((error) => {

    })
    setannouncement({title : "" , Description : ""})
    update()

  }
    return (
        <Card classNameName='col-md-12'>
          {/* { (id == )} */}
          <Form onSubmit={saveAnnouncement} className='form'>

            <Form.Group controlId='formTitle' className='row'>

                  
                  <div className='col-md-4'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      required='true'
                      type='text'
                      placeholder='Test Name'
                      value={announcement.title}
                      onChange={event =>
                        setannouncement({ ...announcement, title: event.target.value })
                      }
                    />
                  </div>
                  <div className='col-md-12'>
                    <Form.Label>Description</Form.Label>
                    <JoditEditor
                        ref={editor}
                        value={announcement.Description}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={handleAnnouncement} // preferred to use only this option to update the content for performance reasons
                      />
                  </div>
                  </Form.Group>

                  <Button variant='primary' type='submit'>
                    Submit
                        </Button>
          </Form>
          
            
        <Card.Header as='h5'>Announcements</Card.Header>
        <Card.Body>
          <Row>
            <Col>
            {console.log("id" , id)}
            {announcements && announcements.length && announcements.map((element) => 
                
              <div style={{ width: '80%' }} key={element.announcement._id}>
                
                <h3>{element.announcement.title}</h3>
                <p>
                  {element.announcement.Description}
                </p>
               
                <p>
                  Created at {element.announcement.createDate.slice(0, 10)}
                </p>
              </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}
