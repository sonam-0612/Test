import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import TextareaAutosize from 'react-textarea-autosize';
import './index.css';
import ReactMarkdown from 'react-markdown';


export default function NoteEditor() {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [content, setContent] = useState('');
  const [activeUsers, setActiveUsers] = useState(0);
  const [showPreview, setShowPreview] = useState(false);



  const contentRef = useRef('');
  const socketRef = useRef(null); 


  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/notes/${id}`);
        setNote(res.data);
        setContent(res.data.content);
      } catch (err) {
        console.error("Failed to fetch note", err);
      }
    };

    fetchNote();

    socketRef.current = io(process.env.REACT_APP_API);

    socketRef.current.emit('join_note', { noteId: id });

    socketRef.current.on('note_init', (noteData) => {
      setNote(noteData);
      setContent(noteData.content);
    });

    socketRef.current.on('note_update', ({ content }) => {
      setContent(content);
    });

    socketRef.current.on('active_users', (count) => {
      setActiveUsers(count);
    });

    const interval = setInterval(() => {
      axios.put(`${process.env.REACT_APP_API}/notes/${id}`, {
        content: contentRef.current,
      });
    }, 5000);

    return () => {
      clearInterval(interval);
      socketRef.current.disconnect(); 
    };
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    socketRef.current.emit('note_update', { content: value });
  };

  return (
    <div className="container">
    <h2>{note.title}</h2>
    
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? '✍️ Edit Markdown' : '👀 Preview Markdown'}
        </button>
      </div>

      {showPreview ? (
        <div className="markdown-preview">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

     ) : (
        <TextareaAutosize
          minRows={10}
          value={content}
          onChange={handleChange}
          placeholder="Start typing your Markdown note..."
          className="textarea"
        />
      )}

      
    <p style={{ textAlign: 'right', color: '#555' }}>
      👥 Active Collaborators: {activeUsers}
    </p>
    <p className="updated-time">
   Last Updated: {note.updatedAt ? new Date(note.updatedAt).toLocaleString() : 'Loading...'}
</p>
  </div>
);
}
