import ImageComponent from "@components/atoms/Image";
import CustomTypography from "@components/atoms/Typography";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Popover,
  styled,
} from "@mui/material";
import theme from "@src/theme";
import { FileType } from "@src/utils/types";
import React from "react";
import DocumentImage from "../../../../public/assets/images/documents.svg";
import Image from "../../../../public/assets/images/image.svg";
import { SEARCH_FILE_LIST } from "../../../utils/constants";

interface FileData {
  id: number;
  name: string;
  description: string;
}

interface SearchListProps {
  data: Array<FileType>;
  onClick: (
    name: string,
    filePath: string,
    searchTexts: String[],
    userId: number
  ) => void;
  visible: boolean;
  handleClose: () => void;
}

const MainListContainer = styled(Popover)({
  marginTop: "60px",
  marginLeft: "1256px",
  width: "355px",
  height: "330px",
});

const HeaderContainer = styled(Box)({
  display: "flex",
  marginLeft: "14px",
});

const FooterContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const ImageContainer = styled(Box)({
  display: "flex",
  gap: "15px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "12px",
  marginRight: "10px",
});

const Scrollbar = styled(Box)({
  overflowY: "scroll",
  maxHeight: "150px",
  "&::-webkit-scrollbar": {
    height: "230px",
    width: "12px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grays.gray85,
    borderRadius: "12px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grays.gray94,
    borderRadius: "12px",
    width: "16px",
    border: `3px solid ${theme.palette.grays.gray94}`,
  },
});

const SearchDropDownList = ({
  data,
  onClick,
  visible,
  handleClose,
}: SearchListProps) => {
  return (
    <MainListContainer open={visible} onClose={handleClose}>
      <HeaderContainer>
        <CustomTypography
          variant="caption1"
          color={theme.palette.text.black}
          sx={{ marginTop: "12px" }}
        >
          {SEARCH_FILE_LIST[0]}
        </CustomTypography>
      </HeaderContainer>
      <Scrollbar>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {data.map((item) => (
            <ListItem
              data-testid="test-list"
              component="div"
              onClick={() =>
                onClick(
                  item.fileName,
                  item.filePath,
                  item.searchTexts,
                  item.userId
                )
              }
              alignItems="flex-start"
              key={item.fileId}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText
                primary={
                  <CustomTypography
                    variant="body2"
                    color={theme.palette.text.lowEmphasis}
                  >
                    {item.fileName}
                  </CustomTypography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Scrollbar>
      <FooterContainer>
        <CustomTypography
          variant="caption1"
          color={theme.palette.text.black}
          sx={{ marginLeft: "15px" }}
        >
          {SEARCH_FILE_LIST[1]}
        </CustomTypography>
        <ImageContainer>
          <ImageComponent imgSrc={DocumentImage} width={"150"} height={"80"} />
          <ImageComponent imgSrc={Image} width={"150"} height={"80"} />
        </ImageContainer>
      </FooterContainer>
    </MainListContainer>
  );
};

export default React.memo(SearchDropDownList);
