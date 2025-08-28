// client/utils/api.js
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function fetchWithAuth(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include", // send cookies
    headers: {
      "content-type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("API error response:", res.status, errText);
    throw new Error(String(res.status));
  }

  return res.json();
}