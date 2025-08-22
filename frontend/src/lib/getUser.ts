import { IUser } from "@/type/user";

export async function getCurrentUser():Promise<IUser | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, { credentials: 'include' });
    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}