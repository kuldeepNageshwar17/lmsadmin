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
import MenuActionFormatter from '../components/MenuActionFormatter'

export default function Menus (props) {
  const [menus, setMenus] = useState(null)

  let history = useHistory()
  const EditMenuHandler = (id) => {
    history.push('' + id)
  }
  const DeleteMenuHandler = (id) => {
    if (window.confirm('do you really  want to delete')) {
      axios
        .delete('', { id })
        .then(res => {})
        .catch(() => {})
    }
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
      text: 'Title',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'MenuCode',
      text: 'Description',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },   
    {
      dataField: 'action',
      text: 'Actions',
      formatter: MenuActionFormatter,
      formatExtraData: {
        EditAction: EditMenuHandler,
        DeleteAction: DeleteMenuHandler
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
    // axios.get('')
    //   .then(res => {
    //   debugger;
    //       // let ClassBatches= res.data.classes.reduce((batchlist,obj)=>
    //       // {       debugger;
    //       //      return batchlist.concat(obj.batches)
    //       // },[])
    //       if(res.data && res.data.length){
    //         setMenus(res.data)
    //       }
      
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }, [])

  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
            <CardHeader title='Menu list'>
              <CardHeaderToolbar>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => {
                    history.push('/permission/MenuForm')
                  }}
                >
                  New Menu
                </button>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {menus && menus.length ? (
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={menus}
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
