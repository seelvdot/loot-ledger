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
  const response = await fetch(`http://localhost:3001/api${endpoint}`, {
    headers,
  });
  if (!response.ok) {
    throw new Error(`Erro na API: ${endpoint}`);
  }
  return response.json();
}
