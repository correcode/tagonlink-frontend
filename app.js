// Importar dependências (usando import dinâmico para compatibilidade)
import authService from './auth.js'
import router from './router.js'
import themeManager from './theme.js'

// Configuração da API
const API =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://tagonlink-backend.vercel.app/api'

window.API = API

// ========== PÁGINAS ==========

function showLoginPage() {
  document.body.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-container">
          <img src="img/TagOnLink.png" alt="TagOnLink" class="logo" />
          <h1>TagOnLink</h1>
        </div>
        <form id="loginForm" class="auth-form">
          <div class="form-group">
            <label for="loginEmail">Email</label>
            <input type="email" id="loginEmail" required autocomplete="email" />
          </div>
          <div class="form-group">
            <label for="loginPassword">Senha</label>
            <input type="password" id="loginPassword" required autocomplete="current-password" />
          </div>
          <button type="submit" class="btn btn-primary">Entrar</button>
          <div class="auth-links">
            <a href="#" data-route="/register">Criar conta</a>
            <a href="#" data-route="/forgot-password">Esqueci minha senha</a>
          </div>
        </form>
        <div id="authError" class="error-message"></div>
      </div>
    </div>
  `

  document.getElementById('loginForm').addEventListener('submit', handleLogin)
}

function showRegisterPage() {
  document.body.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-container">
          <img src="img/TagOnLink.png" alt="TagOnLink" class="logo" />
          <h1>Criar Conta</h1>
        </div>
        <form id="registerForm" class="auth-form">
          <div class="form-group">
            <label for="registerName">Nome</label>
            <input type="text" id="registerName" required autocomplete="name" />
          </div>
          <div class="form-group">
            <label for="registerEmail">Email</label>
            <input type="email" id="registerEmail" required autocomplete="email" />
          </div>
          <div class="form-group">
            <label for="registerPassword">Senha</label>
            <input type="password" id="registerPassword" required autocomplete="new-password" minlength="6" />
            <small>Mínimo 6 caracteres</small>
          </div>
          <button type="submit" class="btn btn-primary">Criar Conta</button>
          <div class="auth-links">
            <a href="#" data-route="/">Já tenho uma conta</a>
          </div>
        </form>
        <div id="authError" class="error-message"></div>
      </div>
    </div>
  `

  document
    .getElementById('registerForm')
    .addEventListener('submit', handleRegister)
}

