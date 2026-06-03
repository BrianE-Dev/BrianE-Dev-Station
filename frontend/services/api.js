export const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
  };

  const init = {
    ...options,
    headers,
  };

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    typeof options.body !== "string"
  ) {
    headers["Content-Type"] ??= "application/json";
    init.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, init);
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.message || response.statusText || "API request failed.";
    throw new Error(message);
  }

  return payload;
}

export function fetcher(path, options) {
  return request(path, options);
}

export function getCourses() {
  return fetcher("/courses");
}

export function login(credentials) {
  return request("/auth/login", { method: "POST", body: credentials });
}

export function signup(credentials) {
  return request("/auth/signup", { method: "POST", body: credentials });
}

export function getMe(token) {
  return request("/auth/me", { headers: { Authorization: `Bearer ${token}` } });
}
