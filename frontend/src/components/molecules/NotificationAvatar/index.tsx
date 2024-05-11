import ImageComponent from "@components/atoms/Image";
import { Box, Divider, Typography, styled } from "@mui/material";
import theme from "@src/theme";
import Avatar from "../../../../public/assets/icons/avatar.svg";
export interface INotificationProps {
  timestamp: string;
  message: string;
}

const UserNotification = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3.8),
}));

const Notification = (props: INotificationProps) => {
  const messageList = props.message.split("has");
  const name = messageList[0];
  const restMessage = `has${messageList[1]}`;
  return (
    <>
      <Divider orientation="horizontal" />
      <UserNotification data-test-id="test-userNotification">
        <Box display={"flex"} gap={theme.spacing(3)}>
          <ImageComponent imgSrc={Avatar} />
          <Box display={"flex"} flexDirection={"column"} gap={"4px"}>
            <Box display={"flex"} flexDirection={"row"} gap={"4px"}>
              <Typography variant="body1" color={theme.palette.text.black}>
                {name}
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.text.lowEmphasis}
              >
                {restMessage}
              </Typography>
            </Box>
            <Typography
              variant="caption1"
              color={theme.palette.text.mediumEmphasis}
            >
              {props.timestamp}
            </Typography>
          </Box>
        </Box>
      </UserNotification>
      <Divider orientation="horizontal" />
    </>
  );
};

export default Notification;
