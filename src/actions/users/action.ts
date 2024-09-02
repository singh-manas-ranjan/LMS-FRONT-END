"use server";

import { TUser } from "@/app/ui/navbar/Navbar";
import axios from "axios";

async function fetchAllUsers(
  userRole: "students" | "instructors"
): Promise<TUser[]> {
  try {
    const users: TUser[] = await axios
      .get(`http://localhost:3131/api/v1/${userRole}`)
      .then((res) => res.data.body);
    return users;
  } catch (error) {
    console.error(`Error fetching users for ${userRole}:`, error);
    return [] as TUser[];
  }
}

const getUserByEmail = async (email: string, accountType: string) => {
  try {
    return await axios
      .get(`http://localhost:3131/api/v1/${accountType}/${email}`)
      .then((res) => res.data.body);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { fetchAllUsers, getUserByEmail };
