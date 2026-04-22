# Hasnain Saeed - Personal Portfolio

A professional, interactive personal portfolio website designed to showcase technical expertise, capabilities, and recent projects. Built using modern web technologies to ensure high performance and a smooth user experience.

## ✨ Features

- **Modern UI/UX**: Clean design with engaging sections for Hero, Capabilities, Technical Expertise, and Projects.
- **Interactive Animations**: Smooth scroll reveals and transition effects powered by Framer Motion.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile viewing.
- **Dynamic Components**: Reusable React components including a custom typewriter effect and animated blobs.
- **Iconography**: Crisp, lightweight vector icons from Lucide React.

## 🛠️ Tech Stack

This project is built with the following technologies:

- **Framework**: [React](https://reactjs.org/) (v18.3)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Contextual CSS / CSS-in-JS (via `constants/styles.js`)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and a package manager (npm, yarn, or pnpm) installed on your machine.

### Installation

1. Clone the repository (if applicable) or download the source code:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd hasnain-portfolio
   ```
3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running Locally

Start the development server with hot-module-replacement (HMR):

```bash
npm run dev
```

Your app will be running at `http://localhost:5173/` by default.

### Building for Production

To create a production-ready build, run:

```bash
npm run build
```

This will bundle the application into the `dist` folder. You can preview the production build locally using:

```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Hero, Projects, Contact, etc.)
├── constants/        # Static data and shared styles
├── hooks/            # Custom React hooks (e.g., useReveal)
├── App.jsx           # Root application component
└── main.jsx          # Application entry point
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open-source and free to use.
