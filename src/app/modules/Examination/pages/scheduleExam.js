import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

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
import ScheduleExamActionFormatter from '../components/ScheduleExamActionFormatter'
import DatePicker from 'react-datepicker'
import { registerLocale , setDefaultLocale } from "react-datepicker";
import { enUS } from 'date-fns/locale'
registerLocale("enUS", enUS); // register it with the name you want
setDefaultLocale("enUS");
export default function ScheduleExam (props) {
  const [Exams, setExams] = useState([])
  const [modalShow, setModalShow] = React.useState(false);
  const [Exam , setExam] = useState()
  const [ReExam , setReExam] = useState()
  let history = useHistory()

  const DeleteHandler = (isActive, _id , examId ,  startDate ,endDate , classID ) => {
    if (window.confirm('do you really  want to delete')) {
      var data = {isActive, _id , examId ,  startDate ,endDate , classID }
      axios
        .post('/api/Examination/deleteScheduleExam/'  , data)
        .then(res => {
          alert('Exam Deleted')
          updateData()
        })
        .catch(() => {})
    }
  }
  const ChangeDescription = (cellContent) => {
    return <div  dangerouslySetInnerHTML={{    __html: cellContent }}></div>
  }
  const ChangeStartDate = (cellContent) => {
    setReExam({...ReExam , startDate :cellContent})
    return cellContent ? cellContent.slice(0,10) : cellContent
  }
  const ChangeEndDate = (cellContent) => {
    setReExam({...ReExam  , endDate : cellContent })
    return cellContent ? cellContent.slice(0,10) : cellContent
  }
  const statusFormatter = (cellContent) => {
    return cellContent == true ? "Active" : "InActive" 
  }
  const editActive = (cellContent) => {
    return 
  }
  const ChangeState = (val , id , classID) => {

    debugger;
   var data = {isActive : val , id , classID}
   console.log(data);

    axios.post('/api/examination/updateActive' ,data ).then((res) => {
console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
    updateData()
  }
  
  const editHandler = (id , className , examName , startDate , endDate , classID , examId) => {
    console.log(id , className , examName, startDate, endDate)
    setReExam({...ReExam , id : id , className : className , examName :examName ,classID : classID , examId : examId  })
    setExam({ ...Exam , id : id , className : className , examName :examName ,endDate :endDate  , startDate :startDate })
    setModalShow(true)
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
      dataField: 'classes.examSchedule._id',
      text: 'ID',
      hidden: true
    },
    {
      dataField: 'classes.examSchedule.examId[0].name',
      text: 'Name',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'classes.name',
      text: 'Class',
      sort: true,
      //cellClasses: 'bg-primary',
      //headerClasses: 'bg-primary',

      sortCaret: sortCaret,
      headerSortingClasses
    },

    {
      dataField: 'classes.examSchedule.startDate',
      text: 'StartDate',
      sort: true,
      formatter : ChangeStartDate,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'classes.examSchedule.endDate',
      text: 'EndDate',
      sort: true,
      formatter :  ChangeEndDate ,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'classes.examSchedule.isActive',
      text: 'Status',
      sort: true,
      formatter: statusFormatter,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'classes.examSchedule.examId[0].description',
      text: 'Description',
      sort: true,
      formatter: ChangeDescription,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: ScheduleExamActionFormatter,
      formatExtraData: {
        ChangeState : ChangeState , 
        EditAction : editHandler , 
        DeleteAction: DeleteHandler
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    }
  ]
  const updateData = () => {
    debugger
    axios
      .get('/api/examination/getExamSchedule')
      .then(res => {
        debugger
        console.log("data" , res.data)
        setExams(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    updateData()
  }, [])
  const submitReSchedule =  (id) => { 
    
    console.log(ReExam)
    
    axios.post('/api/examination/reSchedule' ,ReExam ).then((res) => {
      if(res.status === 200){
        setModalShow(false)
        updateData()
      }
    }).catch((error) => {

    })
    
  }

  function MyVerticallyCenteredModal (props) {
    return (
       
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        key={props.data.id}
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            ReSchedule Exam
          </Modal.Title>
          <button onClick={() => setModalShow(false)}>close</button>
        </Modal.Header>
        <Modal.Body>
        <h4>Class Name : &nbsp;{props.data.className}</h4><br></br>
          <h4>Exam Name : &nbsp;{props.data.examName}</h4>
          <br></br>
          <br></br>
          <p>
            Start Date :     <DatePicker value={Exam.startDate ?  Exam.startDate.slice(0,10) : Exam.startDateNew }  selected={Exam.startDateNew }   onChange={newDate =>{ setReExam({...ReExam , startDate : newDate}) ; setExam({...Exam , startDateNew : newDate , startDate : ""})} } />

          </p>
          <p>
            End Date :  <DatePicker  value={Exam.endDate ? Exam.endDate.slice(0,10) : Exam.endDateNew } selected={Exam.endDateNew }  onChange={newDate => { setReExam({...ReExam , endDate : newDate}) ; setExam({...Exam , endDateNew : newDate , endDate : ""})} }/>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() =>
            submitReSchedule(props.data.id)
            }>Submit</Button>
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
                {/* <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                    history.push('/Exams/ExamForm')
                  }}
                >
                  Create Exam
                </button> */}
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
              {Exam && ReExam &&  <MyVerticallyCenteredModal
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
