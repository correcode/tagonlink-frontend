# Configuração da URL da API

## Detecção Automática

O sistema detecta automaticamente a URL da API baseado no hostname:

- **Localhost**: `http://localhost:3000/api` (ou porta configurada)
- **Vercel**: Detecta automaticamente o subdomínio do backend

## Configuração Manual

Se a detecção automática não funcionar, você pode configurar manualmente:

### Opção 1: Meta Tag no HTML

Edite `index.html` e adicione a URL completa no meta tag:

```html
<meta name="api-url" content="https://seu-backend.vercel.app/api" />
```

### Opção 2: Variável de Ambiente (se usar build tool)

Se estiver usando Vite ou similar, crie um arquivo `.env`:

```
VITE_API_URL=https://seu-backend.vercel.app/api
```

## Verificação

Abra o Console do navegador (F12) e verifique:

1. A mensagem: `API URL configurada: [sua-url]`
2. Se aparecer erros de conexão, verifique se a URL está correta
3. Teste fazendo login - os logs mostrarão a URL sendo usada

## Troubleshooting

- **Erro CORS**: Verifique se o backend permite a origem do frontend
- **404 Not Found**: Verifique se a URL da API está correta
- **Connection Refused**: Verifique se o backend está rodando
