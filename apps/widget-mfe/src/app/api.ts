export async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      if (user?.id) {
        headers['x-user-id'] = user.id;
      }
    }
  }
  // Determinar a URL da API dinamicamente conforme o ambiente (local vs produção)
  let apiBase = 'http://localhost:3001/api';
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    apiBase = 'https://api.stackevo.com.br/api';
  }

  const response = await fetch(`${apiBase}${endpoint}`, {
    headers,
  });
  if (!response.ok) {
    throw new Error(`Erro na API: ${endpoint}`);
  }
  return response.json();
}
