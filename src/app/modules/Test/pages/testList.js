import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom'
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

import TestBlocks from "../components/coursetestblocks"

export default function TestList() {
  debugger;
  const [Test, setTest] = useState([])
  const { id } = useParams();
  let history = useHistory()
  useEffect(() => {
    debugger;
    axios
      .get('/api/course/getAllTestListToAdmin')
      .then(res => {
        console.log("here in coursetestlist" , res.data)
        setTest(res.data)
      })
      .catch(() => { })
    //   axios
    //   .get('/api/course/getLastResults')
    //   .then(res => {
    //     setResults(res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }, [])
  return (
    <div>
      <Row>{console.log("in the page")}
        <Card className='col-md-12'>
          <Card.Header as='h5'>Tests
          
          <button
              type='button'
              className='btn btn-primary pull-left'
              style={{ float: 'right' }}
              onClick={() => {
                history.push('/Test/CourseTest/TestForm')
              }}
            >
              New Test
            </button>
</Card.Header>
          <Card.Body>
            <Row>{console.log("testdata" ,Test.length)}
              {Test && Test.length != 0 
              &&
                Test.map(item => (

                  <TestBlocks test={item.test} classes={item.classes} course={item.courses} key={item.test._id} />
                ))
              }
                {Test && Test.length == 0 && (
                     <p>NO TEST IS AVAILABLE </p>
                    )}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      {/* <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Exam Results</Card.Header>
          <Card.Body>
            <Row>
              {results && results.length &&
                results.map(item => (
                  <ResultBlock result={item}  />
                ))}
            </Row>
          </Card.Body>
        </Card>
      </Row> */}
    </div>
  )
}
