import LeftArrow from "@assets/icons/LeftArrow.svg";
import Close from "@assets/icons/closeIcon.svg";
import IconComponent from "@components/atoms/Icon";
import CustomTypography from "@components/atoms/Typography";
import FileUpload from "@components/molecules/FileDrop";
import MuiTabs from "@components/molecules/MuiTabs";
import ProgressBarModal from "@components/molecules/ProgressBarModal";
import SyncProgress from "@components/molecules/SyncProgress";
import { Box, Dialog, Divider, styled } from "@mui/material";
import { fetchFilesByUserId, postFile } from "@src/services/FileService";
import { addNotification } from "@src/services/NotificationService";
import theme from "@src/theme";
import { UPLOAD_FILES, UPLOAD_TAB } from "@src/utils/constants";
import { FileType } from "@src/utils/types";
import { ChangeEvent, useState } from "react";
import CloudStorage from "../CloudStorage";
import DuplicationModal from "../DuplicationModal";
import SelectFolder from "../SelectFolder";

export interface UploadFilesProps {
  refetchData?: () => void;
}
const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  height: "550px",
  width: "700px",
  background: theme.palette.grays.gray400,
  gap: "20px",
});
const HeaderContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "25px 30px 25px 27px",
});
const HeaderBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",

  gap: "10px",
});

const UploadFiles = (props: UploadFilesProps) => {
  const [open, isOpen] = useState<boolean>(true);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState<boolean>(false);
  const [showProgressBarModal, setShowProgressBarModal] =
    useState<boolean>(false);
  const [showSyncProgress, setShowSyncProgress] = useState<boolean>(false);
  const [showFolderSection, setShowFolderSection] = useState<boolean>(false);
  const [cloudFolderData, setCloudFolderData] = useState<any[]>([]);
  const [cloudFilesData, setCloudFilesData] = useState<any[]>([]);
  const [matchingFile, setMatchingFile] = useState<any>();
  const JSONData = localStorage.getItem("user") ?? "";
  let data: { id: number; name: string; notification_count: number };

  if (JSONData) {
    data = JSON.parse(JSONData);
  }

  const handleClose = () => {
    isOpen(false);
  };
  const uploadFile = async () => {
    const postRes = await postFile(
      selectedFile?.name,
      `./files/${selectedFile?.name}`,
      "pdf",
      data.id,
      selectedFile
    );

    if (!postRes.message) {
      window.alert("Some error occured1");
    }
    const res = await addNotification(
      data.name,
      "uploaded",
      selectedFile?.name,
      data.id
    );
    if (res) {
      setShowProgressBarModal(true);
    } else {
      window.alert("Some error occured2");
    }
  };
  const handleUpload = async (name: string) => {
    const JSONData = localStorage.getItem("user");
    if (JSONData) {
      const data = JSON.parse(JSONData);
    }
    const filesForUser = await fetchFilesByUserId(data.id);
    const foundFile = filesForUser.files.find(
      (item: FileType) => item.fileName === name
    );
    if (foundFile) {
      setShowDuplicateModal(true);
      setMatchingFile({
        name: foundFile.fileName,
        id: foundFile.fileId,
        filePath: foundFile.filePath,
        user_id: foundFile.userId,
      });
    } else {
      uploadFile();
    }
    isOpen(false);
  };
  const handleCancelModal = () => {
    setSelectedFile(null);
    setShowDuplicateModal(false);
    isOpen(true);
  };
  const handleProgressClose = () => {
    props.refetchData && props.refetchData();
    setShowProgressBarModal(false);
    isOpen(false);
  };
  const handleDataReceived = (folder: any[], file: any[]) => {
    setShowSyncProgress(true);
    isOpen(false);
    setTimeout(() => {
      setShowSyncProgress(false);
      setShowFolderSection(true);
      setCloudFolderData(folder);
      setCloudFilesData(file);
    }, 3000);
  };
  const handleUpdateFile = async () => {
    const updateRes = await postFile(
      matchingFile.fileName,
      matchingFile.filePath,
      "pdf",
      matchingFile.userId,
      matchingFile
    );
    

    const res = await addNotification(
      data.name,
      "updated",
      selectedFile?.name,
      data.id
    );
    if (res) {
      setShowProgressBarModal(true);
      setShowDuplicateModal(false);
    } else {
      window.alert("Some error occured3");
    }
  };
  return (
    <>
      {showDuplicateModal && (
        <DuplicationModal
          fileName={selectedFile}
          clickToCancel={handleCancelModal}
          clickToUpload={handleUpdateFile}
        />
      )}
      {showProgressBarModal && (
        <ProgressBarModal
          open={true}
          onClose={handleProgressClose}
          fileName={selectedFile}
        />
      )}
      {showSyncProgress && (
        <SyncProgress
          isDailogOpen={true}
          handleCloseClick={() => {
            setShowSyncProgress(false);
            setShowFolderSection(true);
            isOpen(false);
          }}
        />
      )}
      {showFolderSection && (
        <SelectFolder
          fileData={cloudFilesData}
          folderData={cloudFolderData}
          callBackFromParent={(item: string) => console.log(item)}
          refetchData={props.refetchData}
        />
      )}
      <Dialog open={open} maxWidth="xl">
        <MainContainer data-testid="test-container">
          <HeaderContainer>
            <HeaderBox>
              <IconComponent src={LeftArrow} />
              <CustomTypography variant="h3" color={theme.palette.text.white}>
                {UPLOAD_FILES}
              </CustomTypography>
            </HeaderBox>
            <IconComponent src={Close} onclick={handleClose} />
          </HeaderContainer>
          <Box>
            <Divider
              orientation="horizontal"
              style={{ background: theme.palette.grays.gray300 }}
            />
            <MuiTabs
              variant={"fullWidth"}
              tabNames={UPLOAD_TAB}
              onSelectTab={() => {}}
              handleChange={(event, newValue) => setTabIndex(newValue)}
              selectIndex={tabIndex}
              selectedColor={theme.palette.text.white}
              backgroundColor={theme.palette.grays.gray400}
              notSelectedColor={theme.palette.text.mediumEmphasis}
            />
            <Divider
              orientation="horizontal"
              style={{ background: theme.palette.grays.gray300 }}
            />
          </Box>
          {!tabIndex ? (
            <FileUpload
              selectedFile={selectedFile}
              handleFileChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0] ?? null;
                setSelectedFile(file);
              }}
              onClickUpload={handleUpload}
            />
          ) : (
            <CloudStorage onDataReceived={handleDataReceived} />
          )}
        </MainContainer>
      </Dialog>
    </>
  );
};

export default UploadFiles;
