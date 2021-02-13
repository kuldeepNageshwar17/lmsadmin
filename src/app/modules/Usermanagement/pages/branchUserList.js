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
import userActionFormatter from '../components/userActionFormatter'

import paginationFactory, {
  PaginationProvider
} from 'react-bootstrap-table2-paginator'
//   import BranchActionFormatter from '../components/branchActionFormatter'
import { permissionsContext } from '../../permissionManager/permissionContext'

function UserList (props) {
  const { isUserAuthenticate } = useContext(permissionsContext)

  const [Users, setUsers] = useState([])
  let history = useHistory()
  useEffect(() => {
    debugger
    axios
      .get('/api/staff/User')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const EditUser = id => {
    history.push('/user/BranchUserForm/' + id)
  }
  const DeleteUser = id => {
    debugger
    if (window.confirm('do you really want to delete')) {
      axios.delete('/api/staff/staff/' + id).then(res => {
        alert('deleted')
      })
    }
  }
  const InactiveteUser = id => {
    if (window.confirm('do you really  want to delete')) {
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
      text: 'Mobile',
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
        isUserAuthenticate
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
                {isUserAuthenticate('M3',2) && 
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      props.history.push('/user/BranchUserForm')
                    }}
                  >
                    New User
                  </button>
                }
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
