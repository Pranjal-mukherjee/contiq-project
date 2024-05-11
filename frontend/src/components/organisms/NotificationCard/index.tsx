import React from "react";
import { Box, Popover, styled } from "@mui/material";
import Notification from "@components/molecules/NotificationAvatar";
import { NOTIFICATION_HEADER_TEXT } from "../../../utils/constants";
import theme from "@src/theme";
import CustomTypography from "@components/atoms/Typography";
import IconComponent from "@components/atoms/Icon";
import CloseIcon from "../../../../public/assets/icons/notificationClose.svg";
import { NotificationType } from "@src/utils/types";

interface NotificationListProps {
  notificationData: Array<any>;
  handleCloseIcon?: () => void;
  visible?: boolean;
}

const HeaderContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  height: "50px",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 10px 4px 13px",
});

const Scrollbar = styled(Box)({
  overflowY: "scroll",
  maxHeight: "350px",
  "&::-webkit-scrollbar": {
    height: "300px",
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grays.gray85,
    borderRadius: "8px",
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grays.gray94,
    borderRadius: "12px",
    width: "12px",
    border: `2px solid ${theme.palette.grays.gray94}`,
  },
});
const StyledPopOver = styled(Popover)({
  marginTop: "60px"
});
const NotificationCard = ({
  notificationData,
  handleCloseIcon,
  visible,
}: NotificationListProps) => {
  return (
    <>
      { visible && (
        <StyledPopOver
          open={visible}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <HeaderContainer>
            <CustomTypography variant="h3" sx={{ cursor: "pointer" }}>
              {NOTIFICATION_HEADER_TEXT}
            </CustomTypography>
            <IconComponent
              src={CloseIcon}
              width="16px"
              height="16px"
              onclick={handleCloseIcon}
            />
          </HeaderContainer>
          <Scrollbar>
            {notificationData.map((item: NotificationType) => (
              <Notification
                timestamp={item.createdAt}
                message={item.message}
                key={item.id}
              />
            ))}
          </Scrollbar>
        </StyledPopOver>
      )}
    </>
  );
};

export default NotificationCard;
