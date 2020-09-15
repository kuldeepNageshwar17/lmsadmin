import React, { Component } from 'react'
import { Button, Form, Accordion, Card } from 'react-bootstrap'
import axios from 'axios'
import { Typography, Grid, Paper } from '@material-ui/core'
import { ExpansionPanel } from '@material-ui/core'
import { ExpansionPanelSummary } from '@material-ui/core'
import { ExpansionPanelDetails } from '@material-ui/core'
import { connect } from 'react-redux'
import { actions } from './../_redux/EcourseRedux'

// import {
//   Card,
//   CardBody,
//   CardHeader,
//   CardHeaderToolbar
// } from '../../../../_metronic/_partials/controls'
// import Typography from '@material-ui/core'

// const useStyles  = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// })

class CourseContent extends Component {
  constructor (props) {
    super(props)

    const search = this.props.location.search
    console.log(search)
    const id = new URLSearchParams(search).get('id')

    this.state = {
      courseId: id,
      sections: [],
      expanded: 'panel1'
    }
    this.handleChange = panel => () => {
      if (this.state.expanded != panel) this.setState({ expanded: panel })
    }
    this.CreateSection = () => {
      this.props.history.push('/Ecourse/CourseContent/section')
    }

    this.EditSection = (item, e) => {
      this.props.dispatch(actions.SetCurrentSection(item))
      this.props.history.push('/Ecourse/CourseContent/section?id=' + item._id)
      e.stopPropagation()
    }
    this.DeleteSection = (id, e) => {
      debugger
      if (window.confirm('Do you realy Want to delete Compelete Section ?')) {
        debugger
        axios
          .delete('/api/course/courseSection/', {
            data: { courseId: this.state.courseId, _id: id }
          })
          .then(response => {
            this.loaddata()
          })
      }
      e.stopPropagation()
    }
    this.loaddata = () => {
      debugger
      if (this.state.courseId) {
        axios
          .get('/api/course/course/' + this.state.courseId)
          .then(response => {
            this.setState({
              ...response.data
            })
          })
      }
    }
  }
  addSectionContent = (section, event) => {
    this.props.dispatch(actions.SetCurrentSection(section))
    this.props.history.push('/Ecourse/CourseContent/section/Content')
  }
  EditSectionContent = (section, item, event) => {
    this.props.dispatch(actions.SetCurrentSection(section))
    this.props.dispatch(actions.SetCurrentContent(item))
    this.props.history.push(
      '/Ecourse/CourseContent/section/Content?id=' + item._id
    )
  }
  DeleteSectionContent = (_id, e) => {
    debugger
    if (window.confirm('Do you realy Want to delete this Content ?')) {
      debugger
      axios
        .delete('/api/course/courseSectionContent', {
          data: { id: _id }
        })
        .then(response => {
          this.loaddata()
        })
    }
    // e.stopPropagation()
  }
  componentDidMount () {
    this.unblock = this.props.history.block(targetLocation => {
      // take your action here
      return true
    })
    debugger
    this.props.dispatch(actions.SetCurrentContent(null))
    this.props.dispatch(actions.SetCurrentSection(null))
    const search = this.props.location.search
    console.log(search)
    const id = new URLSearchParams(search).get('id')
    if (id) {
      axios.get('/api/course/course/' + id).then(response => {
        this.setState({
          ...response.data
        })
      })
    }
  }
  componentWillUnmount () {
    this.unblock()
  }
  render () {
    // const { classes } = this.props;
    return (
      <div>
        <div>
          <div className='row'>
            <div className='col-md-12'>
              <Card>
                <Card.Header as='h5'>
                  {this.state.title}
                  <button
                    style={{ float: 'right' }}
                    className='btn btn-primary'
                    onClick={this.CreateSection}
                  >
                    add New section
                  </button>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{this.state.Description}</Card.Text>
                  <Accordion>
                    {this.state.sections.map(item => (
                      <Card key={item._id}>
                        <Card.Header>
                          <div
                            className='btn-group'
                            role='group'
                            aria-label=''
                            style={{ marginLeft: 'auto', float: 'right' }}
                          >
                            <button
                              className=' btn btn-primary pull-right'
                              style={{ marginLeft: 'auto' }}
                              onClick={e => {
                                this.addSectionContent(item, e)
                              }}
                            >
                              add Content
                            </button>
                            <button
                              className=' btn btn-primary pull-right'
                              style={{ marginLeft: 'auto' }}
                              onClick={e => {
                                this.EditSection(item, e)
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className=' btn btn-danger pull-right'
                              onClick={event => {
                                this.DeleteSection(item._id, event)
                              }}
                            >
                              delete
                            </button>
                          </div>

                          <Accordion.Toggle
                            as={Button}
                            variant='text'
                            eventKey={item._id}
                          >
                            <h5>{item.name}</h5>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={item._id}>
                          <Card.Body>
                            {item.contents.map(c => {
                              return (
                                <div className='row' key={c._id} style={{ margin: '10px' }}>
                                  <div className='col-md-3'>{c.title}</div>

                                  <div className='col-md-1'>{c.type}</div>
                                  <div className='col-md-1'>
                                    <div
                                      className='btn-group'
                                      role='group'
                                      aria-label=''
                                      style={{
                                        marginLeft: '20px',
                                        // float: 'right'
                                      }}
                                    >
                                      <button
                                        className='btn btn-primary pull-right'
                                        onClick={event => {
                                          this.EditSectionContent(
                                            item,
                                            c,
                                            event
                                          )
                                        }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className='btn btn-danger pull-right'
                                        onClick={event => {
                                          this.DeleteSectionContent(
                                            c._id                                           
                                          )
                                        }}
                                      >
                                        delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { CourseID: state.course.CurrentCourseId }
}
export default connect(mapStateToProps)(CourseContent)
