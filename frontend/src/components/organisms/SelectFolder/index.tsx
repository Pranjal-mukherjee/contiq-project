import Button from "@components/atoms/Button";
import IconComponent from "@components/atoms/Icon";
import CustomTypography from "@components/atoms/Typography";
import RadioButtonGroup from "@components/molecules/RadioButtonGroup";
import {
  ButtonGroup,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import theme from "@src/theme";
import {
  BACK_BUTTON,
  FOLDER_TITLE,
  FORM_CONTENT,
  SYNC_BUTTON,
} from "@src/utils/constants";
import { useEffect, useState } from "react";
import Close from "../../../../public/assets/icons/closeIcon.svg";
import {
  ButtonContainer,
  CenteredContainer,
  HeaderBox,
  HeaderContainer,
  MainContainer,
  RadioContainer,
  RootContainer,
  Scrollbar,
} from "./styledUtils";

import LeftArrow from "@assets/icons/LeftArrow.svg";
import FolderCard from "@components/molecules/DriveFolder";
import {
  uploadFileFromDrive,
} from "@src/services/FileService";
import { addNotification } from "@src/services/NotificationService";
import { DriveFileType } from "@src/utils/types";
export interface FolderDataType {
  id: string;
  name: string;
}
export interface CloudFileType {
  id: string;
  name: string;
  parents: string[];
}
export interface SelectFolderProps {
  folderData: FolderDataType[];
  fileData: CloudFileType[];
  callBackFromParent: any;
  refetchData?: () => void;
}
const SelectFolder = ({
  folderData,
  fileData,
  callBackFromParent,
  refetchData,
}: SelectFolderProps) => {
  const [title, setTitle] = useState(FOLDER_TITLE);
  const [showFolder, setShowFolder] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showFileData, setShowFileData] = useState<CloudFileType[]>(fileData);
  const handleClickFolder = (item: string) => {
    setShowFolder(false);
    fileData = fileData.filter((value: CloudFileType) =>
      value.parents.includes(item)
    );
    setShowFileData(fileData);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleArrow = () => {
    setTitle(FOLDER_TITLE);
    setShowFolder(true);
  };

  const handleCheckbox = (item: string) => {
    if (selectedFiles.includes(item)) {
      setSelectedFiles((prevSelectedFiles) =>
        prevSelectedFiles.filter((file) => file !== item)
      );
    } else {
      setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, item]);
    }
  };
  
  const uploadFiles = async (
    name: string,
    user_id: number,
    userName: string
  ) => {
    const file = showFileData.find((item)=>item.name === name);
    const fileData: DriveFileType = {
      fileId: file?.id,
      fileName: name,
      fileType: "pdf",
      filePath: "",
      userId: user_id
    }
    const postRes = await uploadFileFromDrive(fileData)
    if (postRes) {
      const res = await addNotification(userName, "uploaded", name, user_id);
    }
  };
  const handleSyncFiles = async () => {
    const JSONData = localStorage.getItem("user");
    if (JSONData) {
      const data = JSON.parse(JSONData);
      const uploadPromises = selectedFiles.map(
        async (fileName: string) => await uploadFiles(fileName, data.id, data.name)
      );
      await Promise.all(uploadPromises);
    }
    setShowModal(false);
    if (refetchData) {
      refetchData();
    }
  };
  useEffect(() => {
    callBackFromParent(selectedFiles);
  }, [selectedFiles, callBackFromParent]);
  return (
    <Dialog open={showModal}>
      <CenteredContainer
        sx={{
          display: showModal ? "" : "none",
        }}
        data-testid="
      test-container"
      >
        <RootContainer>
          <HeaderContainer>
            <HeaderBox>
              <IconComponent
                src={LeftArrow}
                onclick={() => (showFolder ? handleClose() : handleArrow())}
                data-tesid="test-icon"
              />
              <CustomTypography
                children={title}
                variant="h3"
                sx={{ color: theme.palette.text.white }}
              />
            </HeaderBox>
            <IconComponent
              src={Close}
              onclick={handleClose}
              data-testid={"test-close"}
              height="14px"
              width="14px"
            />
          </HeaderContainer>
          <Divider
            variant="fullWidth"
            sx={{ color: theme.palette.grays.gray300, height: "1px" }}
          />
          <MainContainer data-testid="test-folder">
            {showFolder && (
              <>
                <CustomTypography
                  children={FORM_CONTENT}
                  variant="body2"
                  sx={{ color: theme.palette.text.white }}
                  paddingLeft={"22px"}
                  paddingTop={"16px"}
                />
                <RadioContainer>
                  <RadioButtonGroup />
                </RadioContainer>
              </>
            )}
            <Scrollbar>
              {showFolder ? (
                <List>
                  {folderData.map((item: any) => (
                    <ListItem
                      key={item.name}
                      sx={{ padding: "4px 2px 3px 4px" }}
                    >
                      <ListItemButton
                        data-testid="listItemButton"
                        onClick={() => {
                          handleClickFolder(item.id);
                          setTitle(item.name);
                        }}
                      >
                        <FolderCard
                          name={item.name}
                          isFile={false}
                          onChangeFiles={() => {}}
                          data-testid="test-click"
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <List data-testid="test-file">
                  {showFileData.map((item) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemButton>
                          <FolderCard
                            name={item.name}
                            isFile={true}
                            onChangeFiles={() => {
                              handleCheckbox(item.name);
                            }}
                            isChecked={selectedFiles.includes(item.name)}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </Scrollbar>
          </MainContainer>
          <ButtonGroup>
            <ButtonContainer>
              <Button
                text={BACK_BUTTON}
                variant={"outlined"}
                onClick={() => {
                  showFolder ? handleClose() : handleArrow();
                }}
                sx={{
                  fontFamily: theme.typography.body1,
                  textTransform: "none",
                  fontSize: "12px",
                  border: `1px solid ${theme.palette.grays.gray200}`,
                  color: theme.palette.grays.gray200,
                  background: theme.palette.grays.gray400,
                  "&:hover": {
                    border: `1px solid ${theme.palette.grays.gray200}`,
                    color: theme.palette.grays.gray200,
                    background: theme.palette.grays.gray400,
                  },
                }}
              />
              <Button
                text={SYNC_BUTTON}
                variant={"contained"}
                disabled={selectedFiles.length <= 0}
                sx={{
                  fontFamily: theme.typography.body1,
                  fontSize: "12px",
                  textTransform: "none",
                  "&.Mui-disabled": {
                    background: theme.palette.primary.light,
                  },
                  "&:hover": {
                    background: theme.palette.primary.main,
                  },
                }}
                onClick={handleSyncFiles}
                data-testid="test-sync"
              />
            </ButtonContainer>
          </ButtonGroup>
        </RootContainer>
      </CenteredContainer>
    </Dialog>
  );
};

export default SelectFolder;
