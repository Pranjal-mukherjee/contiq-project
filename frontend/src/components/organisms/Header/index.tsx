import ImageComponent from "@components/atoms/Image";
import InputField from "@components/atoms/InputField";
import SearchDropDownList from "@components/molecules/SearchDropDownList";
import {
  Badge,
  BadgeProps,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  styled,
} from "@mui/material";
import { fetchFilesBySearch } from "@src/services/FileService";
import { fetchNotifications } from "@src/services/NotificationService";
import { updateNotificationsOnClick } from "@src/services/UserService";
import theme from "@src/theme";
import { APP_NAME, BACKEND_URL, NAVIGATE_PDF } from "@src/utils/constants";
import { FileType, NotificationType } from "@src/utils/types";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUserIcon from "../../../../public/assets/icons/addUser.svg";
import HelpIcon from "../../../../public/assets/icons/help.svg";
import NotificationIcon from "../../../../public/assets/icons/notification.svg";
import SearchIcon from "../../../../public/assets/icons/search.svg";
import NotificationCard from "../NotificationCard";
import UserProfileDropdown from "../UserProfile";

export interface IHeaderBarProps extends BadgeProps {
  userName: string;
  userId: string | undefined;
}
const StyledSearchBox = styled(InputField)(() => ({
  borderRadius: "6px",
  backgroundColor: `rgba(255, 255, 255, 0.2)`,
  "& fieldset": { border: "none" },
  width: "352px",
}));
const StyledIconBox = styled(Box)({
  display: "flex",
  backgroundColor: `rgba(255, 255, 255, 0.2)`,
  borderRadius: theme.spacing(2),
  width: "53px",
  height: "100%",
});
const StyledIconButton = styled(IconButton)({
  width: "100%",
});
const HeaderBar = (props: IHeaderBarProps) => {
  const [isNotificationModalVisible, setIsNotificationModalVisible] =
    useState<boolean>(false);
  const [isSearchListVisible, setIsSearchListVisible] =
    useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<
    number | undefined
  >(0);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [filesData, setFilesData] = useState<FileType[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const handleClickNotification = async () => {
    notificationCount
      ? setIsNotificationModalVisible(true)
      : setIsNotificationModalVisible(false);
    const updatedNotification = await fetchNotifications();
    const JSONData = localStorage.getItem("user");
    if (updatedNotification && JSONData && notificationCount) {
      const data = JSON.parse(JSONData);
      const updateLocalStorage = {
        name: data.name,
        id: data.id,
        notification_count: updatedNotification.length,
      };
      localStorage.setItem("user", JSON.stringify(updateLocalStorage));
      updateNotificationsOnClick(data.id, updatedNotification.length);
    }
  };

  const handleTextChange = useCallback(
    debounce(async (e: any) => {
      const value = e.target.value;
      value.length
        ? setIsSearchListVisible(true)
        : setIsSearchListVisible(false);
      fetchFiles(value);
      setSearchText(value);
    }, 1000),
    []
  );

  const fetchFiles = async (text: string) => {
    const userData = localStorage.getItem("user");
    let userId = "";
    if (userData) {
      const data = JSON.parse(userData);
      userId = data.id;
    }
    const res = await fetchFilesBySearch(text, userId);
    setFilesData(res);
  };

  const [render, setRender] = useState<number>(1);
  const fetchData = async () => {
    const res = await fetchNotifications();
    const JSONData = localStorage.getItem("user");
    if (JSONData) {
      const data = JSON.parse(JSONData);
      setNotificationCount(res?.length - data.notification_count);
      res?.splice(res?.length-data.notification_count,data.notification_count)
    }
    setNotifications(res);
  };
  useEffect(() => {
    setTimeout(() => {
      setRender(render + 1);
    }, 500);
    fetchData();
  }, [render]);

  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState<boolean>(false);

  async function handleClick(
    name: string,
    filePath: string,
    searchTexts: String[],
    userId: number
  ) {
    setIsClicked(!isClicked);
    navigate(NAVIGATE_PDF, {
      state: {
        fileName: name,
        filePath:
          BACKEND_URL + "/files/resource/" + userId + "?fileName=" + name,
        searchKey: searchText,
        searchTexts: searchTexts,
      },
    });
  }

  return (
    <>
      <Box
        display={"flex"}
        sx={{
          background: `var(--accent-gradient, linear-gradient(174deg, ${theme.palette.gradient.light} 10.18%, ${theme.palette.gradient.dark} 108.2%));`,
        }}
        justifyContent={"space-between"}
        padding={theme.spacing(2)}
        data-testid="test-header"
      >
        <Typography
          variant="h3"
          color={"white"}
          alignSelf={"center"}
          marginLeft={"15px"}
        >
          {APP_NAME}
        </Typography>
        <Box display={"flex"} gap={theme.spacing(5)} marginRight={"15px"}>
          <StyledSearchBox
            id="search-bar"
            placeholder="Search"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ImageComponent imgSrc={SearchIcon} imgAlt="help.svg" />
                </InputAdornment>
              ),
              style: { color: "white" },
            }}
            onChange={handleTextChange}
            data-testid="test-input"
          />

          <StyledIconBox>
            <StyledIconButton sx={{ width: "100%" }}>
              <ImageComponent imgSrc={HelpIcon} imgAlt="help.svg" />
            </StyledIconButton>
          </StyledIconBox>

          <StyledIconBox>
            <StyledIconButton sx={{ width: "100%" }}>
              <ImageComponent imgSrc={AddUserIcon} imgAlt="addUser.svg" />
            </StyledIconButton>
          </StyledIconBox>

          <StyledIconBox>
            <StyledIconButton
              sx={{ width: "100%" }}
              onClick={handleClickNotification}
              key={render}
            >
              <Badge
                badgeContent={notificationCount ?? null}
                color="error"
                overlap="rectangular"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 9,
                    height: 15,
                    minWidth: 15,
                  },
                }}
              >
                <ImageComponent
                  imgSrc={NotificationIcon}
                  imgAlt="notification.svg"
                />
              </Badge>
            </StyledIconButton>
          </StyledIconBox>

          <Box alignSelf={"center"}>
            <UserProfileDropdown
              userId={props.userId}
              userName={props.userName}
            />
          </Box>
        </Box>
      </Box>
      {isSearchListVisible && (
        <Box data-testid="test-search">
          <SearchDropDownList
            data={filesData}
            onClick={(name, filepath, searchTexts, userId) => {
              handleClick(name, filepath, searchTexts, userId);
            }}
            visible={isSearchListVisible}
            handleClose={() => setIsSearchListVisible(false)}
          />
        </Box>
      )}
      {isNotificationModalVisible && (
        <Box data-testid="test-notification">
          <NotificationCard
            notificationData={notifications}
            visible={isNotificationModalVisible}
            handleCloseIcon={() => {
              setIsNotificationModalVisible(false);
            }}
          />
        </Box>
      )}
    </>
  );
};

export default HeaderBar;
