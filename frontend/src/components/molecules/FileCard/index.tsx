import ImageComponent from "@components/atoms/Image";
import { Box, Typography, styled } from "@mui/material";
import theme from "@src/theme";
import FileIcon from "../../../../public/assets/icons/FileIcon.svg";
import Thumbnail from "../../../../public/assets/images/Thumbnail.svg";

export interface IFileCardProps {
  fileName: string;
}

const FileBox = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const File = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const FileCard = (props: IFileCardProps) => {
  return (
    <FileBox>
      <File>
        <Box
          bgcolor={theme.palette.grays.gray600}
          borderRadius={theme.spacing(2)}
          padding={theme.spacing(4)}
        >
          <ImageComponent imgSrc={Thumbnail} />
        </Box>
        <Box display={"flex"} gap={theme.spacing(3)}>
          <ImageComponent imgSrc={FileIcon} />
          <Typography variant="body1" color={theme.palette.text.black}>
            {props.fileName}
          </Typography>
        </Box>
      </File>
    </FileBox>
  );
};

export default FileCard;
