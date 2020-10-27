import React from 'react'
import { Card, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function permissionRoles () {
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
                  <td>Roles List</td>
                </tr>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