function showForgotPasswordPage() {
  document.body.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-container">
          <img src="img/TagOnLink.png" alt="TagOnLink" class="logo" />
          <h1>Recuperar Senha</h1>
        </div>
        <form id="forgotForm" class="auth-form">
          <div class="form-group">
            <label for="forgotEmail">Email</label>
            <input type="email" id="forgotEmail" required autocomplete="email" />
          </div>
          <button type="submit" class="btn btn-primary">Enviar Link de Recuperação</button>
          <div class="auth-links">
            <a href="#" data-route="/">Voltar ao login</a>
          </div>
        </form>
        <div id="authError" class="error-message"></div>
        <div id="authSuccess" class="success-message"></div>
      </div>
    </div>
  `

  document
    .getElementById('forgotForm')
    .addEventListener('submit', handleForgotPassword)
}

function showDashboard() {
  const user = authService.getUser()
  document.body.innerHTML = `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <div class="logo-header">
            <img src="img/TagOnLink.png" alt="TagOnLink" class="logo-small" />
            <h1>TagOnLink</h1>
          </div>
          <div class="header-actions">
            <span class="user-name">Olá, ${user?.name || 'Usuário'}!</span>
            <button id="themeToggle" class="btn-icon" title="Alternar tema"></button>
            <button id="logoutBtn" class="btn btn-secondary">Sair</button>
          </div>
        </div>
      </header>

      <main class="main-content">
        <div class="container">
          <section class="link-form-section">
            <h2 id="formTitle">Adicionar Novo Link</h2>
            <form id="linkForm" class="link-form">
              <input type="hidden" id="linkId" />
              <div class="form-row">
                <div class="form-group">
                  <label for="title">Título</label>
                  <input type="text" id="title" required placeholder="Ex: Site de Estudos" />
                </div>
                <div class="form-group">
                  <label for="url">URL</label>
                  <input type="url" id="url" required placeholder="https://www.exemplo.com" />
                </div>
              </div>
              <div class="form-group">
                <label for="description">Descrição</label>
                <textarea id="description" rows="2" placeholder="Descrição opcional do link"></textarea>
              </div>
              <div class="form-group">
                <label for="tags">Tags</label>
                <input type="text" id="tags" placeholder="ex: estudo, trabalho, importante" />
                <small>Separe as tags por vírgula</small>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">Salvar</button>
                <button type="button" id="resetBtn" class="btn btn-secondary">Cancelar</button>
              </div>
            </form>
          </section>

          <section class="links-section">
            <div class="section-header">
              <h2>Meus Links</h2>
              <div class="search-container">
                <input type="text" id="searchInput" placeholder="Buscar links..." />
              </div>
            </div>
            <div id="linkList" class="link-list"></div>
            <div id="emptyState" class="empty-state" style="display: none;">
              <p>Nenhum link salvo ainda.</p>
              <p>Adicione seu primeiro link acima!</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  `

  // Event listeners
  document
    .getElementById('themeToggle')
    .addEventListener('click', () => themeManager.toggle())
  document.getElementById('logoutBtn').addEventListener('click', handleLogout)
  document
    .getElementById('linkForm')
    .addEventListener('submit', handleSubmitLink)
  document.getElementById('resetBtn').addEventListener('click', resetForm)
  document.getElementById('searchInput').addEventListener('input', handleSearch)

  themeManager.init()
  fetchLinks()
}

// ========== HANDLERS ==========

async function handleLogin(e) {
  e.preventDefault()
  const errorDiv = document.getElementById('authError')
  errorDiv.textContent = ''

  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginPassword').value

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      authService.setAuth(data.token, data.user)
      router.navigate('/dashboard')
    } else {
      errorDiv.textContent = data.error || 'Erro ao fazer login'
    }
  } catch (error) {
    errorDiv.textContent = 'Erro de conexão. Tente novamente.'
  }
}

async function handleRegister(e) {
  e.preventDefault()
  const errorDiv = document.getElementById('authError')
  errorDiv.textContent = ''

  const name = document.getElementById('registerName').value
  const email = document.getElementById('registerEmail').value
  const password = document.getElementById('registerPassword').value

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      authService.setAuth(data.token, data.user)
      router.navigate('/dashboard')
    } else {
      errorDiv.textContent = data.error || 'Erro ao criar conta'
    }
  } catch (error) {
    errorDiv.textContent = 'Erro de conexão. Tente novamente.'
  }
}

async function handleForgotPassword(e) {
  e.preventDefault()
  const errorDiv = document.getElementById('authError')
  const successDiv = document.getElementById('authSuccess')
  errorDiv.textContent = ''
  successDiv.textContent = ''

  const email = document.getElementById('forgotEmail').value

  try {
    const res = await fetch(`${API}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (res.ok) {
      successDiv.textContent = data.message || 'Link de recuperação enviado!'
    } else {
      errorDiv.textContent = data.error || 'Erro ao processar solicitação'
    }
  } catch (error) {
    errorDiv.textContent = 'Erro de conexão. Tente novamente.'
  }
}

function handleLogout() {
  if (confirm('Deseja realmente sair?')) {
    authService.clearAuth()
    router.navigate('/')
  }
}

let allLinks = []

async function fetchLinks() {
  try {
    const token = authService.getToken()
    const res = await fetch(`${API}/links`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.ok) {
      allLinks = await res.json()
      renderLinks(allLinks)
    } else if (res.status === 401) {
      authService.clearAuth()
      router.navigate('/')
    }
  } catch (error) {
    console.error('Erro ao buscar links:', error)
  }
}

