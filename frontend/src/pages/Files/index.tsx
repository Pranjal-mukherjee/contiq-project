import HeaderBar from "@components/organisms/Header";
import SideBar from "@components/organisms/Sidenavbar";
import HomeTemplate from "@components/templates/Home";
import FilesPage from "./FilePageUtils";
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from "react";

export type File = {
  id: number;
  name: string;
  type: string;
  uploadedAt: string;
  user_id: number;
  filePath: string;
};

const FilePage = () => {
  const [userId, setUserId] = useState<number>(1);
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    const JSONData = localStorage.getItem("user");
    if (JSONData) {
      const data = JSON.parse(JSONData);
      setUserId(data.id);
      setUserName(data.name);
    }
  }, []);
  return (
    <HomeTemplate
      header={<HeaderBar userName={userName} userId={userId?.toString()} />}
      sidebar={<SideBar />}
      mainContent={<FilesPage />}
    />
  );
};

export default FilePage;
