

import React, { useEffect, useState } from "react";
import "./note.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  // Fetch all notes on component mount
  useEffect(() => {
    const fetchData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:6500/api/v1/note/get-all-notes", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const actualNotes = response.data.data; 
    setNotes(actualNotes);
    
  } catch (error) {
    console.error("Fetch failed", error);
  }
};
   
    fetchData();
    
  }, []);

  // Delete a specific note
  const deleteNote = async (noteId) => {
    await axios
      .delete(`http://localhost:6500/api/v1/delete/note/${noteId}`)
      .then((response) => {
        // Filter out the deleted note from the state
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        toast.success(response.data.message || "Note deleted successfully", { 
          position: "top-right" 
        });
      })
      .catch((error) => {
        console.log("Error deleting note", error);
        toast.error("Failed to delete the note");
      });
  };

  return (
    <div className="noteTable">
      <Link to="/add" type="button" className="btn btn-secondary">
        Add Note <i className="fa-solid fa-plus"></i>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td className="actionButtons">
                  <Link
                    to={`/update/` + note._id}
                    type="button"
                    className="btn btn-info"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>

                  <button
                    onClick={() => deleteNote(note._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Notes;