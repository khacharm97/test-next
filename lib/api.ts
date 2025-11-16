import { RegisterUserDto, User, ApiError } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  if (!response.ok) {
    const error: ApiError = isJson
      ? await response.json()
      : { message: `HTTP error! status: ${response.status}` };
    throw error;
  }

  if (isJson) {
    return response.json();
  }

  return {} as T;
}

export async function registerUser(
  data: RegisterUserDto
): Promise<{ message?: string; user?: User }> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<{ message?: string; user?: User }>(response);
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/auth/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return handleResponse<User[]>(response);
}

