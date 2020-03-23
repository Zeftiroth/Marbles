import React, { useState } from "react";
import "./profile.css";
import { Link } from "react-router-dom"
import { Form, Button, Modal } from "react-bootstrap"
import axios from "axios";

function Profile() {

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [template, setTemplate] = useState("")
  const jwt = localStorage.getItem("jwt")

  // -- Set image file to state --- 

  const handleTemplateChange = (e) => {
    setPreviewImage(null)
    let imageFile = e.target.files[0]
    if (imageFile) {
      let newPreview = URL.createObjectURL(imageFile)
      setPreviewImage(newPreview)
    }
    setTemplate(imageFile)
  }

  // ---- Post profile picture to API --- 

  const handleUpload = e => {
    e.preventDefault()
    let uploadForm = new FormData();
    uploadForm.append("image", template)
    console.log(uploadForm.entries())

    axios.post(`http://127.0.0.1:5000/api/v1/users/upload`, uploadForm, {
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then((result) => {
        if (result.data.success) {
          //for now will console log if successful
          console.log(result.data)
        } else {
          console.log(result.data)
        }
      })
      .catch(err => console.log(err.response))
  }


  // Get API call to retrieve profile pic if available 



  return (
    <>
      <div className="container" id="ProfileContainer">
        <div className="ProfilePicDisplay">
          <h6 onClick={handleShowModal}>+profile</h6>
        </div>
        <h2>user.username</h2>
        <div className="EncouragementStarred">
          <div className="Encouragements">
            <h6>{Math.floor(Math.random() * 1000)}</h6>
            <h6>encs</h6>
          </div>
          <div className="Encouragements">
            <h6>{Math.floor(Math.random() * 1000)}</h6>
            <h6>stars</h6>
          </div>
        </div>
        <Link tag={Link} to="/mood" className="ProfileLink">edit profile</Link>
        <Link tag={Link} to="/emergency" className="ProfileLink">emergency contact</Link>
        <Link tag={Link} to="/mood" className="ProfileLink">volunteer</Link>
        <Link tag={Link} to="/mood" className="ProfileLink">how to seek help</Link>
        <Link tag={Link} to="/mood" className="ProfileLink">f.a.q.</Link>
        <Link tag={Link} to="/mood" className="ProfileLink">support group</Link>
      </div>
      {/* Modal to update profile pic here  */}
      <Modal show={showModal} className="ImageModal">
        <Modal.Header>
          <Button onClick={handleCloseModal}>
            Return To Home
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>
            <h1>test</h1>
          </Modal.Title>
          <div className="AddImageWrapper">
            <input id="AddImageInput" type="file" name="image-file" onChange={handleTemplateChange} multiple={false}></input>
            <div>
              <label for="AddImageInput" className="ChooseImageButton">choose
                    file</label>
            </div>
          </div>
          {/* Set Image Preview to blank or previously uploaded if avaible */}
          <div className="ImagePreviewDiv">
            <img className="ImagePreview" src={previewImage} alt="preview" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="AddPostPostButton" onClick={handleUpload}>post
                </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profile;