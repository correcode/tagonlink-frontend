const API = 'https://tagonlink-backend.vercel.app/api'
const form = document.getElementById('linkForm')
const list = document.getElementById('linkList')
const resetBtn = document.getElementById('resetBtn')

document.addEventListener('DOMContentLoaded', fetchLinks)

async function fetchLinks() {
  const res = await fetch(`${API}/links`)
  const data = await res.json()
  renderLinks(data)
}

function renderLinks(links) {
  list.innerHTML = links
    .map(
      (link) => `
    <li class='link-item'>
      <div class='link-info'>
        <a href='${link.url}' target='_blank'><strong>${link.title}</strong></a>
        <p>${link.description || ''}</p>
        <div>${(link.tags || '')
          .split(',')
          .map((t) => `<small class='tag'>${t.trim()}</small>`)
          .join('')}</div>
      </div>
      <div>
        <button onclick='editLink(${link.id})'>Editar</button>
        <button onclick='deletLink(${link.id})'>Excluir</button>
      </div>
    </li>`
    )
    .join('')
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = document.getElementById('linkId').value
  const data = {
    title: document.getElementById('title').value,
    url: document.getElementById('url').value,
    description: document.getElementById('description').value,
    tags: document.getElementById('tags').value,
  }

  const method = id ? 'PUT' : 'POST'
  const endpoint = id ? `${API}/links/${id}` : `${API}/links`

  await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  form.reset()
  document.getElementById('linkId').value = ''
  fetchLinks()
})

resetBtn.addEventListener('click', () => {
  form.reset()
  document.getElementById('linkId').value = ''
})

async function editLink(id) {
  const res = await fetch(`${API}/links`)
  const links = await res.json()
  const link = links.find((l) => l.id === id)
  document.getElementById('linkId').value = link.id
  document.getElementById('title').value = link.title
  document.getElementById('url').value = link.url
  document.getElementById('description').value = link.description
  document.getElementById('tags').value = link.tags
}

async function deletLink(id) {
  if (confirm('Deseja realmente excluir?')) {
    await fetch(`${API}/links/${id}`, { method: 'DELETE' })
    fetchLinks()
  }
}
