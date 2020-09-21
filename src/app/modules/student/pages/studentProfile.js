import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../_metronic/_partials/controls'
import { useParams } from 'react-router-dom'

function StudentProfile ({ history }) {
  let { id } = useParams()
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title='Profile'>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                    history.push('/Student/StudentForm')
                  }}
                >
                  New Student
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
