const API_BASE_URL = process.env.NEXT_API_BASE_URL;

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 401) {
      console.warn("Unauthorized, redirecting to login...");
      window.location.href = "/login";
    }
    const errorText = await res.text();
    throw new Error(errorText || `Error: ${res.status}`);
  }

  return res.json();
};
