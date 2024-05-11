import Files from "@assets/icons/Files.svg";
import FileActive from "@assets/icons/FilesActive.svg";
import Home from "@assets/icons/Home.svg";
import HomeActive from "@assets/icons/HomeActive.svg";
import Metrics from "@assets/icons/Metrics.svg";
import Office from "@assets/icons/Office.svg";
import People from "@assets/icons/People.svg";
import Calender from "@assets/icons/calender.svg";
import Settings from "@assets/icons/settings2.svg";
import IconComponent from "@components/atoms/Icon";
import IconWithTypography from "@components/molecules/IconTypography";
import { Box, Stack, styled } from "@mui/material";
import theme from "@src/theme";
import { NAVIGATE_FILES, NAVIGATE_HOME, SIDE_BAR_LABELS } from "@src/utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RootBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: theme.spacing(20.5),
  height: "92.5vh",
  backgroundColor: theme.palette.grays?.gray500,
}));

const FooterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: theme.spacing(19),
  width: theme.spacing(20.5),
}));

const BaseBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
}));

const SideBar = (props: { selectedItem?: string }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<string>(
    props.selectedItem ?? "home"
  );
  const handleHomeClick = () => {
    setIsActive("home");
    navigate(NAVIGATE_HOME)
  };

  const handleFileClick = () => {
    setIsActive("file");
    navigate(NAVIGATE_FILES);
  };

  return (
    <RootBox data-testid="SideBar">
      <Stack>
        <BaseBox>
          <IconWithTypography
            iconSrc={isActive === "home" ? HomeActive : Home}
            text={SIDE_BAR_LABELS[0]}
            textColor={
              isActive === "home"
                ? theme.palette.text.white
                : theme.palette.grays.gray200
            }
            onclick={handleHomeClick}
          />
        </BaseBox>
        <IconWithTypography
          iconSrc={Office}
          text={SIDE_BAR_LABELS[1]}
          textColor={theme.palette.grays.gray200}
        />
        <IconWithTypography
          iconSrc={People}
          text={SIDE_BAR_LABELS[2]}
          textColor={theme.palette.grays.gray200}
        />
        <IconWithTypography
          iconSrc={Calender}
          text={SIDE_BAR_LABELS[3]}
          textColor={theme.palette.grays.gray200}
        />
        <BaseBox>
          <IconWithTypography
            iconSrc={isActive === "file" ? FileActive : Files}
            text={SIDE_BAR_LABELS[4]}
            textColor={
              isActive === "file"
                ? theme.palette.text.white
                : theme.palette.grays.gray200
            }
            onclick={handleFileClick}
          />
        </BaseBox>
        <IconWithTypography
          iconSrc={Metrics}
          text={SIDE_BAR_LABELS[5]}
          textColor={theme.palette.grays.gray200}
        />
      </Stack>
      <FooterBox>
        <IconComponent src={Settings} />
      </FooterBox>
    </RootBox>
  );
};

export default SideBar;
