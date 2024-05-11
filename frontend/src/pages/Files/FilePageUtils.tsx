import MuiButton from "@components/atoms/Button";
import ImageComponent from "@components/atoms/Image";
import DatePicker from "@components/molecules/Datepicker";
import FileCard from "@components/molecules/FileCard";
import MuiTabs from "@components/molecules/MuiTabs";
import Filter from "@components/organisms/Filter";
import UploadFiles from "@components/organisms/UploadFiles";
import {
  Box,
  Button,
  Theme,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { fetchFilesByUserId } from "@src/services/FileService";
import theme from "@src/theme";
import {
  ADD_FILES,
  FILES_HEADER,
  FILE_ITEM1,
  FILE_ITEM2,
  FILE_ITEM3,
  FILE_TAB,
  FILE_TYPE,
  MOST_RELEVANT,
  PUBLISH_ITEM1,
  PUBLISH_ITEM2,
  PUBLISH_ITEM3,
  PUBLISH_LABEL,
  PUBLISH_PLACEHOLDER,
} from "@src/utils/constants";
import { FileType } from "@src/utils/types";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from "../../../public/assets/icons/addIcon.svg";
import DownArrow from "../../../public/assets/icons/downarrow.svg";
import GridIcon from "../../../public/assets/icons/grid.svg";
import ListIcon from "../../../public/assets/icons/list.svg";
import SwapIcon from "../../../public/assets/icons/swap.svg";

const ButtonProperties = {
  backgroundColor: theme.palette.primary.main,
};

const MostRelevantButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  "&.MuiButton-root": {
    "&:hover": {
      background: "transparent",
      borderColor: theme.palette.grays.gray100,
    },
  },
  borderColor: theme.palette.grays.gray100,
  padding: "10px 10px 10px 10px",
}));

const FilesPageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const FilesPageHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "28px 24px;",
});

const FiltersBar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 24px;",
});

const FilesWrapper = styled(Box)({
  flexWrap: "wrap",
  display: "flex",
  gap: "25px",
  overflowY: "scroll",
  maxHeight: "490px",
  padding: "0px 28px ",
  "&::-webkit-scrollbar": {
    width: "0.5em",
    height: "0.6em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grays.gray100,
    borderRadius: "12px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grays.gray600,
    borderRadius: "12px",
    width: "16px",
    border: "3px solid ${theme.palette.grays.gray600}",
  },
});

const FilesPage = () => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [gridClicked, setGridClicked] = useState<boolean>(false);
  const [listClicked, setListClicked] = useState<boolean>(false);
  const [addFilesClicked, setAddFilesClicked] = useState<boolean>(false);
  const [filesForUser, setFilesForUser] = useState<FileType[]>([]);

  if (endDate && endDate < startDate) {
    window.alert("eroor message");
    setEndDate("");
  }

  const handleGridClick = () => {
    setGridClicked(!gridClicked);
    setListClicked(false);
  };

  const handleListClick = () => {
    setListClicked(!listClicked);
    setGridClicked(false);
  };

  const handleAddFilesClick = () => {
    setAddFilesClicked(!addFilesClicked);
  };

  const fetchData = async (userId: number) => {
    try {
      let res = await fetchFilesByUserId(userId);
      let filtered = res.files;
      if (endDate) {
        filtered = filtered.filter((item: FileType) => {
          // Convert item.uploadedAt to a format compatible with the datepicker format
          const day = item.uploadedAt.substring(8, 10).replace(/^0+/, "");
          const formattedUploadedAt = `${day} ${getMonthName(
            parseInt(item.uploadedAt.substring(5, 7), 10) - 1
          )} ${item.uploadedAt.substring(0, 4)}`;

          return (
            formattedUploadedAt >= startDate && formattedUploadedAt <= endDate
          );
        });
      }

      setFilesForUser(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function getMonthName(monthIndex: number): string {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  }
  useEffect(() => {
    const JSONData = localStorage.getItem("user");
    if (JSONData) {
      const data = JSON.parse(JSONData);
      const userId = data.id;
      fetchData(userId);
    }
  }, [endDate]);

  useEffect(() => {
    refetchData();
  }, []);

  const refetchData = async () => {
    const JSONData = localStorage.getItem("user");
    if (JSONData) {
      const data = JSON.parse(JSONData);
      const userId = data.id;
      fetchData(userId);
    }
  };
  return (
    <FilesPageContainer>
      <FilesPageHeader>
        <Typography variant="h2" color={theme.palette.text.black}>
          {FILES_HEADER}
        </Typography>
        <MuiButton
          text={ADD_FILES}
          variant={"text"}
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "8px 12px",
          }}
          startIcon={<ImageComponent imgSrc={AddIcon} />}
          onClick={handleAddFilesClick}
        />
        {addFilesClicked && <UploadFiles refetchData={refetchData} />}
      </FilesPageHeader>
      <FiltersBar>
        <Box display="flex" gap={theme.spacing(3)}>
          <Filter
            menuItems={[FILE_ITEM1, FILE_ITEM2, FILE_ITEM3]}
            placeholder={FILE_TYPE}
            label={FILE_TYPE}
          />

          <DatePicker
            label="Start Date"
            date={startDate}
            setDate={setStartDate}
          />
          <DatePicker label="End Date" date={endDate} setDate={setEndDate} />
          <Filter
            menuItems={[PUBLISH_ITEM1, PUBLISH_ITEM2, PUBLISH_ITEM3]}
            placeholder={PUBLISH_PLACEHOLDER}
            label={PUBLISH_LABEL}
          />
        </Box>
        <Box display="flex" gap={theme.spacing(3)}>
          <MostRelevantButton
            variant="outlined"
            startIcon={<ImageComponent imgSrc={SwapIcon} />}
            endIcon={<ImageComponent imgSrc={DownArrow} />}
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            <Typography variant="body1" color={theme.palette.text.black}>
              {MOST_RELEVANT}
            </Typography>
          </MostRelevantButton>
          <Box
            display="flex"
            border="1px solid #BFC4C8"
            borderRadius={theme.spacing(1)}
          >
            <Button
              disableRipple
              onClick={handleGridClick}
              sx={{
                bgcolor: gridClicked ? theme.palette.primary.light : "none",
              }}
              children={<ImageComponent imgSrc={GridIcon} />}
            />
            <Button
              disableRipple
              onClick={handleListClick}
              sx={{
                bgcolor: listClicked ? theme.palette.primary.light : "none",
                borderRadius: theme.spacing(1),
              }}
              children={<ImageComponent imgSrc={ListIcon} />}
            />
          </Box>
        </Box>
      </FiltersBar>
      <Box padding={"28px 24px;"}>
        <MuiTabs
          variant="standard"
          tabNames={FILE_TAB}
          selectedColor={theme.palette.primary.main}
          backgroundColor={theme.palette.text.white}
          notSelectedColor={theme.palette.text.mediumEmphasis}
          borderBottom={`1px solid ${theme.palette.grays.gray600}`}
          isTabDisabled={true}
          handleChange={function (e: any, newValue: number): void {
            throw new Error("Function not implemented.");
          }}
          selectIndex={0}
          onSelectTab={function (tabName: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Box>
      <FilesWrapper>
        {filesForUser?.map((file) => (
          <FileCard key={file.fileId} fileName={file.fileName} />
        ))}
      </FilesWrapper>
    </FilesPageContainer>
  );
};

export default FilesPage;
