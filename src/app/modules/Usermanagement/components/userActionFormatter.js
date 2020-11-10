// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'

import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'

export default function UserActionFormatter (
  cellContent,
  row,
  rowIndex,
  { EditUserAction, DeleteUserAction,isUserAuthenticate }
) {

  return (
    <>
      {isUserAuthenticate('M3', 3) && (
        <a
          title='Edit Branch details'
          className='btn btn-icon btn-light btn-hover-primary btn-sm mx-3'
          onClick={() => EditUserAction(row._id)}
        >
          <span className='svg-icon svg-icon-md svg-icon-primary'>
            <SVG
              src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
            />
          </span>
        </a>
      )}

      <> </>

      {isUserAuthenticate('M3', 4) && (
        <a
          title='Delete Branch '
          className='btn btn-icon btn-light btn-hover-danger btn-sm'
          onClick={() => DeleteUserAction(row._id)}
        >
          <span className='svg-icon svg-icon-md svg-icon-danger'>
            <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
          </span>
        </a>
      )}
    </>
  )
}
