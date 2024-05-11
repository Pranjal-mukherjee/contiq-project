export type NotificationType = {
  id: number;
  createdAt: string;
  message: string;
  isRead: boolean;
  userId: number;
};
export type FileType = {
  fileId: number;
  fileName: string;
  fileType: string;
  filePath: string;
  uploadedAt: string;
  userId: number;
  searchTexts: String[];
};
export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  notificationCount: number;
};
export type DriveFileType = {
  fileId: string | undefined;
  fileName: string;
  fileType: string;
  filePath: string;
  userId: number;
};
