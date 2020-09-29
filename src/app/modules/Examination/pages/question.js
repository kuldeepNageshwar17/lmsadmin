import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../_metronic/_partials/controls'
import { Form } from 'react-bootstrap'

export default function Question () {
  const history = useHistory()
  const { id } = useParams()
  const [question, setQuestion] = useState({})
  useEffect(() => {
    debugger
    axios
      .get('/api/Examination/getQuestion/' + id)
      .then(res => {
        setQuestion(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title='Exam Question'>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                    history.push('/Exams/' + id + '/QuestionForm/')
                  }}
                >
                  add Question
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              <div>
                <h3>Question</h3>
                <div>{question.question}</div>
                <h3>options</h3>
                <div>
                  {question.options &&
                    question.options.map(item => (
                      <>
                        <div>{item.option}</div>
                        <Form.Label></Form.Label>
                        <Form.Control
                          className='col-md-6'
                          type='checkbox'
                          placeholder='question'
                          disabled
                          checked={JSON.parse(item.isRight)}
                        />
                      </>
                    ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
