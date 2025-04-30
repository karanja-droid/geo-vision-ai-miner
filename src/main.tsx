
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Custom styling for fonts
document.documentElement.classList.add('font-inter');

createRoot(document.getElementById("root")!).render(<App />);
