import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { Modal , Button} from 'react-bootstrap';

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
import DatePicker from "react-datepicker";
import { registerLocale , setDefaultLocale } from "react-datepicker";
import { enUS } from 'date-fns/locale'
registerLocale("enUS", enUS); // register it with the name you want
setDefaultLocale("enUS");
export default function Exams (props) {
  const [Exams, setExams] = useState([])
  const [modalShow, setModalShow] = React.useState(false);
  const [Exam , setExam] = useState()
  let history = useHistory()
  const EditHandler = (id) => {
    history.push('/Exams/ExamForm/' + id)
  }
  const DeleteHandler = (id) => {
    if (window.confirm('do you really  want to delete')) {
      axios
        .delete('/api/Examination/deleteExam/'+id )
        .then(res => {alert("Exam Deleted ");updateData() })
        .catch(() => {})
    }
  }
  const GetQuestionHandler=(id)=>{
    history.push('/Exams/'+ id+'/ExamQuestion/' )
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
  const scheduleIt = (id , name) => {
     setModalShow(true)
     setExam({id : id , name : name})
  }
  const columns = [
    {
      dataField: 'examinations._id',
      text: 'ID',
      hidden: true
    },
    {
      dataField: 'examinations.name',
      text: 'Name',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'name',
      text: 'Class',
      sort: true,
      //cellClasses: 'bg-primary',
      //headerClasses: 'bg-primary',
      
      sortCaret: sortCaret, 
      headerSortingClasses
    },
    
    {
      dataField: 'examinations.passingMarks',
      text: 'passing',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'examinations.totalMarks',
      text: 'Total',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'examinations.isComplete',
      text: 'Status',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'examinations.description',
      text: 'Description',
      sort: true,
      formatter : ChangeDescription,
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
        scheduleIt : scheduleIt
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    }
    
  ]
const updateData=()=>{
  debugger
  axios.get('/api/Examination/getAllExams')
    .then(res => {
    debugger;  
    // var exams = res.data.classes.reduce((arr, item)=>{
    //   var newitem = item.examinations.map(i=>{ return  {...i,"class":item.name}})
    //   return arr.concat(newitem)
    // },[])

        setExams(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}
  useEffect(() => {
    updateData()
  }, [])
  const submitSchedule =  (id) => {
    axios.post('/api/examination/examSchedule/' + id , Exam).then((res) => {
      if(res.status === 200){
        setModalShow(false)
      }
    }).catch((error) => {

    })
    
  }

  function MyVerticallyCenteredModal(props) {      
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        key={props.data.id}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Schedule Exam
          </Modal.Title>
          <button onClick={() => setModalShow(false)}>close</button>
        </Modal.Header>
        <Modal.Body>
          <h4>Exam Name : &nbsp;{props.data.name}</h4>
          <br></br>
          <br></br>
          <p>
            Start Date :     <DatePicker selected={Exam.startDate} onChange={date => setExam({...Exam , startDate : date})} />

          </p>
          <p>
            End Date :  <DatePicker selected={Exam.endDate} onChange={date => setExam({...Exam , endDate : date})} />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => submitSchedule(props.data.id)}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }

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
                  Create Exam
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
            
              {Exams ?  (
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
              {Exam && <MyVerticallyCenteredModal
                show={modalShow}
                data= {Exam}
              />}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
