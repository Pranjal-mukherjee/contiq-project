import CopyIcon from "@assets/icons/copy.svg";
import DownArrowGrey from "@assets/icons/downarrow-grey.svg";
import DownArrow from "@assets/icons/downarrow.svg";
import Maximize from "@assets/icons/maximize.svg";
import Minimize from "@assets/icons/minimize.svg";
import MoreIcon from "@assets/icons/more.svg";
import UpArrowGrey from "@assets/icons/uparrow-grey.svg";
import UpArrow from "@assets/icons/uparrow.svg";
import IconComponent from "@components/atoms/Icon";
import CustomTypography from "@components/atoms/Typography";
import CopyPopup from "@components/molecules/CopyPopup";
import { Box, Divider, styled } from "@mui/material";
import theme from "@src/theme";
import { useEffect, useState } from "react";
export interface SearchPopupProps {
  searchKey: string;
  searchContent: string[];
  pdfName: string;
}
const MainWrapper = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  flexDirection: "column",
});
const RootWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: 400,
  boxShadow: "0px 2px 16px 0px #00000026",
  border: `1px solid ${theme.palette.grays.gray100}`,
  borderRadius: theme.spacing(1),
  background: theme.palette.grays.gray600,
});
const HeaderBar = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  width: "100%",
});
const TextWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "60%",
  padding: "12px 15px 12px 28px",
});
const IconWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  width: "40%",
  padding: "8px 8px 7px 8px",
});
const ContentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  justifyContent: "center",
});
const HeaderContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "23px 30px 0px 30px",
});
const MainContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "0px 30px 20px 30px",
});
const TitleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
const CopyBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: 10,
});
const StyledFooterTypography = styled(CustomTypography)({
  color: theme.palette.text.mediumEmphasis,
  "& span": {
    color: theme.palette.text.black,
    fontWeight: 700,
  },
});
const SearchPopup = (props: SearchPopupProps) => {
  const [slideIndex, setSlideIndex] = useState<number>(1);
  const [isMax, setIsMax] = useState<boolean>(true);
  const [showCopyPopup, setShowCopyPopup] = useState<boolean>(false);
  const [previousText, setPreviousText] = useState<string>("");
  const [trailingText, setTrailingText] = useState<string>("");
  useEffect(() => {
    const list = props.searchContent[slideIndex - 1]?.split(props.searchKey);
    if (list) {
      setPreviousText(list[0]);
      setTrailingText(list[1]);
    }
  }, [slideIndex]);
  const handlePageUp = () => {
    setSlideIndex(slideIndex - 1);
  };
  const handlePageDown = () => {
    setSlideIndex(slideIndex + 1);
  };
  const handleCopyClick = () => {
    navigator.clipboard?.writeText(props.searchContent[slideIndex - 1]);
    setShowCopyPopup(true);
    setTimeout(() => {
      setShowCopyPopup(false);
    }, 4000);
  };
  return (
    <MainWrapper>
      <RootWrapper data-testid="test-container">
        <HeaderBar>
          <TextWrapper>
            <CustomTypography
              variant="body2"
              color={theme.palette.text.black}
              data-testid={"searchKey"}
            >
              {props.searchKey}
            </CustomTypography>
            <Box display={"flex"}>
              <CustomTypography
                variant="body2"
                color={theme.palette.text.black}
              >
                {slideIndex}
              </CustomTypography>
              <CustomTypography
                variant="body2"
                color={theme.palette.text.lowEmphasis}
              >
                {`/${props.searchContent?.length}`}
              </CustomTypography>
            </Box>
          </TextWrapper>
          <Divider orientation="vertical" flexItem />
          <IconWrapper>
            {slideIndex === 1 ? (
              <IconComponent src={UpArrowGrey} />
            ) : (
              <IconComponent
                src={UpArrow}
                onclick={handlePageUp}
                sx={{ cursor: "pointer" }}
                data-testid="test-up"
              />
            )}
            {slideIndex === props.searchContent?.length ? (
              <IconComponent src={DownArrowGrey} />
            ) : (
              <IconComponent
                src={DownArrow}
                onclick={handlePageDown}
                sx={{ cursor: "pointer" }}
                data-testid="test-down"
              />
            )}

            {isMax ? (
              <IconComponent
                src={Minimize}
                onclick={() => setIsMax(false)}
                sx={{ cursor: "pointer" }}
                data-testid="test-minimize"
              />
            ) : (
              <IconComponent
                src={Maximize}
                onclick={() => setIsMax(true)}
                sx={{ cursor: "pointer" }}
                data-testid="test-maximize"
              />
            )}
          </IconWrapper>
        </HeaderBar>
        <Divider orientation="horizontal" flexItem />
        {isMax && (
          <ContentWrapper data-testid="test-content">
            <HeaderContent>
              <TitleBox>
                <CustomTypography
                  variant="body1"
                  color={theme.palette.text.black}
                >
                  {props.pdfName}
                </CustomTypography>
                <Box display={"flex"} gap={"5px"}>
                  <CustomTypography
                    variant="overline"
                    color={theme.palette.text.mediumEmphasis}
                  >
                    Slide
                  </CustomTypography>
                  <Box>
                    <CustomTypography
                      variant="overline"
                      color={theme.palette.text.black}
                    >
                      {slideIndex}
                    </CustomTypography>
                    <CustomTypography
                      variant="overline"
                      color={theme.palette.text.mediumEmphasis}
                    >
                      {`/${props.searchContent?.length}`}
                    </CustomTypography>
                  </Box>
                </Box>
              </TitleBox>
              <CopyBox>
                <IconComponent
                  src={CopyIcon}
                  onclick={handleCopyClick}
                  sx={{ cursor: "pointer" }}
                  data-testid="test-copy"
                />
                <IconComponent src={MoreIcon} />
              </CopyBox>
            </HeaderContent>
            <MainContent>
              <StyledFooterTypography variant="h4">
                {previousText}
                <span>{props.searchKey}</span>

                {trailingText}
              </StyledFooterTypography>
            </MainContent>
          </ContentWrapper>
        )}
      </RootWrapper>
      {showCopyPopup && (
        <div data-testid="show-copy">
          <CopyPopup />
        </div>
      )}
    </MainWrapper>
  );
};

export default SearchPopup;
