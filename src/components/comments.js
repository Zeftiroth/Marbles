import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./comments.css";
import { Container, Col, Button } from "reactstrap";
import CommentLikes from "./commentlikes";
import Image from "react-graceful-image";

function Comments(threads, threadId, userID) {
  const [text, setText] = useState("")
  const [allComments, setAllComments] = useState([])
  const [comID, setComID] = useState("")
  const [totalLikes, setTotalLikes] = useState("0")
  const current_user = JSON.parse(localStorage.getItem('user'))

  const addLikes = (e) => {
    e.preventDefault()
    axios.post(`https://marbles-backend.herokuapp.com/api/v1/comment_like/c_like/${comID}`, {
      user: current_user.id,
      comment: comID


    }

    ).then(response => {
      console.log(response.data)
    })
  }

  useEffect(() => {
    axios
      .get(
        `https://marbles-backend.herokuapp.com/api/v1/comment_like/${comID}`
      )
      .then(response => {
        console.log(response)

        setTotalLikes(response.data.length)
      });

  }, [])

  const handleTextChange = (e) => {

    let tt = e.target.value
    console.log(tt)

    setText(tt)
    setTempText(tt)
  }
  console.log(text);

  useEffect(() => {




    axios
      .get(
        `https://marbles-backend.herokuapp.com/api/v1/comments/${threads.threadId}`
      )
      .then(response => {
        let com = response.data.comments;
        let comm = com.sort(function (a, b) { return b.id - a.id })
        console.log(comm)
        setAllComments(comm)
        setComID(response.data.comments.id);

      });



  }, [])
  console.log(localStorage.getItem("user"));
  const handleTextSubmit = (e) => {
    e.preventDefault()



    axios
      .post(
        `https://marbles-backend.herokuapp.com/api/v1/comments/new/${threads.threadId}`,
        {
          text: text,
          user: current_user.id,
          thread: threads.threadId
        }
      )
      .then(response => {
        console.log(response.data.data.text);
        let newComments = [response.data.data, ...allComments]
        let com = newComments;
        let comm = com.sort(function (a, b) { return b.id - a.id })

        let newestComments = [...comm]
        setAllComments(newestComments)

      });
    setTempText("")



  }

  const [tempText, setTempText] = useState("")

  return (
    <div className="container-fluid">
      <div>
        <form onSubmit={handleTextSubmit} >
          <div>
            <input id="commentText" value={tempText} onChange={handleTextChange} type="text" placeholder="Write some encouragement here"></input>
          </div>
          <Button className="encourageBtn" type="submit">Encourage</Button>
        </form>
      </div>

      {
        allComments.length > 0
          ? allComments.map(comment => {
            return (
              <div className="wholeCommentDiv">
                <div id={comment.id}>
                  <Image className="commentUserImage" src={"../noprofilepic.jpg"}></Image>
                </div>
                <div className="commentPartDiv">
                  {comment.text}
                  <CommentLikes comID={comment.id} />
                </div>
              </div>
            );
          })
          : ""
      }
    </div >
  )
}

export default Comments;
