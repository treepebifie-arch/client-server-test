import React, { useState } from "react";
import "./addnote.css"; // Ensure you create or rename your CSS file
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddNote = () => {
  // Define the initial state for a Note
  const initialNote = {
    title: "",
    content: "",
  };

  const [note, setNote] = useState(initialNote);
  const navigate = useNavigate();

  // Handle input changes dynamically
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:6500/api/v1/note/add-notes", note) // Updated endpoint
      .then((response) => {
        toast.success(response.data.message || "Note added successfully!", { 
          position: "top-right" 
        });
        navigate("/"); // Redirect to home or notes list
      })
      .catch((error) => {
        console.error("Error adding note:", error);
        toast.error("Something went wrong", { position: "top-right" });
      });
  };

  return (
    <div className="addNote">
      <Link to="/" className="btn btn-secondary">
        <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
      </Link>

      <h4>Add New Note</h4>
      <form className="addNoteForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter Note Title"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            onChange={inputHandler}
            rows="5"
            placeholder="Enter Note Content"
            required
          ></textarea>
        </div>

        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;