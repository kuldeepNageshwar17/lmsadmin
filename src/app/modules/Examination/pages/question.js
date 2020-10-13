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
              <div className='qstnOpt'>
                {/* <h3>Question</h3> */}
                <div className='qstnTtl'>{question.question}</div>
                <h3>Options</h3>
                <div className='row'>
                  {question.options &&
                    question.options.map(item => (
                      <>
                        <div className='mb-3 mt-3 col-4'> 
                        <Form.Check
            label={item.option}
            type='checkbox'
            placeholder='question'
            disabled
                          checked={JSON.parse(item.isRight)}
          /></div>
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
