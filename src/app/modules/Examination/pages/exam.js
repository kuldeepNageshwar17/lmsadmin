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
import ExamActionFormatter from '../components/ExamActionFormatter'

export default function Exams (props) {
  const [Exams, setExams] = useState([])

  let history = useHistory()
  const EditHandler = (id) => {
    history.push('/Exams/ExamForm/' + id)
  }
  const DeleteHandler = (id) => {
    if (window.confirm('do you really  want to delete')) {
      axios
        .delete('/Exams/deleteExam', { id })
        .then(res => {alert("Exam Deleted ")})
        .catch(() => {})
    }
  }
  const GetQuestionHandler=(id)=>{
    history.push('/Exams/'+ id+'/ExamQuestion/' )
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
      dataField: 'description',
      text: 'Description',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'c.name',
      text: 'Class',
      sort: true,
      //cellClasses: 'bg-primary',
      //headerClasses: 'bg-primary',
      
      sortCaret: sortCaret, 
      headerSortingClasses
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: ExamActionFormatter,
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

  useEffect(() => {
    debugger
    axios.get('/api/Examination/getAllExams')
      .then(res => {
      debugger;         
          setExams(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title='Examinations'>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                  history.push('/Exams/ExamForm')
                  }}
                >
                  create Exam
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {Exams ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={Exams}
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
