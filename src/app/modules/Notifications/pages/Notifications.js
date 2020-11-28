import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button , Modal } from 'react-bootstrap'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../_metronic/_partials/controls'
import { sortCaret, headerSortingClasses } from '../../../../_metronic/_helpers'
import NotificationActionFormatter from '../components/NotificationActionFormatter'

import BootstrapTable from 'react-bootstrap-table-next'

import paginationFactory, {
  PaginationProvider
} from 'react-bootstrap-table2-paginator'

export default function Notifications (props) {
  const [modalShow, setModalShow] = useState(false);
  const [modelData , setModelData] = useState()

  const ChangeDescription = (cellContent) => {
    return  <Button onClick={() =>showModel(cellContent)}>Show </Button> 
    // 
        // return <div  dangerouslySetInnerHTML={{    __html: cellContent }}></div>
  }
  const ChangeDate = (cellContent) =>{ 
    return cellContent.slice(0 ,10)
  }
  const ChangeName = (cellContent) => {
    return cellContent.charAt(0).toUpperCase() + cellContent.slice(1)
  }
  const StatusColor = (cellContent) => {
    if(cellContent == "Pending"){
      return <div  dangerouslySetInnerHTML={{    __html: cellContent.fontcolor("Red") }}></div> 
    }
    if(cellContent == 'Approved'){
    return <div  dangerouslySetInnerHTML={{    __html: cellContent.fontcolor("Green") }}></div> 
    }
    return <div  dangerouslySetInnerHTML={{    __html: cellContent.fontcolor("marron") }}></div> 

  }
  const ChangeTypeColor = (cellContent) => {
     if(cellContent == "ClassFee"){
        return <div  dangerouslySetInnerHTML={{    __html: cellContent.fontcolor("Blue-green	") }}></div> 
     }
     if (cellContent == "StudentFee"){
      return <div  dangerouslySetInnerHTML={{    __html: cellContent.fontcolor("Brick Red	") }}></div>  
     }

    return cellContent

   }
  const RejectClassAction = (changeRequestId ,entityId ,requestedFees , requestType) => {
    var data = {status : "Rejected" , changeRequestId :changeRequestId ,entityId :entityId ,
    requestedFees :requestedFees , requestType : requestType
   }
   

   
   axios.post('/api/branch/handleRequest' , data).then((res) => {

   }).catch((error) => {

   })
   updateData()
  }
  const ApproveClassAction = (changeRequestId ,entityId ,requestedFees , requestType) => {
    var data = {status : "Approved" , changeRequestId :changeRequestId ,entityId :entityId ,
     requestedFees :requestedFees , requestType : requestType
    }

    axios.post('/api/branch/handleRequest' , data).then((res) => {

    }).catch((error) => {

    })
    updateData()

  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <p>
           {props.data}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )}
  const showModel = (cellContent) => {
    if(!cellContent){
      setModelData("No Description For this")
    }
    else{
      setModelData(cellContent)
    }
    
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
      dataField: 'changeRequest._id',
      text: 'ID',
      hidden: true
    },
    {
      dataField: 'changeRequest.requestType',
      text: 'Type',
      sort: true,
      formatter : ChangeTypeColor,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'changeRequest.entityName',
      text: 'Name',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'changeRequest.description',
      text: 'Description',
      sort: true,
      formatter : ChangeDescription,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'changeRequest.fees',
      text: 'fees',
      sort: true,
    },
    {
      dataField: 'changeRequest.requestedFees',
      text: 'RequestedFees',
      sort: true,
    },
    {
      dataField: 'changeRequest.requestedBy[0].name',
      text: 'requestedBy',
      sort: true,
      formatter : ChangeName,
    },
    {
      dataField: 'changeRequest.requestDate',
      text: 'requestdate',
      sort: true,
      formatter : ChangeDate,
    },
    {
      dataField: 'changeRequest.status',
      text: 'status',
      sort: true,
      formatter : StatusColor
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter : NotificationActionFormatter , 
      formatExtraData: {
        RejectClassAction: RejectClassAction,
        ApproveClassAction: ApproveClassAction
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
      .get('/api/Branch/getRequests')
      .then(res => {
        setNotifications(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [Notifications, setNotifications] = useState(null)
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
              {Notifications ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={Notifications}
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
              {modelData && <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      data={ modelData}
      />}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
