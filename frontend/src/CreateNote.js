// CreateNote.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css'; 

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const createNote = async () => {
    if (!title.trim()) return alert("Please enter a title.");
    const res = await axios.post(`${process.env.REACT_APP_API}/notes`, { title });
    navigate(`/note/${res.data._id}`);
  };

  return (
    <div className="container">
      <h2>📝 Create a New Note</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" />
      <button onClick={createNote}>Create Note</button>
    </div>
  );
}

