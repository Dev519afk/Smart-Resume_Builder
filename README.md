
# 🚀 Smart Resume Builder

Smart Resume Builder is a sleek, modern, and responsive React application that helps users generate professional resumes with the assistance of AI suggestions. Users can input their personal and career details, preview their resume, receive improvement tips from OpenAI, and export the result as a polished PDF.

---

## 🛠️ Tech Stack

- **Frontend**: React, HTML2Canvas, jsPDF  
- **Backend**: Node.js, Express, OpenAI API  
- **PDF Generation (Server-Side)**: html-pdf  
- **Styling**: CSS (Dark Theme, Mobile-First Design)

---



## ⚙️ Getting Started

### 1. Download zip file from drive
```bash
(https://drive.google.com/file/d/1ZSQTgAk4Pmf-fTUFEbTCyUkz9V8CbCco/view?usp=sharing)
```

---

### 2. Setup the backend
```bash
cd backend
npm install
```


#### Run the backend server:
```bash
node index.js
```

The backend will be running at:  
➡️ `http://localhost:5000`

---

### 3. Setup the frontend
In a new terminal:
```bash
cd frontend
npm install
npm start
```

Access the app at:  
➡️ `http://localhost:3000`

---

## ✨ Features

- 🎨 Clean and responsive resume layout  
- 🤖 AI Suggestions using OpenAI's GPT-3.5  
- 📄 Export resume as PDF (client-side or optional server-side)  
- 🌓 Dark theme with soft gradients  
- 📱 Fully mobile-optimized experience  

---

## 🔐 Environment Variables

Ensure the following is in your `.env` file under `backend/`:
```
OPENAI_API_KEY=your-openai-api-key
```

---

## 💡 Future Improvements

- Light/dark mode toggle  
- Editable templates and themes  
- Drag-and-drop section reordering  
- Hosted deployment with form-saving capabilities  

---


## 🤝 Credits

Built with 💜 by **[Dev]** — powered by React, OpenAI, and creativity.

---
