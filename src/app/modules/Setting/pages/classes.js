import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
import ClassActionFormatter from '../components/classActionFormatter'

export default function Classes (props) {
  const EditClassHandler = id => {
    props.history.push('/setting/classForm/' + id)
  }

  const DeleteClassHandler = id => {
    if (window.confirm('do you really  want to delete')) {
      axios
        .delete('/api/branch/class/'+id )
        .then(res => {
          updateData()
        })
        .catch(() => {})
    }
  }
 const getCoursesHandler=id=>{
  props.history.push('/setting/Courses/' + id)
  }
  const ChangeDescription = (cellContent) => {
        return <div  dangerouslySetInnerHTML={{    __html: cellContent }}></div>
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
      dataField: 'description',
      text: 'Description',
      sort: true,
      formatter : ChangeDescription,
      sortCaret: sortCaret,
      headerSortingClasses
    },

    {
      dataField: 'action',
      text: 'Actions',
      formatter: ClassActionFormatter,
      formatExtraData: {
        EditClassAction: EditClassHandler,
        DeleteClassAction: DeleteClassHandler,
        getCoursesAction:getCoursesHandler
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '250px'
      }
    }
  ]
  const updateData=()=>{
    debugger
    axios
      .get('/api/Branch/classes')
      .then(res => {
        console.log(res.data)
        setClasses(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [Classes, setClasses] = useState(null)
  useEffect(() => {
    updateData()
  }, [])

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title='All Class'>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                    props.history.push('/setting/classForm')
                  }}
                >
                  New Class
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {Classes ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={Classes}
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
