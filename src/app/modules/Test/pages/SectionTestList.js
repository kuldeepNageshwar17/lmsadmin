import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory,useParams } from "react-router-dom";

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
import TestActionFormatter from '../components/TestActionFormatter'

export default function SetionTest (props) {
  const [Test, setTests] = useState([])

  let history = useHistory()
    const {id} = useParams();
  const EditHandler = () => {
    history.push(`/Test/Course/${id}/TestForm/`)
  }
  const DeleteHandler = (id) => {
    if (window.confirm('do you really  want to delete')) {
    //   axios
    //     .delete('/api/Examination/deleteExam/'+id )
    //     .then(res => {alert("Exam Deleted ");updateData() })
    //     .catch(() => {})
    }
  }
  const GetQuestionHandler=(id)=>{
    history.push('/Course/TestQuestions/:id/' )
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
      dataField: 'passingMarks',
      text: 'passing',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'totalMarks',
      text: 'Total',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'isComplete',
      text: 'Status',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: TestActionFormatter,
      formatExtraData: {
        EditAction: EditHandler,
        DeleteAction: DeleteHandler,
        ShowQuestions:GetQuestionHandler,
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    }
    
  ]
const updateData=()=>{
//   debugger
//   axios.get('/api/Examination/getAllExams')
//     .then(res => {
//     debugger;  
//     var exams = res.data.classes.reduce((arr, item)=>{
//       var newitem = item.examinations.map(i=>{ return  {...i,"class":item.name}})
//       return arr.concat(newitem)
//     },[])

//         setExams(exams)
//     })
//     .catch(err => {
//       console.log(err)
//     })
}
  useEffect(() => {
    updateData()
  }, [])

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title={`Test-`}>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                  history.push(`/Test/Course/${id}/TestForm`)
                  }}
                >
                  Create Test
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {Test ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={Test}
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
