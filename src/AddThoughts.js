import React, { useState } from 'react'
import "./AddThoughts.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled, { ThemeProvider, keyframes, withTheme } from 'styled-components';
import { Button } from "react-bootstrap";

function AddThoughts() {
  const [content, setContent] = useState("")
  const jwt = localStorage.getItem("jwt")
  let history = useHistory()

  const handleUpload = e => {
    e.preventDefault()
    let uploadForm = new FormData();
    uploadForm.append("caption", content)

    axios.post(`https://marbles-backend.herokuapp.com/api/v1/diaries/`, uploadForm, {
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then((result) => {
        console.log(result.data)
        history.push("/thoughts")

      })
      .catch(err => console.log(err.response))
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
    console.log(content)
  }

  const AddThoughtsDiv = styled.div`
  background-color: ${props => props.theme.addThoughtsDivBg}
  `;

  AddThoughtsDiv.defaultProps = {
    theme: {
      addThoughtsDivBg: "#F7BDA9"
    }
  };

  const AddThoughtsButton = styled(Button)`
     background-color: ${props => props.theme.encBtnBg};
     color: ${props => props.theme.encBtnCol};
      border: 2px solid ${props => props.theme.encBtnBorder};
     &:hover {
      background-color: ${props => props.theme.encBtnBgHover};
      color: ${props => props.theme.encBtnColHover};
      border: 2px solid ${props => props.theme.encBtnBorderHover};
      &:active {
      background-color: ${props => props.theme.encBtnBgHover};
      color: ${props => props.theme.encBtnColHover};
      border: 2px solid ${props => props.theme.encBtnBorderHover};
      &:focus {
      background-color: ${props => props.theme.encBtnBgHover};
      color: ${props => props.theme.encBtnColHover};
      border: 2px solid ${props => props.theme.encBtnBorderHover};
     }
`;

  AddThoughtsButton.defaultProps = {
    theme: {
      encBtnBg: "#FBD6C8",
      encBtnCol: "black",
      encBtnBorder: "#FBA589",
      encBtnBgHover: "#FBA589",
      encBtnColHover: "black",
      encBtnBorderHover: "#FBA589"
    }
  };

  return (
    <div className="container" id="addThoughtsContainer">
      <form>
      <AddThoughtsDiv className="addYourThoughts">write your thoughts

      <AddThoughtsButton className="addThoughtsPost" onClick={handleUpload}>post</AddThoughtsButton>
      </AddThoughtsDiv>
      <textarea autoResize="true" placeholder="click me and start writing" className="addThoughtsTextArea" value={content} onChange={handleContentChange}></textarea>
      </form>
    </div>
  )
}

export default AddThoughts;