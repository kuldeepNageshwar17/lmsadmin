// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'

export default function ExamActionFormatter (
  cellContent,
  row,
  rowIndex,
  { EditAction, DeleteAction,ShowQuestions }
) {
  return (
    <>



    <a
        title='Add Questions'
        className='btn  btn-light btn-hover-success btn-sm mx-3'
        onClick={() => ShowQuestions(row._id)}
      >
       <span className="svg-icon svg-icon-md svg-icon-primary">          
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Navigation/Plus.svg")}
          />
        </span>Questions
      </a>

      <a
        title='Edit Exam'
        className='btn btn-icon btn-light btn-hover-primary btn-sm mx-3'
        onClick={() => EditAction(row._id)}
      >
        <span className='svg-icon svg-icon-md svg-icon-primary'>
          <SVG title='Edit Exam'
            src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
          />
        </span>
      </a>

      <a
        title='Delete Question'
        className='btn btn-icon btn-light btn-hover-danger btn-sm'
        onClick={() => DeleteAction(row._id)}
      >
        <span className='svg-icon svg-icon-md svg-icon-danger'>
          <SVG  src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} title='Delete 
          Exam' />
        </span>
      </a>
    </>
  )
}
