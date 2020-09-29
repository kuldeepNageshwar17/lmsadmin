import React from 'react'
import { Form } from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
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
    <div className='addMoreBrd'>
      <Form.Group controlId='formTitle' className='row'>
        <div className='col-md-6'>
        <Form.Label>Option</Form.Label>
        <Form.Control
          
          required={true}
          type='text'
          placeholder='question'
          value={option.option}
          onChange={event => {
            setOptionvalue(event.target.value, index)
          }}
        /></div>
<div className='col-md-2'>
<Form.Label>Right Answer</Form.Label>
<Form.Check label="Do not check if it is wrong Answer" checked={option.isRight} 
          type='checkbox'
          placeholder='question'
           checked= { JSON.parse(option.isRight)}
          onChange={event => {
              debugger;
            setIsRight(event.target.checked, index)
          }} />
  </div>

        <div className='col-md-3'>
        <Form.Label>File </Form.Label>
        <Form.Control 
          type='file'
          placeholder='question'
        //   value={option.isRight}
          onChange={event => {
            handleFileChange(event.target.files)
          }}
        /></div>
          <div className='col-md-1 mt-3'>
  <a
        title='Delete Option'
        className='btn btn-icon btn-danger btn-hover-secondary btn-sm mx-3' 
      >
        <span className='svg-icon svg-icon-md svg-icon-light'>
          <SVG  src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} title='Delete Option' />
        </span>
      </a>
  </div>
      </Form.Group>
    </div>
  )
}
