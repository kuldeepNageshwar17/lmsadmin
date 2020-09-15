import React, { Component } from 'react'
import { connect } from 'react-redux'
import {actions} from "./../_redux/EcourseRedux"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../_metronic/_partials/controls'
import {
  sortCaret,
  headerSortingClasses
} from '../../../../_metronic/_helpers'
import axios from 'axios'

// import * as uiHelpers from './ECourseuihelpers'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
  PaginationProvider
} from 'react-bootstrap-table2-paginator'
import { ActionsColumnFormatter } from '../components/ActionColoumnFormatter'

 class ecourseList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      totalCount: 10,
      entities: [],
      listLoading: false,
      queryParams: {
        pageSize: 5,
        pageNumber: 0
      }
    }
    this.getdata = () => {
      axios
        .get('/api/course/course')
        .then(response => {
          this.setState(state => ({
            entities: response.data
          }))
        })
        .catch(err => {
          console.log(err)
        })
    }

    this.deleteArticle = id => {
      debugger
      axios
        .delete('/api/course/course/' + id)
        .then(response => {
          this.getdata()
        })
        .catch(err => {
          console.log(err)
        })
    }
    this.openEditCustomerDialog = id => {
      this.props.history.push('/Ecourse/newcourse?id=' + id)
    }
    this.openDeleteCustomerDialog = id => {
      var shouldDelete = window.confirm(
        'Do you really want to delete this awesome article?'
      )
      if (shouldDelete) {
        this.deleteArticle(id)
      }
    }
    this.addContent = id => {      
      this.props.dispatch(actions.SetCurrentCourse(id));
      this.props.history.push('/Ecourse/CourseContent?id=' + id)
    }
  }

  componentDidMount () {
    this.getdata()
  }
  render () {
    const columns = [
      {
        dataField: '_id',
        text: 'ID',
        hidden: true
      },
      {
        dataField: 'title',
        text: 'Course Title',
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
        dataField: 'action',
        text: 'Actions',
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          openEditCourse: this.openEditCustomerDialog,
          openDeleteCourseDialog: this.openDeleteCustomerDialog,
          addContent: this.addContent
        },
        classes: 'text-right pr-0',
        headerClasses: 'text-right pr-3',
        style: {
          minWidth: '100px'
        }
      }
    ]

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
    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <Card>
              <CardHeader title='course list'>
                <CardHeaderToolbar>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      this.props.history.push('/Ecourse/newcourse')
                    }}
                  >
                    New Course
                  </button>
                </CardHeaderToolbar>
              </CardHeader>
              <CardBody>
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => {
                    return (
                      <BootstrapTable
                        keyField='_id'
                        data={this.state.entities}
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
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}


export default connect()(ecourseList)
