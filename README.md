# NOMO (No More Missing Out) Discussion App

A modern forum discussion application built with React + Vite for sharing thoughts and ideas with the community.

## 🌐 Live Demo

**Visit the live application:** [https://nomo-forum-app.faizmuttaqin.com/](https://nomo-forum-app.faizmuttaqin.com/)

## ✨ Features

- 🔐 User authentication (register and login)
- 📝 View list of discussion threads
- ➕ Create new threads
- 💬 Display thread details and comments
- 📨 Add comments to threads
- 🎨 Modern UI with glassmorphism design
- 🌓 Dark/Light theme toggle
- 🌍 Multi-language support (Indonesian/English)
- 📱 Fully responsive design with mobile navigation
- ⚡ Smooth animations powered by Framer Motion
- 🔄 Loading indicators and optimistic updates
- 🏆 Leaderboard system
- 👤 User profile management

## 🚀 Installation & Running

1. **Clone the repository**

```bash
git clone https://github.com/faiz-muttaqin/nomo-forum-app.git
cd nomo-forum-app
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run the application in development mode**

```bash
pnpm run dev
```

4. Open your browser to the address shown in the terminal (usually `http://localhost:5173`)

## 📦 Available Scripts

```bash
pnpm run dev         # Start development server
pnpm run build       # Build for production
pnpm run preview     # Preview production build
pnpm run test        # Run unit tests
pnpm run e2e         # Run end-to-end tests
pnpm run lint        # Run ESLint
pnpm run storybook   # Start Storybook
```

## 🔄 CI/CD & Deployment

- **GitHub Actions**: Automatically runs unit tests, e2e tests, and linting on every pull request to the main branch. Failed tests will block merging.
- **Vercel**: Automatic deployment to Vercel on every change to the main branch. Build results are publicly accessible.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with Vite
- **State Management**: Redux Toolkit
- **Styling**: Bootstrap 5.3 + Custom CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM v7
- **Testing**: Vitest + Cypress
- **UI Documentation**: Storybook
- **Backend API**: Custom Go API (separate repository)

## 📚 Additional Libraries

- **Storybook**: Used for interactive UI component documentation and preview. Run with `pnpm run storybook`.
- **Framer Motion**: Used for component animations, such as buttons that scale on hover and press.
- **React Icons**: Icon library for consistent iconography.
- **HTML React Parser**: For parsing and rendering HTML content safely.

## 🎯 Feature Details

### Authentication

- Register with name, email, and password
- Login with email and password
- Automatic session persistence
- Secure token-based authentication

### Threads

- View thread list without login
- Each thread displays title, content preview, creation time, comment count, and author info
- Create new thread (requires login)
- Thread detail shows full title, complete content, creation time, and author info
- Upvote/downvote threads
- Category tags with hashtags

### Comments

- View all comments on a thread
- Add new comments (requires login)
- Comment displays content, creation time, and author info
- Upvote/downvote comments
- Real-time optimistic updates

### Theme & Localization

- Light/Dark theme toggle with persistent preference
- Multi-language support (Indonesian/English)
- Smooth theme transitions
- Modern glassmorphism design

### Leaderboard

- View top contributors
- Medal badges for top 3 users (🥇🥈🥉)
- Score tracking and rankings
- User search functionality

## 📁 Folder Structure

- `src/` : Main React source code
  - `components/` : Reusable UI components (AuthModal, BtnMotion, ThreadItem, etc.)
  - `pages/` : Application pages (HomePage, LeaderboardPage, UserDetail)
  - `states/` : Application state management (Redux Toolkit, async actions, reducers, etc.)
  - `contexts/` : Global contexts (ThemeContext, LanguageContext)
  - `stories/` : Storybook files for component documentation and preview
  - `styles/` : Custom CSS files
  - `utils/` : Utilities (API, local data, helpers)
- `public/` : Public assets (icons, images, etc.)
- `index.html` : Root HTML application

## 🎨 Design Features

- **Glassmorphism UI**: Modern card designs with backdrop blur effects
- **Smooth Animations**: All interactions include smooth transitions
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Mobile Bottom Navigation**: Easy thumb-reach navigation on mobile devices
- **Custom Scrollbar**: Styled scrollbar matching the theme
- **Gradient Backgrounds**: Beautiful gradient backgrounds for both themes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

---

**Created by Faiz Muttaqin** • [Portfolio](https://faizmuttaqin.com) • [GitHub](https://github.com/faiz-muttaqin)
