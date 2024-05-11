import CustomAvatar from "@components/atoms/Avatar";
import ImageComponent from "@components/atoms/Image";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import theme from "@src/theme";
import { LOGOUT, PROFILE, SETTINGS } from "@src/utils/constants";
import React, { useState } from "react";
import DropDownIcon from "../../../../public/assets/icons/dropDown.svg";
import LogOutIcon from "../../../../public/assets/icons/logout.svg";
import SettingsIcon from "../../../../public/assets/icons/settings.svg";
import ProfileIcon from "../../../../public/assets/icons/user.svg";
import Avatar from "../../../../public/assets/icons/avatar.svg";
import { useAuth0 } from "@auth0/auth0-react";
export interface IUserProfileProps {
  userId: string | undefined;
  userName: string;
}
const UserProfileDropdown = (props: IUserProfileProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuth0();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: "https://fe-bc138.bootcamp64.tk/" } });
    localStorage.clear();
    sessionStorage.clear();
  };
  return (
    <Box>
      <IconButton
        onClick={handleClick}
        aria-controls="profile-menu"
        aria-haspopup="true"
        sx={{ padding: 0 }}
      >
        {!anchorEl && <CustomAvatar src={Avatar} variant="circular" />}
        {anchorEl && (
          <Box display={"flex"} gap={1}>
            <CustomAvatar src={Avatar} variant="circular" />
            <ImageComponent imgSrc={DropDownIcon} />
          </Box>
        )}
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ top: theme.spacing(3) }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          margin={" 4px 12px"}
          width={theme.spacing(39)}
        >
          <Typography variant="body1" color={theme.palette.text.black}>
            {props.userName}
          </Typography>
          <Typography
            variant="overline1"
            color={theme.palette.text.lowEmphasis}
          >
            {props.userId}
          </Typography>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box display={"flex"} flexDirection={"column"}>
          <MenuItem sx={{ padding: 2 }}>
            <Box display={"flex"} gap={2}>
              <ImageComponent imgSrc={ProfileIcon} />
              <Typography
                variant="body2"
                color={theme.palette.text.black}
                sx={{ float: "inline-end" }}
                alignSelf={"flex-end"}
              >
                {PROFILE}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem sx={{ padding: 2 }}>
            <Box display={"flex"} gap={2}>
              <ImageComponent imgSrc={SettingsIcon} />
              <Typography
                variant="body2"
                color={theme.palette.text.black}
                sx={{ float: "inline-end" }}
                alignSelf={"flex-end"}
              >
                {SETTINGS}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ padding: 2 }}>
            <Box display={"flex"} gap={2}>
              <ImageComponent imgSrc={LogOutIcon} />
              <Typography
                variant="body2"
                color={theme.palette.text.black}
                sx={{ float: "inline-end" }}
                alignSelf={"flex-end"}
              >
                {LOGOUT}
              </Typography>
            </Box>
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};

export default React.memo(UserProfileDropdown);
