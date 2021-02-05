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
import UserCourseActionFormatter from '../components/UserCourseActionFormatter'
import UserCourseProfileFormater from '../components/UserCourseProfileFormater'


import { useHistory } from 'react-router-dom'


export default function UserCourses (props) {
  const { id } = useParams()
  const history = useHistory()
  const EditHandler = cid => {
    history.push('/setting/UserCourseForm/' + cid)
  }

  const DeleteHandler = id => {
    debugger;
    if (window.confirm('do you really  want to delete !')) {
        axios.get(`/api/course/UserdeleteCourse/${id}`).then(res => {updateData()}).catch(() => {})
        updateData()
    }
  }

  const CourseContenHandler = id =>{
    debugger;
    history.push("/setting/Usercourse/"+id+"/sections")

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
      dataField: 'price',
      text: 'Price',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'posterImageUrl',
      text: 'Image',
      formatter: UserCourseProfileFormater,     
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: UserCourseActionFormatter,
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
  const [Course, setCourse] = useState([])
  const updateData = () => {
    debugger
    axios
      .get('/api/course/UsercourseList/' )
      .then(res => {
        debugger
        console.log(res.data)
        setCourse(res.data)
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
            <CardHeader title={"Course list -> "}>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                    history.push('/setting/UserCourseForm')
                  }}
                >
                  New course
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
            {Course ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={Course}
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
