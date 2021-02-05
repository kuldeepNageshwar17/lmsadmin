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

export default function FeeManagement (props) {
  const [feeStructure , setFeeStructure] = useState()

  const updateData=()=>{
   axios
     .get('/api/fee/GetStudentFeeDetail')
     .then(res => {
       console.log("data here " , res.data)
       setFeeStructure(res.data)
     })
     .catch(err => {
       console.log(err)
     })
 }
 
 useEffect(() => {
   updateData()
 }, [])

const TotalFeeSubmittedFormatter = (cellContent ) => {
  return cellContent && cellContent || 0
}
const RemainingFeeSubmittedFormatter = (cellContent , row) => {
  if(cellContent){
    if(row.fees / 2 < cellContent){
      return <div style={{color : "red"}}>{cellContent}</div>
    }else{
      return <div style={{color : "green"}}>{cellContent}</div>
    }
  }
  return <div style={{color : "red"}}>{row.fees}</div>
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
      text: 'Student Name',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'TotalFeeSubmitted',
      text: 'Total Fee Submitted',
      sort: true,
      formatter :  TotalFeeSubmittedFormatter,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'fees',
      text: 'Total Fees',
      sort: true,
      //cellClasses: 'bg-primary',
      //headerClasses: 'bg-primary',
      
      sortCaret: sortCaret, 
      headerSortingClasses
    },
    {
      dataField: 'Remaining',
      text: 'Remaining Fees',
      sort: true,
      formatter :  RemainingFeeSubmittedFormatter,
      //cellClasses: 'bg-primary',
      //headerClasses: 'bg-primary',
      
      sortCaret: sortCaret, 
      headerSortingClasses
    },
    {
      dataField: 'action',
      text: 'Actions',
      // formatter: BatchActionFormatter,
      // formatExtraData: {
      //   EditBatchAction: EditBranchHandler,
      //   DeleteBatchAction: DeleteBranchHandler
      // },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    }
    
  ]


  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title='Batch list'>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                    props.history.push('/setting/BatchForm')
                  }}
                >
                  New Batcch
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {feeStructure && feeStructure.length && (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={feeStructure}
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
              ) || (
                <div>loading</div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

