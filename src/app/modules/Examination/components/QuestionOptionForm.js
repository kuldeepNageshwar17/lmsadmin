import React from 'react'
import { Form } from 'react-bootstrap'

export default function QuestionOptionForm ({
  option,
  index,
  setOptionvalue,
  setIamgeValue,
  setIsRight
}) {
  const handleFileChange = (files) => {
    setIamgeValue('', index)
  }
  return (
    <div>
      <Form.Group controlId='formTitle'>
        <Form.Label>option</Form.Label>
        <Form.Control
          className='col-md-6'
          required={true}
          type='text'
          placeholder='question'
          value={option.option}
          onChange={event => {
            setOptionvalue(event.target.value, index)
          }}
        />

        <Form.Label>Right Answer</Form.Label>
        <Form.Control
          className='col-md-6'
          type='checkbox'
          placeholder='question'
          checked= { JSON.parse(option.isRight)}
          onChange={event => {
              debugger;
            setIsRight(event.target.checked, index)
          }}
        />
        <Form.Label>File </Form.Label>
        <Form.Control
          className='col-md-6'
          type='file'
          placeholder='question'
        //   value={option.isRight}
          onChange={event => {
            handleFileChange(event.target.files)
          }}
        />
      </Form.Group>
    </div>
  )
}
