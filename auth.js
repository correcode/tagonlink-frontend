class AuthService {
  constructor() {
    this.tokenKey = 'tagonlink_token'
    this.userKey = 'tagonlink_user'
  }

  getToken() {
    return localStorage.getItem(this.tokenKey)
  }

  getUser() {
    const userStr = localStorage.getItem(this.userKey)
    return userStr ? JSON.parse(userStr) : null
  }

  setAuth(token, user) {
    localStorage.setItem(this.tokenKey, token)
    localStorage.setItem(this.userKey, JSON.stringify(user))
  }

  clearAuth() {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.userKey)
  }

  isAuthenticated() {
    return !!this.getToken()
  }

  async verifyToken() {
    const token = this.getToken()
    if (!token) return false

    try {
      const API = window.API
      if (!API) return false

      const res = await fetch(`${API}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        const data = await res.json()
        this.setAuth(token, data.user)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }
}

const authService = new AuthService()
export default authService
