import React from 'react'
import { Card, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function Permissions () {
  const history = useHistory()
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <Card.Header title='Examinations'>
              <Card.Title></Card.Title>
            </Card.Header>
            <Card.Body>
              <Table>
                <tr>
                  <td></td>
                </tr>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
