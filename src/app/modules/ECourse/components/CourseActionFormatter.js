// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'

export default function CourseActionFormatter (
  cellContent,
  row,
  rowIndex,
  { EditAction, DeleteAction, GetSectionsAction ,AddCourseTestAction }
) {
  return (
    <>
    {/* <a
        title='Add Test'
        className='btn  btn-light btn-hover-primary btn-sm mx-3'
        onClick={() => AddCourseTestAction(row._id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">          
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Navigation/Plus.svg")} title='Add Test'
          />
        </span> Test
      </a> */}
      <a
        title='Add Content'
        className='btn  btn-light btn-hover-primary btn-sm mx-3'
        onClick={() => GetSectionsAction(row.courses._id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">          
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Navigation/Plus.svg")} title='Show Content'
          />
        </span> Course Overview
      </a>

      {/* <a
        title='Edit Branch'
        className='btn btn-icon btn-light btn-hover-primary btn-sm mx-3'
        onClick={() => EditAction(row._id)}
      >
        <span className='svg-icon svg-icon-md svg-icon-primary'>
          <SVG title='Edit Course'
            src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
          />
        </span>
      </a> */}

      {/* <a
        title='Delete Branch'
        className='btn btn-icon btn-light btn-hover-danger btn-sm'
        onClick={() => DeleteAction(row._id)}
      >
        <span className='svg-icon svg-icon-md svg-icon-danger'>
          <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} title='Delete Course' />
        </span>
      </a> */}
    </>
  )
}
