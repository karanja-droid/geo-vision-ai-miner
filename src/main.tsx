
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Custom styling for fonts
document.documentElement.classList.add('font-inter');

// Copyright notice
console.info('%c© 2025 Big Box Investment Limited. All rights reserved.', 'font-weight: bold; font-size: 12px;');
console.info('%cAll content, code, data, and materials are the exclusive property of Big Box Investment Limited.', 'font-size: 10px;');
console.info('%cUnauthorized use is prohibited.', 'font-size: 10px;');

createRoot(document.getElementById("root")!).render(<App />);
