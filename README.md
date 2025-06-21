🚀 Smart Resume Builder
Smart Resume Builder is a sleek, modern, and responsive React application that helps users generate professional resumes with the assistance of AI suggestions. Users can input their personal and career details, preview their resume, receive improvement tips from OpenAI, and export the result as a polished PDF.

🛠️ Tech Stack
- Frontend: React, HTML2Canvas, jsPDF
- Backend: Node.js, Express, OpenAI API
- PDF Generation (Server-Side): html-pdf
- Styling: CSS with modern dark theme and mobile-first responsiveness

📂 Project Structure
smart-resume-builder/
├── backend/
│   ├── index.js         # Express server with OpenAI + PDF endpoints
│   └── .env             # OpenAI API key
├── frontend/
│   ├── src/
│   │   ├── App.js       # Main resume builder component
│   │   └── App.css      # Dark theme + responsive styling
│   └── public/
├── README.md



⚙️ Getting Started
1. Clone the repo
git clone https://github.com/your-username/smart-resume-builder.git
cd smart-resume-builder


2. Setup the backend
cd backend
npm install


Create a .env file and add your OpenAI API key:
OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXX


Run the server:
node index.js


The backend runs at http://localhost:5000
3. Setup the frontend
In a new terminal:
cd frontend
npm install
npm start


Access the app at http://localhost:3000

✨ Features
- 🎨 Clean and responsive resume layout
- 🤖 AI Suggestions using OpenAI's GPT-3.5
- 📄 Export resume as PDF (client-side or optional server-side)
- 🌓 Dark theme with soft gradients
- 📱 Fully mobile-optimized experience

🔐 Environment Variables
Ensure your .env (in backend/) includes:
OPENAI_API_KEY=your-openai-api-key



💡 Future Improvements
- Light/dark mode toggle
- Editable templates and themes
- Drag-and-drop section reordering
- Hosted deployment with form-saving capabilities

🤝 Credits
Built with 💜 by [Dev] — powered by React, OpenAI, and creativity.

Let me know if you'd like the Markdown version saved as an actual .md file, or want a short demo video script to go with it!
