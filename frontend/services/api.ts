export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'

export async function fetcher<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`)
    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
    }
    return response.json()
}
