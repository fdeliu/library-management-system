import React, { useState, useEffect, useRef, useContext } from "react";
import firebase from "../firebaseConfig";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import spinner from "../images/loadingSpinner.gif";
import { AuthContext } from "../context/Auth";

const EditBook = props => {
  const { user } = useContext(AuthContext);
  const { book, id, setEditMode } = props;

  const titleInput = useRef();
  const authorInput = useRef();
  const genreInput = useRef();
  const pagesInput = useRef();
  const dateInput = useRef();
  const descriptionInput = useRef();

  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!user) {
      props.history.push("/");
    }
    M.AutoInit();
    M.updateTextFields();
  }, [user, props.history]);

  const handleSubmit = e => {
    e.preventDefault();
    if(!image){
      alert('You must choose an image');
      return;
    }
    const fileType = image["type"];
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];
    if (!validImageTypes.includes(fileType)) {
      alert("Not a valid file. Please choose an image.");
      return;
    }
    const modal = M.Modal.getInstance(document.getElementById("modal"));
    modal.open();

    const uploadTask = firebase
      .storage()
      .ref(`images/${imageName}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function(imageURL) {
          const newBook = {
            title: titleInput.current.value,
            author: authorInput.current.value,
            genre: genreInput.current.value,
            no_copies: pagesInput.current.value,
            date_published: dateInput.current.value,
            description: descriptionInput.current.value,
            imageURL
          };

          firebase
            .firestore()
            .collection("books")
            .doc(id)
            .set(newBook)
            .then(() => {
              const modal = M.Modal.getInstance(
                document.getElementById("modal")
              );
              modal.close();
              M.toast({
                html: "Book was updated succesfully",
                classes: "green darken-1 rounded"
              });
            })
            .catch(error => {
              M.toast({
                html: "Something went wrong. Please try again.",
                classes: "red darken-1 rounded"
              });
            });
        });
      }
    );
  };

  const uploadImage = e => {
    setImage(e.target.files[0]);
    if(!e.target.files[0]){
      alert('You must choose an image');
      return;
    }
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImageName(e.target.files[0].name);
  };

  return (
    <div>
      <div id="modal" className="modal">
        <div className="modal-content center">
          <img src={spinner} alt="spinner" />
          <h4>Updating book...</h4>
        </div>
      </div>
      <div className="row card">
        <Link to="/books" className="waves-effect waves-light btn">
          <i className="material-icons left">arrow_back</i>Back to dashboard
        </Link>
        <p className="center" style={{ fontSize: "20px" }}>
          Edit Book
        </p>

        <div className="col s12 m7">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="title"
                  type="text"
                  className="validate"
                  defaultValue={book.title}
                  ref={titleInput}
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="author"
                  type="text"
                  className="validate"
                  ref={authorInput}
                  defaultValue={book.author}
                />
                <label htmlFor="author">Author</label>
              </div>
              <div className="input-field col s4">
                <input
                  id="genre"
                  type="text"
                  className="validate"
                  defaultValue={book.genre}
                  ref={genreInput}
                />
                <label htmlFor="genre">Genre</label>
              </div>
              <div className="input-field col s4">
                <input
                  id="no_copies"
                  type="number"
                  className="validate"
                  defaultValue={book.no_copies}
                  ref={pagesInput}
                />
                <label htmlFor="no_copies">No. Copies</label>
              </div>
              <div className="input-field col s4">
                <input
                  id="date_published"
                  type="date"
                  className="validate"
                  defaultValue={book.date_published}
                  ref={dateInput}
                />
                <label htmlFor="date_published">Date Published</label>
              </div>
              <div className="input-field col s12">
                <textarea
                  id="description"
                  className="materialize-textarea"
                  defaultValue={book.description}
                  ref={descriptionInput}
                ></textarea>
                <label htmlFor="description">Description</label>
              </div>
            </div>
            <div className="file-field input-field">
              <div className="btn purple darken-4 col s12">
                <span>
                  Upload Cover Image
                  <i className="material-icons right">add_circle_outline</i>
                </span>
                <input type="file" onChange={uploadImage} accept="image/*" />
              </div>

              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
            <div className="center">
              <button
                className="waves-effect waves-light btn"
                style={{ margin: "8px 18px" }}
                type="submit"
              >
                Update BOOK{" "}
                <i className="material-icons right">add_circle_outline</i>
              </button>
              <button
                onClick={() => setEditMode()}
                className="waves-effect waves-light btn red"
              >
                Cancel <i className="material-icons right">cancel</i>
              </button>
            </div>
          </form>
        </div>
        <div className="col s12 m5 center">
          <p>Cover Image</p>
          <img src={imagePreview} alt={imageName} className="responsive-img" />
        </div>
      </div>
    </div>
  );
};

export default withRouter(EditBook);
