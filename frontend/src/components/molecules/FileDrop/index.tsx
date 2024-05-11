import React, { ChangeEvent } from "react";
import IconComponent from "@components/atoms/Icon";
import CustomTypography from "@components/atoms/Typography";
import UploadIcon from "../../../../public/assets/icons/UploadIcon.svg";
import PDFIcon from "../../../../public/assets/icons/PDF.svg";

import { Box, Card, styled } from "@mui/material";
import theme from "../../../theme";
import { FILE_UPLOAD_TEXT } from "../../../utils/constants";
import Button from "@mui/material/Button";

export interface FileDropProps {
  selectedFile: File | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickUpload: (name: string) => void;
}

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: 36,
  background: theme.palette.grays.gray400,
  border: `1px dashed ${theme.palette.grays.gray400}`,
  borderRadius: "4px",
  borderImage: `repeating-linear-gradient(
    45deg,
    grey,
    grey 13px,
    transparent 13px,
    transparent 20px
  ) 1`,
  margin: "0px 20px 10px 20px",
  height: 360,
});

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grays.gray400,
  gap: 18,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  ...theme.typography.body2,
  textAlign: "center",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grays.gray400,
  padding: theme.spacing(1),
  textAlign: "center",
  boxShadow: "none",
}));

const FileUpload = (props: FileDropProps) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleClick = () =>{
      if(props.selectedFile){
        props.onClickUpload(props.selectedFile.name)
      }
  }
  return (
    
    <MainContainer>
      {!props.selectedFile ? (
        <>
          <Item>
            <IconComponent src={UploadIcon} />
            <CustomTypography
              variant="subtitle2"
              color={theme.palette.text.white}
              children={FILE_UPLOAD_TEXT[0]}
            />
          </Item>
          <StyledCard data-testid="choose-file-container">
            <Button
              sx={{
                "&.MuiButton-root": {
                  width: "166px",
                  height: "45px",
                  border: `2px solid ${theme.palette.grays.gray100}`,
                  textTransform: "none",
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
              component="label"
              variant="contained"
            >
              {FILE_UPLOAD_TEXT[1]}
              <VisuallyHiddenInput
                type="file"
                accept=".pdf"
                onChange={props.handleFileChange}
              />
            </Button>
          </StyledCard>
        </>
      ) : (
        <>
          <Item>
            <IconComponent src={PDFIcon} />
            <CustomTypography
              variant="body1"
              color={theme.palette.text.white}
              children={props.selectedFile.name}
            />
          </Item>
          <StyledCard data-testid="file-upload-container">
            <Button
              sx={{
                "&.MuiButton-root": {
                  width: "166px",
                  textTransform: "none",
                  backgroundColor: `${theme.palette.primary.main}`,
                  color: theme.palette.text.white,
                  boxShadow: "none",
                  ":disabled": {
                    backgroundColor: theme.palette.primary.light,
                  },
                  "&:hover": {
                    backgroundColor: `${theme.palette.primary.main}`,
                    color: theme.palette.text.white,
                  },
                },
              }}
              variant="contained"
              onClick={handleClick
              }
            >
              {FILE_UPLOAD_TEXT[2]}
            </Button>
          </StyledCard>
        </>
      )}
    </MainContainer>
  );
};

export default FileUpload;
