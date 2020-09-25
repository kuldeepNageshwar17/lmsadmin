import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
import CourseActionFormatter from '../components/CourseActionFormatter'
import CourseProfileFormater from '../components/CourseProfileFormater'


import { useHistory } from 'react-router-dom'


export default function Courses (props) {
  const { id } = useParams()
  const history = useHistory()
  const EditHandler = cid => {
    history.push('/setting/CourseForm/' + id + '?cid/' + cid)
  }

  const DeleteHandler = cid => {
    if (window.confirm('do you really  want to delete')) {
      //   axios
      //     .delete('/branch/class', { id: id })
      //     .then(res => {})
      //     .catch(() => {})
    }
  }

  const CourseContenHandler = id =>{
    debugger;
    history.push("/setting/course/"+id+"/sections")

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
      dataField: 'title',
      text: 'Course',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'Description',
      text: 'Description',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'posterImageUrl',
      text: 'Image',
      formatter: CourseProfileFormater,     
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: CourseActionFormatter,
      formatExtraData: {
        EditClassAction: EditHandler,
        DeleteClassAction: DeleteHandler,
        GetSectionsAction:CourseContenHandler
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    }
  ]

  const [Courses, setCourse] = useState([])
  useEffect(() => {
    debugger
    axios
      .get('/api/course/courseList/' + id)
      .then(res => {
        debugger
        setCourse(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title='course list'>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                    history.push('/setting/CourseForm/' + id)
                  }}
                >
                  New course
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
            {Courses ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={Courses}
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

{/* 
              {Courses ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={Courses}
                        columns={columns}
                        // classes='table table-head-custom table-vertical-center overflow-hidden'
                        // wrapperClasses='table-responsive'
                        // bootstrap4
                        // remote
                        // bordered={false}
                        // pagination={paginationFactory(options)}
                        // {...paginationTableProps}
                      />
                    )
                  }}
                </PaginationProvider>
              ) : (
                <div>No data Available</div>
              )} */}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
