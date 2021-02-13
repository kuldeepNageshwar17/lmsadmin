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
    history.push('/setting/CourseForm/' + id + '/' + cid)
  }

  const DeleteHandler = id => {
    debugger;
    if (window.confirm('do you really  want to delete')) {
        axios.delete('/api/course/course/'+ id).then(res => {}).catch(() => {})
        updateData()
    }
  }

  const CourseContenHandler = id =>{
    debugger;
    history.push("/setting/course/"+id+"/sections")

  }
  const AddCourseTestHandler = id =>{
    history.push("/Test/CourseTest/" + id + "/tests")
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
      dataField: 'courses._id',
      text: 'ID',
      hidden: true
    },
    {
      dataField: 'courses.title',
      text: 'Course',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'courses.Description',
      text: 'Description',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'courses.posterImageUrl',
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
        EditAction: EditHandler,
        DeleteAction: DeleteHandler,
        GetSectionsAction:CourseContenHandler,
        AddCourseTestAction : AddCourseTestHandler
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '220px'
      }
    }
  ]

  // const [Courses, setCourse] = useState([])
  const [Class, setClass] = useState([])
  const updateData = () => {
    debugger
    axios
      .get('/api/course/courseList/' + id)
      .then(res => {
        debugger
        console.log('data here 1' , res.data)
        setClass(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    updateData()
  }, [id])
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title={`Course list -> ${Class && Class.length > 0 && Class[0].name}`}>
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
            {Class && Class.length ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={Class}
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
