import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export default function PermissionRoles () {
  const [Roles, setRoles] = useState()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    axios
      .get('/api/permission/roles')
      .then(result => {
        console.log("result here" , result , "end")
        setRoles(result.data)
      })
      .catch(err => {
        console.log(err)
      })
    // axios
    //   .get(`/api/permission/getRolesPermission/${id}`)
    //   .then(result => {
    //     console.log(result)
    //     setRoles(result.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }, [id])
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
                <tr>
                
                </tr>
                {Roles &&
                  Roles.length != 0 &&
                  Roles.map(item => (
                    <tr>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          history.push(`/permission/Role/${item.id}`)
                        }
                      >
                        <h4>{item.name}</h4>
                      </td>
                    
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