function renderLinks(links) {
  const list = document.getElementById('linkList')
  const emptyState = document.getElementById('emptyState')

  if (links.length === 0) {
    list.innerHTML = ''
    emptyState.style.display = 'block'
    return
  }

  emptyState.style.display = 'none'
  list.innerHTML = links
    .map(
      (link) => `
    <div class="link-card">
      <div class="link-preview">
        <iframe 
          src="${link.url}" 
          loading="lazy"
          sandbox="allow-same-origin allow-scripts allow-popups"
          title="Preview de ${link.title}"
          onload="this.onerror=null; this.style.opacity='1';"
          onerror="this.style.display='none'; const fallback = this.parentElement.querySelector('.preview-fallback'); if(fallback) fallback.style.display='flex';"
          style="opacity: 0; transition: opacity 0.3s;"
        ></iframe>
        <div class="preview-fallback" style="display: none;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
          <span>Preview não disponível</span>
        </div>
      </div>
      <div class="link-content">
        <div class="link-header">
          <a href="${
            link.url
          }" target="_blank" rel="noopener noreferrer" class="link-title">
            ${link.title}
          </a>
          <div class="link-actions">
            <button onclick='editLink(${
              link.id
            })' class="btn-icon" title="Editar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button onclick='deleteLink(${
              link.id
            })' class="btn-icon btn-danger" title="Excluir">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
        ${
          link.description
            ? `<p class="link-description">${link.description}</p>`
            : ''
        }
        ${
          link.tags
            ? `
          <div class="link-tags">
            ${link.tags
              .split(',')
              .map((t) => `<span class="tag">${t.trim()}</span>`)
              .join('')}
          </div>
        `
            : ''
        }
        <small class="link-date">${new Date(link.created_at).toLocaleDateString(
          'pt-BR'
        )}</small>
      </div>
    </div>
  `
    )
    .join('')
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase()
  const filtered = allLinks.filter(
    (link) =>
      link.title.toLowerCase().includes(query) ||
      link.description?.toLowerCase().includes(query) ||
      link.tags?.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query)
  )
  renderLinks(filtered)
}

async function handleSubmitLink(e) {
  e.preventDefault()
  const token = authService.getToken()
  const id = document.getElementById('linkId').value
  const data = {
    title: document.getElementById('title').value,
    url: document.getElementById('url').value,
    description: document.getElementById('description').value,
    tags: document.getElementById('tags').value,
  }

  const method = id ? 'PUT' : 'POST'
  const endpoint = id ? `${API}/links/${id}` : `${API}/links`

  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      resetForm()
      fetchLinks()
    } else {
      alert('Erro ao salvar link')
    }
  } catch (error) {
    alert('Erro de conexão')
  }
}

function resetForm() {
  document.getElementById('linkForm').reset()
  document.getElementById('linkId').value = ''
  document.getElementById('formTitle').textContent = 'Adicionar Novo Link'
}

async function editLink(id) {
  const link = allLinks.find((l) => l.id === id)
  if (!link) return

  document.getElementById('linkId').value = link.id
  document.getElementById('title').value = link.title
  document.getElementById('url').value = link.url
  document.getElementById('description').value = link.description || ''
  document.getElementById('tags').value = link.tags || ''
  document.getElementById('formTitle').textContent = 'Editar Link'

  document.getElementById('linkForm').scrollIntoView({ behavior: 'smooth' })
}

async function deleteLink(id) {
  if (!confirm('Deseja realmente excluir este link?')) return

  const token = authService.getToken()
  try {
    const res = await fetch(`${API}/links/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.ok) {
      fetchLinks()
    } else {
      alert('Erro ao excluir link')
    }
  } catch (error) {
    alert('Erro de conexão')
  }
}

// Expor funções globalmente para onclick
window.editLink = editLink
window.deleteLink = deleteLink

// ========== ROTAS ==========

router.addRoute('/', () => {
  if (authService.isAuthenticated()) {
    authService.verifyToken().then((valid) => {
      if (valid) {
        router.navigate('/dashboard')
      } else {
        showLoginPage()
      }
    })
  } else {
    showLoginPage()
  }
})

router.addRoute('/register', showRegisterPage)
router.addRoute('/forgot-password', showForgotPasswordPage)
router.addRoute('/dashboard', () => {
  if (authService.isAuthenticated()) {
    authService.verifyToken().then((valid) => {
      if (valid) {
        showDashboard()
      } else {
        router.navigate('/')
      }
    })
  } else {
    router.navigate('/')
  }
})

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  router.init()
})
