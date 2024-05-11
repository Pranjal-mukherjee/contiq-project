import HeaderBar from "@components/organisms/Header";
import PDFViewer from "@components/organisms/PDFViewer";
import SideBar from "@components/organisms/Sidenavbar";
import HomeTemplate from "@components/templates/Home";
import { NAVIGATE_FILES } from "@src/utils/constants";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PDFPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number>(1);
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    const JSONData = localStorage.getItem("user");
    if (JSONData) {
      const data = JSON.parse(JSONData);
      const userId = data.id;
      const userName = data.name;
      setUserId(userId);
      setUserName(userName);
    }
  }, []);
  return (
    <HomeTemplate
      header={<HeaderBar userName={userName} userId={userId?.toString()} />}
      sidebar={<SideBar />}
      mainContent={
        <PDFViewer
          fileName={location.state.fileName}
          onNavBack={() => {
            navigate(NAVIGATE_FILES, {
              state: {},
            });
          }}
          filePath={location.state.filePath}
          searchKey={location.state.searchKey}
          searchContent={location.state.searchTexts}
        />
      }
    />
  );
};

export default PDFPage;
