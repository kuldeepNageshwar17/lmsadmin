// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'

export default function TestActionFormatter (
  cellContent,
  row,
  rowIndex,
  { EditAction, DeleteAction,ShowQuestion}
) {
  return (
    <>
    <a
        title='Show question'
        className='btn  btn-light btn-hover-primary btn-sm mx-3'
        onClick={() =>{ debugger; ShowQuestion(row._id)}}
      >
        <span className='svg-icon svg-icon-md svg-icon-primary'>
          <SVG title='Show Question'
            src={toAbsoluteUrl('/media/svg/icons/Design/adjust.svg')}
            />
        </span>
        show
      </a>

      <a
        title='Edit Question'
        className='btn btn-icon btn-light btn-hover-primary btn-sm mx-3'
        onClick={() =>EditAction(row._id)}
      >
        <span className='svg-icon svg-icon-md svg-icon-primary'>
          <SVG title='Edit Question'
            src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
          />
        </span>
      </a>

      <a
        title='Delete Question'
        className='btn btn-icon btn-light btn-hover-danger btn-sm'
        onClick={() =>DeleteAction(row._id)}
      >
        <span className='svg-icon svg-icon-md svg-icon-danger'>
          <SVG  src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} title='Delete 
          Question' />
        </span>
      </a>
    </>
  )
}
