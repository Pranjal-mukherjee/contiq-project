import Api from "@src/utils/Api";
import { DriveFileType } from "@src/utils/types";
export const fetchFilesByUserId = async (userId: number) => {
  try {
    const fileData = await Api.get(`/files/${userId}`);
    return fileData.data;
  } catch (error) {
    console.error("Error occured in fetching files");
  }
};

export const fetchFilesById = async (id: number) => {
  try {
    const fileData = await Api.get(`/files/${id}`);
    return fileData.data;
  } catch (error) {
    console.error("Error occured in fetching files");
  }
};

export const deleteFile = async (id: number) => {
  try {
    await Api.delete(`/files/${id}`);
    return true;
  } catch (error) {
    console.error("Error occured in fetching files");
    return false;
  }
};

export const postFile = async (
  name: string | undefined,
  filePath: string | undefined,
  type: string | undefined,
  user_id: number | undefined,
  file?: File | null
) => {
  try {
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("filename", name || "");

    const response = await Api.post(`/files/${user_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred in posting file:", error);
    return false;
  }
};

export const fetchFilesBySearch = async (text: string, userId: string) => {
  try {
    const fileData = await Api.get(`/files/search/${userId}?text=${text}`);
    return fileData.data;
  } catch (error) {
    console.error("Error occured in fetching files");
  }
};

export const fetchFilesByNameAndId = async (name: string, userId: number) => {
  try {
    const response = await Api.get(`/files/resource/1?fileName=sample.pdf`, {
      responseType: "arraybuffer",
    });

    const arrayBuffer = response.data;

    const blob = new Blob([arrayBuffer], { type: "pdf" });

    const file = new File([blob], name, { type: "pdf" });

   

    return blob;
  } catch (error) {
    console.error("Error occured in fetching files");
  }
}
export const uploadFileFromDrive = async (
  metadataObject: DriveFileType
) => {
  try {
    const response = await Api.post("/files/drive", {
      metadata: JSON.stringify(metadataObject),
    },{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
