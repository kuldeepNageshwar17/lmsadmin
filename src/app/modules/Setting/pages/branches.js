import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

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
import BranchActionFormatter from '../components/branchActionFormatter'

export default function Branches (props) {
  const [Branches, setBranches] = useState(null)

  let history = useHistory()
  const EditBranchHandler = (id) => {
    history.push('/setting/branchForm/' + id)
  }
  const DeleteBranchHandler = (id) => {
    if (window.confirm('do you really  want to delete')) {
      debugger;
      axios
        .post('/api/Branch/deleteBranch', { id })
        .then(res => {console.log(res) })
        .catch(() => {})
        updateData()
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
      text: 'Class',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'address.address',
      text: 'address',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'address.city',
      text: 'city',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: BranchActionFormatter,
      formatExtraData: {
        EditBranchAction: EditBranchHandler,
        DeleteBranchAction: DeleteBranchHandler
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    }
  ]
 const  updateData  = () => {
    debugger
    axios
      .get('/api/Branch/Branch')
      .then(res => {
        setBranches(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    updateData()
  }, [])

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title='Branch list'>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                    props.history.push('/setting/BranchForm')
                  }}
                >
                  New Branch
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {Branches ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={Branches}
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
