import React from "react";
import { Box, styled } from "@mui/system";
import theme from "@src/theme";
import Close from "@assets/icons/closeIcon.svg";
import PdfImage from "@assets/icons/FileIcon.svg";
import Loader from "@components/atoms/ProgressBar";
import Icon from "@components/atoms/Icon";
import MuiTypography from "@components/atoms/Typography";
import { UPLOADING_TEXT } from "@src/utils/constants";
import { Modal } from "@mui/material";

export interface ProgressBarModalProps {
  onClose?: () => void;
  fileName: File | null;
  open: boolean;
}
const BaseContainer = styled("div")({
   position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.structuralColor.overlay,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const RootContainer = styled('div')({
  width: '696px',
  height: '508px',
  borderRadius: '4px',
  background: theme.palette.grays.gray400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const IconContainer = styled('div')({
  width: '80px',
  height: '80px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginTop: '120px',
});

const MainContainer = styled('div')({
  textAlign: 'center',
});

const LoaderContainer = styled('div')({
  textAlign: 'center',
  paddingTop: '30px',
});

const CloseIcon = styled(Icon)({
  cursor: 'pointer',
});

const ProgressBarModal = ({
  fileName,
  onClose,
  open,
}: ProgressBarModalProps) => {
  return (
    <Modal open={open}>
      <BaseContainer>
        <RootContainer data-testId="sync-modal">
          <Box
            sx={{
              paddingTop: "24px",
              paddingRight: "48px",
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <CloseIcon src={Close} onclick={onClose} />
          </Box>
          <IconContainer>
            <Icon src={PdfImage} height="80px" width="80px" />
          </IconContainer>
          <MuiTypography
            variant="body1"
            children={fileName?.name ?? "Contract Agreement.pdf"}
            style={{ color: theme.palette.text.white, marginTop: "10px" }}
          />
          <MainContainer>
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
            <MuiTypography
              variant="caption1"
              children={UPLOADING_TEXT}
              color={theme.palette.text.highEmphasis}
              sx={{ marginLeft: "275px" }}
            />
          </MainContainer>
        </RootContainer>
      </BaseContainer>
    </Modal>
  );
};

export default ProgressBarModal;
