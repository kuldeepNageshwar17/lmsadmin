import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
export default function Permissions () {
  const history = useHistory()
  const { id } = useParams()
  const [Modules, setModules] = useState([])
  const [Permissions, setPermission] = useState([])
  const [Role, setRole] = useState()
  useEffect(() => {
    axios
      .get('/api/permission/getModules')
      .then(res => {
        setModules(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      getRolePermissions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getRolePermissions=()=>{
    axios
    .get(`/api/permission/getRolesPermission/${id}`)
    .then(res => {
      debugger;
      if(res.data.length>0){
        setPermission(res.data[0].permissions)
        setRole(res.data[0])
      }
      console.log(res.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
  const postPermission = (module, permission, Checked) => {
    debugger
    console.log(module, permission, Checked)
    if (Checked) {
      axios
        .post('/api/permission/setPermission', { module, permission, id })
        .then(res => {
          // setModules(res.data)
          getRolePermissions();
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (!Checked) {
      axios
        .post('/api/permission/unsetPermission', { module, permission,id })
        .then(res => {
          // setModules(res.data)
          getRolePermissions();
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const CheckPermissionInputCheck = (module, permission) => {
    console.log(module, permission)
    if (Permissions)
      return Permissions.some(
        m => m.module === module && m.permission === permission
      )
    else return false
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <Card.Header title='Examinations'>
              <Card.Title>Roles Permissions</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table>
                <tbody>
                <tr>
                  <th>Modules</th>
                  <th>READ(1)</th>
                  <th>WRITE(2)</th>
                  <th>EXECUTE(4)</th>
                </tr>
                {Modules &&
                  Modules.length > 0 &&
                  Modules.map(item => (
                    <tr key={item.key}>
                      <td>{item.module} {`(${item.id})`}</td>
                      <td>
                        <input
                          type='checkbox'
                          checked={CheckPermissionInputCheck(item.id, 1)}
                          onClick={event => {
                            postPermission(item.id, 1, event.target.checked)
                          }}
                        ></input>
                      </td>
                      <td>
                        <input
                          type='checkbox'
                          checked={CheckPermissionInputCheck(item.id, 2)}
                          onClick={event =>
                            postPermission(item.id, 2, event.target.checked)
                          }
                        ></input>
                      </td>
                      <td>
                        <input
                          type='checkbox'
                          checked={CheckPermissionInputCheck(item.id, 3)}
                          onClick={event =>
                            postPermission(item.id, 3, event.target.checked)
                          }
                        ></input>
                      </td>
                    </tr>
                  ))}
                  </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
