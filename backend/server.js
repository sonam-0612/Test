const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  updatedAt: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', NoteSchema);

// API Routes
app.post('/notes', async (req, res) => {
  const note = await Note.create({ title: req.body.title, content: '' });
  res.json(note);
});

app.get('/notes/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
});

app.put('/notes/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content, updatedAt: Date.now() },
    { new: true }
  );
  res.json(note);
});

const activeUsers = {};

io.on('connection', (socket) => {
  console.log(`🟢 New socket connected: ${socket.id}`);

  socket.on('join_note', async ({ noteId }) => {
    socket.join(noteId);
    socket.noteId = noteId; 

    if (!activeUsers[noteId]) activeUsers[noteId] = new Set();
    activeUsers[noteId].add(socket.id);

    const note = await Note.findById(noteId);
    socket.emit('note_init', note);

    io.to(noteId).emit('active_users', activeUsers[noteId].size);

    socket.on('note_update', ({ content }) => {
      socket.to(noteId).emit('note_update', { content });
    });

    socket.on('disconnect', () => {
      const joinedNoteId = socket.noteId;
      console.log(`🔴 Socket disconnected: ${socket.id}`);

      if (joinedNoteId && activeUsers[joinedNoteId]) {
        activeUsers[joinedNoteId].delete(socket.id);

        if (activeUsers[joinedNoteId].size === 0) {
          delete activeUsers[joinedNoteId]; // clean up empty sets
        } else {
          io.to(joinedNoteId).emit('active_users', activeUsers[joinedNoteId].size);
        }
      }
    });
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log('🚀 Server running on port 5000');
});
