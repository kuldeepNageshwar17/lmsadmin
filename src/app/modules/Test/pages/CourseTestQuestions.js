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
import ActionFormatter from '../components/TestQuestionsActionFormatter'


export default function CourseTestQuestions (props) {
  const {id} = useParams();
  const [questions, setQuestions] = useState([])

  let history = useHistory()
  const EditHandler = (qid) => {
    debugger;
    history.push('/Test/CourseTest/' + id + '/QuestionForm/' + qid)
  }
  const DeleteHandler = (QId) => {
    if (window.confirm('do you really  want to delete11')) {
      axios
      .get(`/api/Course/getCourseTestQuestionById/${QId}`)
      .then(res => {
        console.log(res)
        axios
        .post('/api/Course/' + id +  '/deleteQuestion/' ,res.data)
        .then(res => {alert("Question Deleted ");updateData() })
        .catch(() => {})
      })
      .catch(err => {
        console.log(err)
      })
      
    }
  }
  const ShowHandler=(qid)=>{
    history.push('/Test/CourseTest/' + id + '/Question/' + qid)

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
      dataField: 'question',
      text: 'question',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },    
    {
      dataField: 'marks',
      text: 'Marks',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    }, 
    {
      dataField: 'action',
      text: 'Actions',
       formatter: ActionFormatter,
      formatExtraData: {
        EditAction: EditHandler,
        DeleteAction: DeleteHandler,
        ShowQuestion:ShowHandler
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    }
    
  ]
  const updateData=()=>{
    debugger;
    axios.get('/api/Course/'+id + '/getCourseTestQuestionList')
      .then(res => {
      debugger;  
      setQuestions(res.data)
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
            <CardHeader title='Test Question'>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                    history.push('/Test/CourseTest/' + id + '/QuestionForm/')
                  }}
                >
                  Add Question
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {questions ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={questions}
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
