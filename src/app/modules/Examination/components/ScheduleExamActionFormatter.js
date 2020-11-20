// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'

export default function ScheduleExamActionFormatter (
  cellContent,
  row,
  rowIndex,
  {  DeleteAction  , EditAction ,ChangeState}
) {

  // const  changeActiveState=(checked )=>{
  //   ChangeState(checked ,row.classes.examSchedule._id  ,row.classes._id)
  // }
  return (
    <>
    
    

    {/* <a
        title='ChangeActive'
        className='btn btn-icon btn-light btn-hover-primary btn-sm mx-3'
        onClick={() => EditActive(row._id)}
      >
        <span className='svg-icon svg-icon-md svg-icon-primary'>
          <SVG title='ChangeActive'
            src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
          />
        </span>
      </a> */}
      <div className='custom-control custom-switch' >
        {console.log("schedule",row.classes.examSchedule._id  , "class",row.classes._id)}
        <input
          // key={row.classes.examSchedule._id}
          type='checkbox'
           className='custom-control-input'
          id={row.classes.examSchedule._id }
          checked={row.classes.examSchedule.isActive}
          onClick={event=>ChangeState(event.target.checked ,row.classes.examSchedule._id  ,row.classes._id)}                   
        />
        <label className='custom-control-label' htmlFor={row.classes.examSchedule._id }>
        </label>
      </div>
      {/* <div className='custom-control custom-switch'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customSwitchesChecked'
          //onChange={(event)=>{ChangeState(event.target.checked)}}          
        />
       
      </div> */}


      <a
        title='ReSchedule'
        className='btn btn-icon btn-light btn-hover-primary btn-sm mx-3'
        onClick={() => EditAction(row.classes.examSchedule._id ,row.classes.name,
          row.classes.examSchedule.examId[0].name , row.classes.examSchedule.startDate ,
           row.classes.examSchedule.endDate  , row.classes._id , row.classes.examSchedule.examId[0]._id)}
      >
        <span className='svg-icon svg-icon-md svg-icon-primary'>
          <SVG title=' ReSchedule'
            src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
          />
        </span>
      </a>
      <a
        title='Delete Question'
        className='btn btn-icon btn-light btn-hover-danger btn-sm'
        onClick={() => DeleteAction(row.classes.examSchedule.isActive , row.classes.examSchedule._id ,row.classes.examSchedule.examId[0]._id, row.classes.examSchedule.startDate ,
          row.classes.examSchedule.endDate ,row.classes._id  )}
      >
        <span className='svg-icon svg-icon-md svg-icon-danger'>
          <SVG  src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} title='Delete 
          Exam' />
        </span>
      </a>
    </>
  )
}
