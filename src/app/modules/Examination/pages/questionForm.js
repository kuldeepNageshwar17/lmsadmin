import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import QuestionOptionForm from '../components/QuestionOptionForm'

export default function QuestionForm () {
  const [Question, setQuestion] = useState({
    question: '',
    options: [{ option: '', imagePath: '', isRight: false }],
    imagePath: ''
  })
  //   const [Classes, setClasses] = useState([])
  // const [Years, setYears] = useState([])

  let { id, qid } = useParams()
  let history = useHistory()
  useEffect(() => {
    debugger
    if (qid) {
      axios
        .get('/api/Examination/getQuestion/' + qid)
        .then(res => {
          debugger
          if (res.data) setQuestion(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [id, qid])
  useEffect(() => {
    debugger
    if (qid) {
      axios
        .get('/api/Examination/getQuestion/' + qid)
        .then(res => {
          setQuestion(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [qid])

  const saveQuestion = event => {
    event.preventDefault()
    debugger
    axios
      .post('/api/Examination/' + id + '/saveQuestion', Question)
      .then(res => {
        history.push('/Exams/' + id + '/ExamQuestion')
      })
      .catch(err => {
        console.log(err)
      })
  }
  const uploadFile = () => {
    return ''
  }
  const addNewOption = () => {
    debugger
    setQuestion({
      ...Question,
      options: Question.options.concat({
        option: '',
        imagePath: '',
        isRight: false,
        marks:""
      })
    })
  }
  const setIsRight = (value, index) => {
    debugger
    let option = Question.options
    option[index].isRight = value
    setQuestion({
      ...Question,
      options: option
    })
  }
  const setOptionvalue = (value, index) => {
    let option = Question.options
    option[index].option = value
    setQuestion({
      ...Question,
      options: option
    })
  }
  const setIamgeValue = (value, index) => {
    let option = Question.options
    option[index].imagePath = value
    setQuestion({
      ...Question,
      options: option
    })
  }
  const deleteOptionRow=(index)=>{
    let option = Question.options
    option.splice(index,1)
    setQuestion({
      ...Question,
      options: option
    })
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Form onSubmit={saveQuestion} className='form'>
            <Card>
              <Card.Body>
                <Form.Group controlId='formTitle' className='row'>
                  <div className='col-md-6'>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      required={true}
                      type='text'
                      placeholder='question'
                      value={Question.question}
                      onChange={event =>
                        setQuestion({
                          ...Question,
                          question: event.target.value
                        })
                      }
                    />
                    {/* <Form.Text className='text-muted'>Question Name</Form.Text> */}
                  </div>

                  <div className='col-md-6'>
                    <Form.Label>Question Image If Any </Form.Label>
                    <Form.Control
                      type='file'
                      name='question'
                      onChange={async event => {
                        var imagepath = await uploadFile(event.target.files)
                        setQuestion({ ...Question, imagePath: imagepath })
                      }}
                    />
                  </div>
                  <div className='col-md-6'>
                    <Form.Label>Marks</Form.Label>
                    <Form.Control
                      required={true}
                      type='Number'
                      placeholder='question'
                      value={Question.marks}
                      onChange={event =>
                        setQuestion({
                          ...Question,
                          marks: event.target.value
                        })
                      }
                    />
                    {/* <Form.Text className='text-muted'>Question Name</Form.Text> */}
                  </div>
                </Form.Group>


                {Question.options.map((item, index) => {
                  return (
                    <QuestionOptionForm
                      key={index}
                      option={item}
                      index={index}
                      setOptionvalue={setOptionvalue}
                      setIamgeValue={setIamgeValue}
                      setIsRight={setIsRight}
                      deleteOptionHandler={deleteOptionRow}

                    />
                  )
                })}

                <Button
                  variant='info'
                  size='sm'
                  type='button '
                  onClick={event => {
                    event.preventDefault()
                    addNewOption()
                  }}
                >
                  Add More Option
                </Button>
              </Card.Body>
              <Card.Footer>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        </div>
      </div>
    </div>
  )
}
