import Api from "@src/utils/Api";
import { formatDate } from "@src/utils/functions";
import { NotificationType } from "@src/utils/types";
export const fetchNotifications = async () => {
  try {
    const res = (await Api.get(`/notifications`)).data;
    res
      .sort((first: NotificationType, second: NotificationType) => {
        const date2 = new Date(second.createdAt).getTime();
        const date1 = new Date(first.createdAt).getTime();
        return date1 - date2;
      })
      .reverse();
    return res;
  } catch (error) {
    console.error("Error in notificaiton sevice", error);
  }
};
export const addNotification = async (
  userName: string,
  action: string,
  fileName: string | undefined,
  userId: number
) => {
  try {
    const message = `${userName} has ${action} ${fileName}`;
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    await Api.post("/notifications", {
      message: message,
      createdAt: formattedDate,
      userId: userId,
      isRead: false,
    });
    return true;
  } catch (error) {
    console.error("Error occured while adding notification : ", error);
    return false;
  }
};
