import React from "react";
import {  Box, styled } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme";
import CheckboxComponent from "@components/atoms/CheckBox";
import IconComponent from "@components/atoms/Icon";
import FileDrive from "../../../../public/assets/icons/file drive.svg";
import FolderDrive from "../../../../public/assets/icons/folder drive.svg";
import Icon from "../../../../public/assets/icons/icon.svg";
interface DriveProps {
  name: string;
  isFile: boolean;
  onClickFolder?: () => void;
  onChangeFiles: (event: React.ChangeEvent) => void;
  isChecked?: boolean;
}

const FolderCard = (props: DriveProps) => {
  const CardWrapper = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    background: theme.palette.grays.gray400,
    border: `1px solid ${theme.palette.grays.gray300}`,
    borderRadius: "4px",
    color: theme.palette.text.white,
    width:"100vw"
  });
  const IconWrapper = styled("div")({
    background: theme.palette.grays.gray300,
    marginRight:20
  });
  const FolderWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    cursor: "pointer",
   
  });
  const FileWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent:"start",
    paddingLeft: "2px",
    width:"610px"
  });

  return (
    <CardWrapper data-testid="folder-card">
      {props.isFile ? (
        <FileWrapper>
          <CheckboxComponent
            disabled={false}
            onChange={props.onChangeFiles}
            disableRipple
            isChecked={props.isChecked}
            sx={{marginLeft:5}}
          />
          <IconWrapper>
            <IconComponent src={FileDrive} />
          </IconWrapper>
          <TypographyComponent variant="body1">
            {props.name}
          </TypographyComponent>
        </FileWrapper>
      ) : (
        <>
          <FolderWrapper onClick={props.onClickFolder}>
            <IconWrapper>
              <IconComponent src={FolderDrive} />
            </IconWrapper>
            <TypographyComponent variant="body1">
              {props.name}
            </TypographyComponent>
          
          
          </FolderWrapper>
          <IconComponent src={Icon} sx={{marginLeft:100}}/>
        </>
      )}
    </CardWrapper>
  );
};

export default FolderCard;
