import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../_metronic/_partials/controls'
import { sortCaret, headerSortingClasses } from '../../../../_metronic/_helpers'
import BootstrapTable from 'react-bootstrap-table-next'

import paginationFactory, {
  PaginationProvider
} from 'react-bootstrap-table2-paginator'
import userActionFormatter from '../components/userActionFormatter'

import { permissionsContext } from '../../permissionManager/permissionContext'

//   import BranchActionFormatter from '../components/branchActionFormatter'

function UserList (props) {
  const [Users, setUsers] = useState([])
  const { isUserAuthenticate } = useContext(permissionsContext)
  let history = useHistory()
  const update = () => {
    debugger
    axios
      .get('/api/staff/InstituteUser')
      .then(res => {
        setUsers(res.data)        
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    update()
  }, [])

  const EditUser = id => {
    history.push('/user/userForm/' + id)
  }
  const DeleteUser = id => {
    debugger
    if (window.confirm('do you really want to delete')) {
      alert('deleted')
      axios.delete('/api/staff/staff/' + id).then(res => {
        alert('deleted')
      })
      update()
    }
  }

  const options = {
    onSizePerPageChange: (sizePerPage, page) => {
      console.log('Size per page change!!!')
      console.log('Newest size per page:' + sizePerPage)
      console.log('Newest page:' + page)
    },
    onPageChange: (page, sizePerPage) => {
      console.log('Page change!!!')
      console.log('Newest size per page:' + sizePerPage)
      console.log('Newest page:' + page)
    }
  }

  const columns = [
    {
      dataField: '_id',
      text: 'ID',
      hidden: true
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'mobile',
      text: 'Contact',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: userActionFormatter,
      formatExtraData: {
        EditUserAction: EditUser,
        DeleteUserAction: DeleteUser,
        isUserAuthenticate:isUserAuthenticate
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    }
  ]

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title='Users'>
              <CardHeaderToolbar>
                {isUserAuthenticate('M3', 1) && (
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      props.history.push('/user/UserForm')
                    }}
                  >
                    New User
                  </button>
                )}
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {Users ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={Users}
                        columns={columns}
                        classes='table table-head-custom table-vertical-center overflow-hidden'
                        wrapperClasses='table-responsive'
                        bootstrap4
                        remote
                        bordered={false}
                        pagination={paginationFactory(options)}
                        {...paginationTableProps}
                      />
                    )
                  }}
                </PaginationProvider>
              ) : (
                <div>loading</div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UserList
