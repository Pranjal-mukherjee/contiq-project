import MuiButton from "@components/atoms/Button";
import CustomTypography from "@components/atoms/Typography";
import { Box, Modal, styled } from "@mui/material";
import theme from "@src/theme";
import { DUPLICATE_TEXT, MODAL_TEXT } from "../../../utils/constants";

interface IModalProps {
  fileName: File | null;
  clickToCancel: () => void;
  clickToUpload: () => void;
}

const ModalContainer = styled(Box)({
  marginTop: "261px",
  marginLeft: "441px",
  width: "484px",
  height: "246px",
  background: theme.palette.grays.gray400,
  padding: 4,
  border: "none",
});

const DialogueFooter = styled(Box)({
  marginTop: "26px",
  marginRight: "26px",
  display: "flex",
  justifyContent: "end",
  flexDirection: "row",
  gap: 20,
  background: theme.palette.grays.gray400,
});

const DuplicationModal = (props: IModalProps) => {
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>
        <CustomTypography
          id="modal-modal-title"
          variant="h3"
          color={theme.palette.text.white}
          sx={{ marginTop: "20px", marginLeft: "24px" }}
        >
          {MODAL_TEXT[0]}
        </CustomTypography>
        <CustomTypography
          id="modal-modal-description"
          variant="subtitle2"
          color={theme.palette.text.white}
          sx={{
            marginTop: "42px",
            marginLeft: "24px",
            marginRight: "4px",
          }}
          data-testid="custome-file"
        >
          {props.fileName?.name ?? DUPLICATE_TEXT} {MODAL_TEXT[1]}
        </CustomTypography>
        <DialogueFooter>
          <MuiButton
            text={"Cancel"}
            variant={"contained"}
            onClick={props.clickToCancel}
            sx={{
              "&.MuiButton-root": {
                width: "55px",
                textTransform: "none",
                border: `1px solid ${theme.palette.grays.gray100}`,
                backgroundColor: `${theme.palette.grays.gray400}`,
                color: theme.palette.text.white,
                boxShadow: "none",
                ":disabled": {
                  backgroundColor: theme.palette.primary.light,
                },
                "&:hover": {
                  backgroundColor: `${theme.palette.grays.gray400}`,
                  color: theme.palette.text.white,
                },
              },
            }}
          ></MuiButton>
          <MuiButton
            text={"Upload"}
            variant={"contained"}
            onClick={props.clickToUpload}
            sx={{
              "&.MuiButton-root": {
                width: "96px",
              },
            }}
          ></MuiButton>
        </DialogueFooter>
      </ModalContainer>
    </Modal>
  );
};

export default DuplicationModal;
