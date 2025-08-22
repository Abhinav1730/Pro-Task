const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
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

    const contentType = res.headers.get("content-type");

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      console.error("API error response:", data);
      throw new Error(data?.message || `Error: ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error("FetchWithAuth error:", err);
    throw err;
  }
};