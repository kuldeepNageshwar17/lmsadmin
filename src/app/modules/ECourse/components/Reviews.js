import React , {useEffect ,useState } from 'react'
import { Row, Col,Card } from 'react-bootstrap'
import axios from 'axios'
import {
  useParams,
  useHistory
} from 'react-router'
export default function Reviews(){
  const [reviews , setReviews]  = useState()

  const {courseId} = useParams()
  useEffect(() => {
    update()
  }, [])
  const update =() => {
    axios.get('/api/course/getReviews/' + courseId).then((res)=>{
      setReviews(res.data)
    }).catch((res)=>{

    })
  }
  
   
    return (
        <Card classNameName='col-md-12'>
        <Card.Header as='h5'>Student Reviews</Card.Header>
        <Card.Body>
          <Row>
            <Col>
            {reviews && reviews.length && reviews.map((element) => 
              <div style={{ width: '80%' }} key={element._id} >
                <b><h3>{element.reviews.reviewBy[0].name}</h3></b>
                <p>
                  {element.reviews.review}
                </p>
               
                <p>
                  Created At : {element.reviews.createdAt.slice(0, 10)}
                </p>
              </div>
            )
            }
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}
