import React, {
  useEffect,
  useState
} from 'react'
import '../../../../../node_modules/video-react/dist/video-react.css'
import axios from 'axios'
import {
  Link
} from "react-router-dom";
import PDF from 'react-pdf-js-infinite';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player'

import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  Accordion,
  Tabs,
  Tab,
  Button,
  Image,
  Form
} from 'react-bootstrap'

import {
  useParams,
  useHistory
} from 'react-router'
import JoditEditor from 'jodit-react'

export default function CoursePlayer() {
  const history = useHistory()
  const [CourseData, setCourseData] = useState()
  const [currentItem, setCurrentItem] = useState()
  const [discussion  , setDiscussion] = useState()
  const [answer , setAnswer] = useState()
  const [videotime , setVideoTime] = useState(0)
  const [updatetime , setUpdateTime] = useState()
  const [nextPlayer , setNextPlayer] = useState(false)
  const [answered , setAnswered] = useState(true)
  const {
    id,
    contentId,
    type,
    sectionId,
    time
  } = useParams()
  // const { id, topic, type} = useParams()

  const player = React.createRef()
  // const handleChangeTopic=(item)=>{
  //   history.push(`/coursePlayer/${id}/${topic}/${type}`)
  // }
  const editor = React.useRef(null)
  const config = {
   defaultActionOnPaste: 'insert_as_html',
   askBeforePasteFromWord: false,
   askBeforePasteHTML: false,
   readonly: false // all options from https://xdsoft.net/jodit/doc/
}
  const getDiscussion = (contentid) => {
        
          axios.get(`/api/course/${id}/${sectionId}/${contentid}/getCourseDiscussion`).then((res) => {
            
            setDiscussion(res.data)
          }).catch((error)=>{
      
          })
        
        
    
    }
      var i = 0
    
      const giveAnswer = (courseId ,sectionId , contentId  , discussionId) => {
        axios.post(`/api/course/${courseId}/addDiscussionAnswer/${sectionId}/${contentId}/${discussionId}` , answer).then((res) => {
    
        }).catch((error) => {
    
        })
        getDiscussion(contentId)
        setAnswered(true)
      }
      const gerCourse = () => {
            axios
              .get('/api/Course/getCourseContent/' + id)
              .then( res => {
                
                setCourseData(res.data)        
                if (!currentItem) {
                  getDiscussion(res.data.sections[0].contents[0]._id)
                  setCurrentItem(res.data.sections[0].contents[0])
                  
                  history.push(`/coursePlayer/${id}/${res.data.sections[0]._id}/${res.data.sections[0].contents[0]._id}/video`)
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
  
  useEffect(() => {
    setUpdateTime(time)
    gerCourse()
    debugger;
    if (CourseData) {
      var section = CourseData.sections.find(section => section._id == sectionId)
      if (section) {
        var content = section.contents.find(m => m._id == contentId)
        // content.seen=true
        setCurrentItem(content);
        getDiscussion(content._id)
      }
  
    }
  }, [contentId  , time])

  useEffect(() => {
    setVideoTime(time)
    changeVideoPlayer()
    
  } , [time ])
 
  const changeContentClass = content => {
    debugger;
    var classname = ""
    if (contentId == content._id) {
      classname = classname + "watched active"
    }
    else
      if ( content.seen) {
        classname = "watched"
      }
    return classname
  }
var i = 0
 const changeVideoPlayer =( ) => {
   if(time !== "undefiend"){
    return (currentItem && 
      <>
     <ReactPlayer
     url={`http://localhost:4000/api/stream/video/${currentItem.videoUrl}`}
     playing={true}
     className='react-player'
     muted
     
     playsinline={true}
     width='100%'
     height='100%'
     ref={player => (player = player)}
     onReady={player => {
       
       if(videotime){
         
         player.seekTo(
          videotime,
           'seconds'
         )
         setVideoTime(0) 
       }
       setVideoTime(0) 
         
       
     }}
     playing={true}
     onProgress={currentTime => {
      
      
     }}
     controls
     config={{
       file: {
         attributes: { controlsList: 'nodownload' }
       }
     }}
   ></ReactPlayer></>
    )
   }
   
 }
  // const GetClassForContent = contentsdata => {  
  //   if (currentItem && currentItem._id === contentsdata._id && contentsdata.seen == true)return  'watched active'
  //   if (contentsdata.seen === true) return 'watched'
  // }
  return (
    <>
      <Navbar bg='dark'>
        <Navbar.Brand
          className='text-warning'
          onClick={() => history.push('/Courses')}
        >
          {' '}
          &#8592; Back{' '}
        </Navbar.Brand>
      </Navbar>
      <Container fluid>
        {CourseData && (
          <Row className='mt-5'>
            <Col md={3}>
              <Accordion defaultActiveKey={0}>
                {CourseData.sections.map((data, index) => {
                  return (
                    <Card key={data._id}>
                      <Accordion.Toggle as={Card.Header} eventKey={index}>
                        <div
                          style={{ padding: '10px' }}
                          className='course-player-section-list'
                        >
                          <h6>{data.name}</h6>
                        </div>
                      </Accordion.Toggle>

                      <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                          <ul className='course-player-content-list'>
                            {data.contents.map(contentsdata => {
                              return (
                                <li
                                  key={contentsdata._id}
                                  className={changeContentClass(contentsdata)}
                                 onClick={() => {setVideoTime(0) ; setNextPlayer(false)}}
                                  
                                  
                                >
                                  <Link
                                    to={`/coursePlayer/${id}/${data._id}/${contentsdata._id
                                      }/${contentsdata.videoUrl
                                        ? 'video'
                                        : contentsdata.audioUrl
                                          ? 'audio'
                                          : contentsdata.imageUrl
                                            ? 'image'
                                            : contentsdata.pdfUrl
                                              ? 'pdf'
                                              : 'text'
                                      }`}
                                  
                                  >
                                    {contentsdata.title}

                                    <span >{contentsdata.videoLength ? contentsdata.videoLength : "Video Time" }</span>
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                          <button
                            className='btn btn-success btn-block course-player-test-btn'
                            onClick={() => {
                              history.push(`/test/sectionTests/${data._id}`)
                            }}
                          >
                            Tests
                          </button>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  )
                })}
              </Accordion>
            </Col>
            <Col md={9}>
              <Tabs
                defaultActiveKey={type}
                id='uncontrolled-tab-example'
                onSelect={key => {
                  history.push(`/coursePlayer/${id}/${contentId}/${key}`)
                  
                }}
              >
                {currentItem &&
                  (currentItem.videoUrl || currentItem.videoDescription) && (
                    <Tab eventKey='video' title='Video'>
                      <Card>
                        <Card.Body>
                          
                          <>
                            {/* <Card.Title>Video</Card.Title> */}
                            {currentItem && currentItem.videoUrl && nextPlayer && 
                              changeVideoPlayer()
                          }
                          {currentItem && currentItem.videoUrl && !nextPlayer && (
                            <>
                              <ReactPlayer
                              url={`http://localhost:4000/api/stream/video/${currentItem.videoUrl}`}
                              playing={true}
                              className='react-player'
                              muted
                              
                              playsinline={true}
                              width='100%'
                              height='100%'
                              ref={player => (player = player)}
                              onReady={player => {
                                

                              }}
                              playing={true}
                              onProgress={currentTime => {
                               
                               
                              }}
                              controls
                              config={{
                                file: {
                                  attributes: { controlsList: 'nodownload' }
                                }
                              }}
                            ></ReactPlayer>
                            </>
                          )}
                        </>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: currentItem
                                ? currentItem.videoDescription
                                : ''
                            }}
                          ></div>
                          <hr></hr>
                           Discussion 
                         <hr></hr>
                            
                          <ul className="list-group">
                         
                            {discussion && discussion.length && discussion.map((singleDiscussion) => {
                            
                            i = i + 1
                              return (
                                
                                  <li key={singleDiscussion.sections.contents.discussion._id} class="list-group-item" style={{backgroundColor : "#E4E6EF"}}>
                                     
                                    <p
                                   onClick={async () => {
                                     
                                   await setNextPlayer(false)
                                    
                                     setVideoTime(singleDiscussion.sections.contents.discussion.question.exactTime)
                                     setNextPlayer(true)
                                    history.push(`/coursePlayer/${id}/${sectionId}/${currentItem._id}/${singleDiscussion.sections.contents.discussion.question.exactTime}/video`)
                                   }}
                                     
                                     >
                                      VideoTime :  &nbsp;{singleDiscussion.sections.contents.discussion.question.videoTime} </p> 
                                  <p>Question At :  &nbsp; {singleDiscussion.sections.contents.discussion.question.createdDate.slice(0,10)}</p>
                                  {singleDiscussion.sections.contents.discussion.answer.answerText && <p>Answered At :  &nbsp; {singleDiscussion.sections.contents.discussion.answer.createdDate.slice(0,10)}</p>}

                                      {/* <button  onClick={() => setTime(singleDiscussion.sections.contents.discussion.question.exactTime)  }>video</button> */}

                                      <p>Question . {i} :  &nbsp;{singleDiscussion.sections.contents.discussion.question.questionText}</p> 
                            
                                    <hr></hr>
                              {singleDiscussion.sections.contents.discussion.answer.answerText && answered  && <p>Answer :  &nbsp; { <div  dangerouslySetInnerHTML={{    __html: singleDiscussion.sections.contents.discussion.answer.answerText }}></div> }<button onClick={() => setAnswered(false)}>Edit</button></p> ||
                              <div>
                                 <JoditEditor
                                      
                                      ref={editor}
                                       value={answer && answer.answerText && answer.answerText  || ""}
                                      config={config}
                                      tabIndex={1} // tabIndex of textarea
                                      onBlur={(event) => setAnswer({...answer , answerText : event.target.innerText })} // preferred to use only this option to update the content for performance reasons
                                    />
                                {/* <input placeholder={"Give answer"} onChange={(event) => setAnswer({...answer , answerText : event.target.value})}></input> */}
                                <button onClick={() => giveAnswer(singleDiscussion._id , singleDiscussion.sections._id , singleDiscussion.sections.contents._id , singleDiscussion.sections.contents.discussion._id)}>Submit</button>
                              </div>  }
                                    <br></br>
                                    <hr></hr>
                                    <hr></hr>
                                    <hr></hr>
                                    
                                   </li>
                                  
                                   
                            
                            
                              )
                            }) || "No Discussion Yet"}
                            
                          
                            
                          </ul>
                          {/* <Button variant='primary' onClick={player.pause()}>Go somewhere</Button> */}
                        </Card.Body>
                      </Card>
                    </Tab>
                  )}
                {currentItem &&
                  (currentItem.audioUrl || currentItem.audioDescription) && (
                    <Tab eventKey='audio' title='Audio'>
                      <Card>
                        <Card.Body>
                          <Card.Title>AUDIO</Card.Title>
                          <Card.Text>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: currentItem
                                  ? currentItem.audioDescription
                                  : ''
                              }}
                            ></div>
                          </Card.Text>
                          {currentItem && currentItem.audioUrl && (
                            <ReactAudioPlayer
                              src={`${window.$apihost}uploads/CourseContent/${currentItem.audioUrl}`}
                              autoPlay
                              controls
                              controlsList="nodownload"
                            />
                          )}
                        </Card.Body>
                      </Card>
                    </Tab>
                  )}
                {currentItem &&
                  (currentItem.imageUrl || currentItem.imageDescription) && (
                    <Tab eventKey='image' title='Media File'>
                      <Card>
                        <Card.Body>
                          <>
                            <Card.Title>Image</Card.Title>
                            <Card.Text>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: currentItem
                                    ? currentItem.imageDescription
                                    : ''
                                }}
                              ></div>
                            </Card.Text>
                            {currentItem && currentItem.imageUrl && (
                              <Image
                                src={
                                  currentItem
                                    ? `uploads/CourseContent/${currentItem.imageUrl}`
                                    : ''
                                }
                                width='500px'
                              ></Image>
                            )}
                            {/* <Button variant='primary'>Go somewhere</Button> */}
                          </>
                        </Card.Body>
                      </Card>
                    </Tab>
                  )}
                {/* {currentItem && currentItem.pdfUrl  &&
                  <Tab eventKey='pdf' title='pdf'>
                    <Card>
                      <Card.Body>
                        <Card.Title>Pdf</Card.Title>
                        <Card.Text>
                        <div  dangerouslySetInnerHTML={{    __html: currentItem ? currentItem.pdfDescription : ""  }}></div>
                        </Card.Text>
                        {currentItem &&  currentItem.videoUrl && (
                            <PDF 
                            file={`${window.$apihost}uploads/CourseContent/${currentItem.pdfUrl}`} 
                            width = '100%'
                            controls
                        />
                        )}
                      </Card.Body>
                    </Card>
                  </Tab>
                  } */}
                {currentItem && currentItem.textDescription && (
                  <Tab eventKey='text' title='text'>
                    <Card>
                      <Card.Body>
                        <Card.Title>TEXT</Card.Title>
                        <Card.Text>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: currentItem
                                ? currentItem.textDescription
                                : ''
                            }}
                          ></div>
                        </Card.Text>
                        {/* <Button variant='primary'>Go somewhere</Button> */}
                      </Card.Body>
                    </Card>
                  </Tab>
                )}
              </Tabs>
            </Col>
          </Row>
        )}{' '}
      </Container>
    </>
  )
}