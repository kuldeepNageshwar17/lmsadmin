import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function ContentAddButton ( {sectionId,courseId}) {
  const history = useHistory()
  const [pop, setpop] = useState(false)
  const ButtonHandler=((type)=>{
      history.push("/setting/course/section/"+sectionId+"/content/"+type);
  })
  return (
    <div>
      {pop&&(
        <div class='btn-group' role='group' aria-label=''>
            <button type='button' class='btn btn-secondary' onClick={()=>{ButtonHandler("video")}}>
            Video
          </button>
          <button type='button' class='btn btn-secondary' onClick={()=>{ButtonHandler("pdf")}}>
            Pdf
          </button>
          <button type='button' class='btn btn-secondary' onClick={()=>{ButtonHandler("text")}}>
            Text
          </button>
        
          <button type='button' class='btn btn-secondary' onClick={()=>{ButtonHandler("audio")}}>
            Audio
          </button>
        </div>)
      }

      <button
        className='btn btn-primary pull-right'
        style={{ marginLeft: 'auto' }}
        onClick={e => {
          setpop(!pop)
        }}
      >
        add Content
      </button>
    </div>
  )
}
