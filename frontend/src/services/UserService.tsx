import Api from "@src/utils/Api";
import { BACKEND_URL } from "@src/utils/constants";
import axios from "axios";
export const verifyUser = async (email: string) => {
  try {
    const existingUser = (await Api.get(`/users?email=${email}`)).data;
    const newUser = {
      name: existingUser.name,
      id: existingUser.id,
      notification_count: existingUser.notificationCount,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    return existingUser;
  } catch (e) {
    return false;
  }
};
export const updatePassword = async (email: string, password: string) => {
  try {
    const user = await verifyUser(email);
    if (user) {
      Api.patch(`/users/reset-password?email=${email}`, { password: password });
    }

    return true;
  } catch (error) {
    return false;
  }
};
export const addNewUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    await Api.post(`/users/signup`, {
      name: username,
      email: email,
      password: password,
      notificationCount: 0,
    });
    const existingUser = await verifyUser(email);
    if (existingUser) {
      return true;
    }
  } catch (error) {
    console.error("error posting data for user : ", error);
    return false;
  }
};
export const updateNotificationsOnClick = async (
  userId: number,
  newCount: number
) => {
  try {
    await Api.patch(`/users/${userId}`, {
      notificationCount: newCount,
    });
  } catch (error) {
    console.error("Error fetchong notifications", error);
  }
};
export const generateTokenForUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/users/login`, {
      email: email,
      password: password,
    });
    return res.data;
  } catch (error) {
    console.error("Error occurred while token generation");
  }
};
