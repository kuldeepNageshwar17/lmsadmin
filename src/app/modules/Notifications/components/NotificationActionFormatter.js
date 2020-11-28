// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { Button } from 'react-bootstrap'
export default function NotificationActionFormatter (
  cellContent,
  row,
  rowIndex,
  {  ApproveClassAction , RejectClassAction}
) {

  return (
    <>

      { row.changeRequest.status == "Pending" && <a
        title='ReSchedule'
        // className='btn btn-icon btn-light btn-hover-primary btn-sm mx-3'
        onClick={() => ApproveClassAction(row.changeRequest._id , row.changeRequest.entityId ,
           row.changeRequest.requestedFees , row.changeRequest.requestType
          )}
      >
        <span className='svg-icon svg-icon-md svg-icon-primary'>
          {/* <SVG title=' ReSchedule'
            src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
          /> */}
          <Button>Approved</Button>
        </span>
      </a>
}
      { row.changeRequest.status == "Pending" &&  <a
        title='Delete Question'
        // className='btn btn-icon btn-light btn-hover-danger btn-sm'
        onClick={() => RejectClassAction(row.changeRequest._id , row.changeRequest.entityId ,
          row.changeRequest.requestedFees , row.changeRequest.requestType
         )}
      >
        <span className='svg-icon svg-icon-md svg-icon-danger'>
          {/* <SVG  src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} title='Delete 
          Exam' /> */}
          <Button>Reject</Button>
        </span>
      </a>
}
    </>
  )
}
