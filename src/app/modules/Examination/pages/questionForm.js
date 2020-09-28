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
        isRight: false
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
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <Card.Body>
              <Form onSubmit={saveQuestion}>
                <Form.Group controlId='formTitle'>
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    placeholder='question'
                    value={Question.question}
                    onChange={event =>
                      setQuestion({ ...Question, question: event.target.value })
                    }
                  />
                  {/* <Form.Text className='text-muted'>Question Name</Form.Text> */}
                </Form.Group>
                <Form.Group controlId='formClass'>
                  <Form.Label>question Image If Any </Form.Label>
                  <Form.Control
                    type='file'
                    name='question'
                    onChange={async event => {
                      var imagepath = await uploadFile(event.target.files)
                      setQuestion({ ...Question, imagePath: imagepath })
                    }}
                  />

                  <Form.Text className='text-muted'> select File</Form.Text>
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
                    />
                  )
                })}

                <Button variant='primary' type='button ' onClick={ (event )=>{ event.preventDefault();addNewOption()}}>
                  add option
                </Button>
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
