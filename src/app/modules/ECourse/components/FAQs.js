import React , {useEffect , useState ,useRef } from 'react'
import { Row, Col,Card  , Form , Button} from 'react-bootstrap'
import {useSelector} from "react-redux";
import axios from 'axios'
import {
  useParams,
  useHistory
} from 'react-router'
import JoditEditor from 'jodit-react'
export default function FAQs(){
  const {courseId} = useParams()
  const [faqs , setfaqs] = useState([])
  const [faq , setfaq]  = useState({
    question : "" , 
    answer : ""
  })
  const editor = useRef(null)
  const config = {
    defaultActionOnPaste: 'insert_as_html',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  const {user} = useSelector(state => state.auth);
  useEffect(() => {
    update()
  }, [])
  const update =() => {
    axios.get('/api/course/getFaq/' + courseId).then((res)=>{
       setfaqs(res.data)
    }).catch((res)=>{

    })
  }
  const saveAnnouncement =  async event => {
    event.preventDefault()
    debugger;
    await axios.post('/api/course/saveFaq/' + courseId , faq).then((res) => {
    }).catch((error) => {

    })
    setfaq({question : "" , answer : ""})
    update()

  }
  const handleAnnouncement = e => {
    setfaq({...faq, answer :  e.target.innerText })
  }
    return (
        <Card classNameName='col-md-12'>
          {user && faqs && faqs.length && (user._id ==  faqs[0].faq.createdBy[0]._id) && 
          <Form onSubmit={saveAnnouncement} className='form'>

            <Form.Group controlId='formTitle' className='row'>

      
      <div className='col-md-4'>
        <Form.Label>Question</Form.Label>
        <Form.Control
          required='true'
          type='text'
          placeholder='Test Name'
          value={faq.question}
          onChange={event =>
            setfaq({ ...faq, question: event.target.value })
          }
        />
      </div>
      <div className='col-md-12'>
        <Form.Label>Answer</Form.Label>
        <JoditEditor
            ref={editor}
            value={faq.answer}
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
}
        <Card.Header as='h5'>Frequently Asked Questions</Card.Header>
       {faqs && faqs.length && faqs.map((ele) => 
       
       <Card.Body>

          <Row>
            <Col>
              <div style={{ width: '80%' }}>
                <h3>{ele.faq.question}</h3>
                <p>
                  {ele.faq.answer}
                </p>
               
                <p>
                  Created by <b>{ele.faq.createdBy[0].name}</b> Last updated {ele.faq.createdAt.slice(0,10)}
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
       )}
      </Card>
    )
}
