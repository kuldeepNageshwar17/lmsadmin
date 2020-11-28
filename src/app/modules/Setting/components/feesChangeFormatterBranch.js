// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState , useEffect } from 'react' 
import SVG from 'react-inlinesvg'

import { toAbsoluteUrl } from '../../../../_metronic/_helpers'

export default function FeesChangeActionFormatter ({
  cellContent,
  row,
  rowIndex,
  updateFees
}) {
  const [IsInput, setIsInput] = useState(false)
  const [feesValue, setFeesValue] = useState(cellContent)
  const Edit = () => {
    setIsInput(true)
  }
  const save = () => {
    updateFees(row._id, feesValue , row.name , row.fees)
    setIsInput(false)
  }
  
    useEffect(() => {
      debugger;
    }, [feesValue])
  
  

  return (
    <>
      {IsInput && (
        <>
           <button onClick={save} className={'btn btn-success'} style={{"display":"inline"}}>
            save
          </button>
          <input
            // value= {feesValue}
            placeholder={`${row.fees} Give New Amount`}
            onChange={event => {
              setFeesValue(event.target.value)
              
            }}
          />
       
        </>
      )}
      {!IsInput && (
        <>
          <div>
          <button onClick={Edit} className={'btn btn-primary '} style={{"display":"inline"}}>
              edit
            </button>
            {row.fees}
            
          </div>
        </>
      )}
    </>
  )
}
