import ImageComponent from "@components/atoms/Image";
import CustomTypography from "@components/atoms/Typography";
import FileCard from "@components/molecules/FileCard";
import HeaderBar from "@components/organisms/Header";
import SideBar from "@components/organisms/Sidenavbar";
import HomeTemplate from "@components/templates/Home";
import { Box, styled } from "@mui/material";
import { fetchFilesByUserId } from "@src/services/FileService";
import theme from "@src/theme";
import { RECENT, SIDE_BAR_LABELS } from "@src/utils/constants";
import { FileType } from "@src/utils/types";
import { useEffect, useState } from "react";
import Empty from "../../../public/assets/images/empty state.svg";
const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "170px",
  width: "100%",
  height: "100%",
});
const Header = styled(Box)({
  display: "flex",
  padding: "25px 0px 20px 40px",
  justifyContent: "start",
  width: "100%",
});
const CardContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "25px 0px 20px 40px",
  gap: "25px",
});
const CardWrapper = styled(Box)({
  flexWrap: "wrap",
  display: "flex",
  gap: "25px",
  overflowY: "scroll",
  maxHeight: "635px",
  "&::-webkit-scrollbar": {
    width: "0.5em",
    height: "0.6em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grays.gray100,
    borderRadius: "12px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grays.gray600,
    borderRadius: "12px",
    width: "16px",
    border: `3px solid ${theme.palette.grays.gray600}`,
  },
});

const RootContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  height: "100%",
});

const recentfiles = (recentFiles: FileType[]) => (
  <RootContainer>
    <Header>
      <CustomTypography variant="h2" color={theme.palette.text.black}>
        {SIDE_BAR_LABELS[0]}
      </CustomTypography>
    </Header>
    <CardContainer>
      <CustomTypography variant="h3" color={theme.palette.text.lowEmphasis}>
        {RECENT}
      </CustomTypography>
      <CardWrapper>
        {recentFiles.map((value: FileType) => (
          <FileCard fileName={value.fileName} key={value.fileId} />
        ))}
      </CardWrapper>
    </CardContainer>
  </RootContainer>
);
const emptystate = () => (
  <MainContainer>
    <Header>
      <CustomTypography variant="h2" color={theme.palette.text.black}>
        {SIDE_BAR_LABELS[0]}
      </CustomTypography>
    </Header>
    <ImageComponent imgSrc={Empty} />
  </MainContainer>
);

const HomePage = () => {
  const [recentFiles, setRecentFiles] = useState<FileType[]>([]);
  const [userId, setUserId] = useState<number>(1);
  const [userName, setUserName] = useState<string>("");
  const fetchData = async (userId: number) => {
    const res = await fetchFilesByUserId(userId);
    setRecentFiles(res.files);
  };
  useEffect(() => {
    const JSONData = localStorage.getItem("user");
    if (JSONData) {
      const data = JSON.parse(JSONData);
      const userId = data.id;
      const userName = data.name;
      setUserId(userId);
      setUserName(userName);
      fetchData(userId);
    }
  }, []);
  return (
    <Box data-testid="test-home">
      <HomeTemplate
        header={<HeaderBar userName={userName} userId={userId?.toString()} />}
        sidebar={<SideBar />}
        mainContent={
          recentFiles?.length ? recentfiles(recentFiles) : emptystate()
        }
      />
    </Box>
  );
};

export default HomePage;
