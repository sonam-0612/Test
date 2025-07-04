import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateNote from './CreateNote';
import NoteEditor from './NoteEditor';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteEditor />} />
      </Routes>
    </BrowserRouter>
  );
}
