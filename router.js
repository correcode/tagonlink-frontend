// Sistema de rotas simples
class Router {
  constructor() {
    this.routes = {}
    this.currentRoute = null
  }

  addRoute(path, handler) {
    this.routes[path] = handler
  }

  navigate(path) {
    if (this.routes[path]) {
      this.currentRoute = path
      window.history.pushState({}, '', path)
      this.routes[path]()
    }
  }

  init() {
    // Navegação inicial
    const path = window.location.pathname || '/'
    if (this.routes[path]) {
      this.routes[path]()
    } else {
      this.routes['/']()
    }

    // Interceptar cliques em links
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-route]')) {
        e.preventDefault()
        const path = e.target.getAttribute('data-route')
        this.navigate(path)
      }
    })

    // Interceptar navegação do browser
    window.addEventListener('popstate', () => {
      const path = window.location.pathname || '/'
      if (this.routes[path]) {
        this.routes[path]()
      }
    })
  }
}

const router = new Router()
export default router

