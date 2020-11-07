import React   from 'react'
import { Row, Col,Card } from 'react-bootstrap'
export default function Curricuam({data}) {
    return (
        <Card classNameName='col-md-12'>
        <Card.Header as='h5'>{data[0].title}</Card.Header>
        <Card.Body>
          <Row>
            <Col>
            <div>No Of Course Test : &nbsp;{data[0].noOftests}</div>
            <div>  No Of Sections : &nbsp;{data.length}</div>
            <br></br>
              <div style={{ width: '80%' }}>Sections
              
                {data.map((element) => 
                
                  <ul key={element.sections._id}>
                    
                    <li>Section Name : &nbsp; {element.sections.name}</li>
                    <ul key={element.sections._id}>
                      <li>Time of Section : {element.sections.timeInHours} : {element.sections.timeInMinutes}</li>
                      <li>No Of Sectional Test : &nbsp; {element.noOfSectionstests}</li> 
                      <br></br>
              &nbsp;&nbsp;&nbsp;Contents
                        {element.sections.contents.map((content) => 
                            <ul key={content._id}>
                            <li> &nbsp; {content.title}</li> 
                              <ul>Having :  &nbsp; {content.videoUrl ? "Video" : ""}&nbsp; {content.imageUrl ? "Image" : ""} &nbsp;{content.pdfUrl ? "PDF" : ""} &nbsp;{content.audioUrl ? "Audio" : ""} </ul>
                            </ul>
                        )}
                        
                    </ul>
                  </ul>
                )}
                  
                
                
                
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}
