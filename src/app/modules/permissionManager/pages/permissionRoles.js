import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function PermissionRoles () {
  const [Roles, setRoles] = useState()

  useEffect(() => {
    axios
      .get('/roles')
      .then(result => {
        setRoles(result)
      })
      .catch(err => {
        console.log(err)
      })
  })
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <Card.Header title='Examinations'>
              <Card.Title></Card.Title>
            </Card.Header>
            <Card.Body>
              <h1>Roles</h1>
              <Table>
                {Roles &&
                  Roles.length &&
                  Roles.map(() => (
                    <tr>
                      <td>Roles</td>
                    </tr>
                  ))}
              </Table>
            </Card.Body>
          </Card> 
        </div>
      </div>
    </div>
  )
}
