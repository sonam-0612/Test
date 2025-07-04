# 📝 Real-Time Collaborative Notes App

A full-stack **MERN-based** note-taking application with real-time collaboration using **Socket.IO**. Users can create shared note rooms, edit notes live from multiple tabs or devices, and view changes in real-time — no login required!

---

## 🚀 Features

- ✅ Create & edit notes in real-time
- 🔁 Live syncing across clients with **Socket.IO**
- 💾 Auto-save to MongoDB every 5 seconds
- 👥 See number of active collaborators per note
- ⏱️ Display "Last Updated" timestamp (bonus)
- 🧾 Markdown preview toggle (bonus)
- 💻 Clean and beginner-friendly UI

---

## 🛠️ Tech Stack

**Frontend:**
- React.js  
- Axios  
- Socket.IO Client  
- `react-textarea-autosize`  
- `react-markdown` (Markdown rendering)

**Backend:**
- Node.js  
- Express.js  
- MongoDB (via Mongoose)  
- Socket.IO (WebSocket integration)  

---


## 📦 Folder Structure

project-root/
│
├── backend/
│ ├── server.js
│ ├── models/
│ │ └── Note.js
│ ├── .env
│
├── frontend/
│ ├── src/
│ │ ├── CreateNote.js
│ │ ├── NoteEditor.js
│ │ ├── index.css
│ │ └── App.js
│ ├── .env
│ ├── package.json

## 📦 Setup Backend

```bash
cd backend
npm install

🛠️ Create .env file in backend/:
PORT=5000
MONGO_URI=your_mongodb_connection_string
Then start the backend:
npm run dev

## 📦 Setup frontend

```bash
cd backend
npm install

🛠️ Create .env file in frontend/:
REACT_APP_API=http://localhost:5000
Then start the frontend:
npm start


🧪 How to Use
Visit: http://localhost:3000

Enter a title and click "Create Note"

You will be redirected to /note/:id

Open same link in another tab to simulate multiple users

Type into the note and see live updates & collaborators count

Toggle between Edit and Markdown Preview ✍️👀
