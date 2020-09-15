import React, { Component } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import JoditEditor from 'jodit-react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';


export default class NewCourse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      _id: null,
      categories: null,
      rating: 0,
      numberOfRatings: 0,
      numberOfStudent: 0,
      title: '',
      Description: '',
      overview: '',
      timeInHours: "",
      timeInMinutes: "",
      posterImageUrl: "",
      file: ''
    }
    this.editor = React.createRef(null)
    this.uploadFile = this.uploadFile.bind(this)
    this.submitCourse = this.submitCourse.bind(this)
  }
  onChangeOverView = e => {
    debugger
    // console.log(this.editor.current)
    this.setState(state => ({
      overview: e.target.innerHTML
    }))
  }
  uploadFile = event => {
    console.log('uploding File')
  }
  submitCourse = event => {
    console.log('uploding File')
    axios
      .post('/api/course/course', this.state)
      .then(result => {
        this.props.history.push('/ecourse/courses')
      })
      .catch(err => {
        console.log(err)
      })

    event.preventDefault()
  }
  componentDidMount () {

    // const search = useLocation().search;

    const search = this.props.location.search;
    console.log(search);
    const id = new URLSearchParams(search).get("id");
    console.log("id", id);
    if (id) {
      axios.get("/api/course/course/"+id).then(response=>{
        this.setState({
          ...response.data
        }) 
      })
    
    }
  }
  render () {
    const config = {
      readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Card>
              <Card.Body>
                <Form onSubmit={this.submitCourse}>
                  <Form.Group controlId='formTitle'>
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Course Title'
                      value={this.state.title}
                      onChange={event =>
                        this.setState({ title: event.target.value })
                      }
                    />
                    <Form.Text className='text-muted'>
                      new course title.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId='formDesc'>
                    <Form.Label>Course Description</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Course Description'
                      value={this.state.Description}
                      onChange={event =>
                        this.setState({ Description: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId='formOverview'>
                    <Form.Label>Course Overview</Form.Label>
                    {/* <Form.Control type='text' placeholder='Course Overview' /> */}
                    <JoditEditor
                      ref={this.editor}
                      value={this.state.overview}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={this.onChangeOverView.bind(this)} // preferred to use only this option to update the content for performance reasons
                      //    onChange={newContent=>{ this.setState(state=>({overview: newContent.target.textContent}))}}
                    />
                  </Form.Group>

                  <Form.Group controlId='formThr'>
                    <Form.Label>Course Time(hours)</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Time in hours'
                      value={this.state.timeInHours}
                      onChange={event =>
                        this.setState({ timeInHours: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId='formTmin'>
                    <Form.Label>Course Time( minutes)</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Time in Minutes'
                      value={this.state.timeInMinutes}
                      onChange={event =>
                        this.setState({ timeInMinutes: event.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId='Image'>
                    <Form.Label>Course Description</Form.Label>
                    <Form.Control
                      type='file'
                      //   value={this.state.Description}
                      onChange={event =>
                        this.setState({ file: event.target.files[0] })
                      }
                    />
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
}
