import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConfig";
import { Link } from "react-router-dom";
import spinner from "../images/loadingSpinner.gif";
import { AuthContext } from "../context/Auth";
import EditBook from "./EditBook";

const BookDetails = props => {
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState();
  const [editMode, setEditMode] = useState(false);
  const { id } = props.match.params;
  useEffect(() => {
    if (!user) {
      props.history.push("/");
    }
   const unsubscribe = firebase
      .firestore()
      .collection("books")
      .doc(id)
      .onSnapshot(function(doc) {
        setBook(doc.data());
      })
      
      return () => unsubscribe();
  }, [user,props.history,id]);

  const deleteBook = () => {
    if (window.confirm("Are you sure to delete this book?")) {
      firebase
        .firestore()
        .collection("books")
        .doc(id)
        .delete()
        .then(function() {
          props.history.replace("/books");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    } else {
      return;
    }
  };
  const editBook = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="container">
      {editMode ? null : (
        <Link to="/books" className="waves-effect waves-light btn">
          <i className="material-icons left">arrow_back</i>Back to dashboard
        </Link>
      )}
      {book ? (
        editMode ? (
          <EditBook book={book} id={id} setEditMode={setEditMode} />
        ) : (
          <div className="row card">
            <div className="col m4">
              <h3 className="center" style={{ marginRight: "50px" }}>
                <img
                  src={book.imageURL}
                  alt={book.title}
                  className="responsive-img"
                />
              </h3>
            </div>
            <div className="col m6">
            <div className="actions">
              <h4>Details</h4>             
               {editMode ? null : (
                <div>
                  <button
                    className="btn waves-effect waves-light green"
                    type="submit"
                    name="action"
                    style={{ marginRight: "15px" }}
                    onClick={editBook}
                  >
                    Edit
                    <i className="material-icons right">edit</i>
                  </button>
                  <button
                    className="btn waves-effect waves-light red"
                    type="submit"
                    name="action"
                    onClick={deleteBook}
                  >
                    Delete
                    <i className="material-icons right">delete</i>
                  </button>
                </div>
              )}
              </div>
              <div className="row">
                <div className="col">
                  <h6>
                    <strong>Title: </strong>
                    {book.title}
                  </h6>
                  <h6>
                    <strong>Author: </strong>
                    {book.author}
                  </h6>
                  <h6>
                    <strong>Genre: </strong>
                    {book.genre}
                  </h6>
                </div>
                <div className="col">
                  <h6>
                    <strong>Date: </strong>
                    {book.date_published}
                  </h6>
                  <h6>
                    <strong>No. Pages: </strong>
                    {book.no_copies}
                  </h6>
                  <h6>
                    <strong>Description: </strong>
                    {book.description}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="spinner">
          <img src={spinner} alt="loading-spinner"/>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
