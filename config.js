// Configuração da API - usar variável de ambiente ou fallback
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : (import.meta.env?.VITE_API_URL || 'https://tagonlink-backend.vercel.app/api')

// Para projetos sem build tool, usar diretamente
const API = typeof import !== 'undefined' && import.meta?.env?.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000/api'
      : 'https://tagonlink-backend.vercel.app/api')

export { API }

