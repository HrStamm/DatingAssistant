# DatingAssistant 💕  

This repository contains the code for **DatingAssistant**, a summer side project experimenting with AI-powered web applications, frontend development in Next.js, and coding with AI agents.

**Author:** Valdemar Stamm Kristensen  
**Project type:** Side project (summer 2025)  

---

## 📌 Project Overview  

DatingAssistant is a Next.js web application designed to give users a fun little edge in online dating. The app combines AI-powered text generation with a modern interface to help users:

- Generate personalized chat responses in different tones (flirty, funny, romantic, casual), the point was that you write your matches message from a dating app like Tinder or Hinge, and then you get a good response based on the tone chosen if unsure what to write back.  
- Optimize dating profiles (currently a placeholder, image recognition LLM not yet integrated). Here the point was to upload a picture of your profile from a dating app and it could give you advice, such as "smile more in picture 2" or "have a picture with friends so you seem more social".  

The project was mainly created as an exploration of modern web technologies, AI integration (LLM wrappers), and "coding with AI agents" such as GitHub Copilot Agent mode (Claude Sonnet 4).  

---

## 🛠 Tech Stack  

- **Framework:** Next.js 15.4.3 with React 19  
- **Styling:** Tailwind CSS v4  
- **AI Integration:** OpenAI GPT-3.5-turbo  
- **Language:** JavaScript (no TypeScript)  
- **Developer Tools:** ESLint, PostCSS  

---

## ✅ Current Status  

### Working  
- AI-powered chat response generator  
- Four personality tones for responses  
- Dark/light mode with system preference detection  
- Danish/English language toggle  
- Responsive design and chat interface  
- Local persistence of preferences and chat history  
- Drop down menu showing different pages: The Dating Assistant, The Profile Optimizer, and the About Us page  

### 🚧 Work in Progress  
- Profile Optimizer: currently a placeholder (image recognition not implemented)  
- About Page: placeholder design, not completed  

### 🔮 Future Plans (if developed further)  
- Integrate image recognition for profile optimization  
- Complete About page  
- Add more personality tones  
- Persistent conversation history across sessions  
- Possible mobile app version  

---

## 📖 What I Learned  

This project was my sandbox for exploring:  
- **Modern React Patterns** – Context, hooks, and avoiding component sprawl  
- **AI Integration** – Prompting GPT, balancing ease and complexity  
- **Coding with AI Agents** – Using Copilot as a pair programming assistant  
- **User Experience Design** – Focusing on usability and smooth interactions  
- **The Art of "Good Enough"** – Shipping a working project instead of chasing perfection  

---

## 💻 How to Run Locally  

- Clone the repository  
  - `git clone git@github.com:HrStamm/DatingAssistant.git`  
  - `cd DatingAssistant`

- Install dependencies  
  - `npm install`

- Set up environment variables  
  - Create a `.env.local` file in the root  
  - Add: `OPENAI_API_KEY=your_openai_api_key_here`

- Run the development server  
  - `npm run dev`

- Open in browser  
  - Visit [http://localhost:3000](http://localhost:3000)


