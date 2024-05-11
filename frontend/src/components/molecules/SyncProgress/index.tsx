import IconComponent from "@components/atoms/Icon";
import { Box, Dialog, styled } from "@mui/material";
import CloseIcon from "../../../../public/assets/icons/closeIcon.svg";
import Loader from "../../../../public/assets/icons/spinner.gif";
import Drive from "../../../../public/assets/icons/drive.svg";
import React from "react";
import CustomTypography from "@components/atoms/Typography";
import theme from "@src/theme";
import { DRIVE_TEXT, SYNC_PROGRESS } from "@src/utils/constants";

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: theme.palette.grays.gray400,
  height: "508px",
  width: "696px",
});
const CloseBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "row",
  marginRight: 35,
  marginBottom: 100,
});
const SyncBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: 8,
});
const StyledIcon = styled(IconComponent)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 57,
});
const WrapperBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  marginBottom: 125,
});
interface SyncProgressProps {
  isDailogOpen: boolean;
  handleCloseClick: () => void;
}
const SyncProgress = (props: SyncProgressProps) => {
  return (
    <Dialog open={props.isDailogOpen} maxWidth="xl">
      <MainContainer data-testid="syncProgress">
        <CloseBox>
          <IconComponent
            src={CloseIcon}
            onclick={props.handleCloseClick}
            sx={{ cursor: "pointer" }}
            height="16px"
            width="16px"
          />
        </CloseBox>
        <WrapperBox>
          <Box gap={"35px"} display={"flex"} flexDirection={"column"}>
            <StyledIcon src={Drive} height="86px" width="86px" />
            <SyncBox>
              <IconComponent src={Loader} sx={{ width: 30, height: 30 }} />
              <CustomTypography variant="h3" color={theme.palette.text.white}>
                {SYNC_PROGRESS}
              </CustomTypography>
            </SyncBox>
          </Box>

          <CustomTypography
            variant="body2"
            color={theme.palette.text.highEmphasis}
            sx={{ width: "236px", textAlign: "center" }}
          >
            {DRIVE_TEXT}
          </CustomTypography>
        </WrapperBox>
      </MainContainer>
    </Dialog>
  );
};

export default SyncProgress;
