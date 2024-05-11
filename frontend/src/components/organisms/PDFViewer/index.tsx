import IconComponent from "@components/atoms/Icon";
import CustomTypography from "@components/atoms/Typography";
import PDFPagination from "@components/molecules/Pagination";
import { Box, Grid } from "@mui/material";
import WebViewer from "@pdftron/pdfjs-express";
import { useEffect, useRef, useState } from "react";
import BackIcon from "../../../../public/assets/icons/backIcon.svg";
import theme from "../../../theme";
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from "../../../utils/constants";
import SearchPopup from "../SearchPopUp";
import {
  CustomPdfViewerStyles,
  PaginationStyle,
  StyledBox,
} from "./index.style";

interface PDFViewerProps {
  fileName: string;
  onNavBack: () => void;
  filePath: string;
  searchKey: string;
  searchContent: string[];
}

const PDFViewer = ({
  fileName,
  onNavBack,
  filePath,
  searchKey,
  searchContent,
}: PDFViewerProps) => {
  const viewer = useRef(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentZoomLevel, setCurrentZoomLevel] =
    useState<number>(DEFAULT_ZOOM);

  const [docViewerState, setDocViewerState] = useState<any>({
    getPageCount: () => 1,
    getCurrentPage: () => currentPage,
    zoomTo: () => Object,
    setCurrentPage: (pageNum: number) => Object,
  });

  useEffect(() => {
    const initWebViewer = async () => {
      const instance = await WebViewer(
        {
          path: "/webviewer",
          initialDoc: filePath,
        },
        viewer.current
      );

      if (instance?.Core) {
        const { Core } = instance;

        Core.documentViewer.addEventListener("documentLoaded", () => {
          setDocViewerState(Core.documentViewer);
        });

        Core.documentViewer.addEventListener(
          "pageNumberUpdated",
          (pageNumber: number) => {
            setCurrentPage(pageNumber);
          }
        );

        if (instance.UI.iframeWindow?.document) {
          const iframeDoc = instance.UI.iframeWindow.document;
          const iframeStyle = document.createElement("style");
          iframeStyle.innerHTML = CustomPdfViewerStyles;
          iframeDoc.head.appendChild(iframeStyle);
        }

        let Feature = instance.UI.Feature;
        instance.UI.disableFeatures([Feature.Ribbons]);
        instance.UI.disableFeatures([Feature.Measurement]);
        instance.UI.disableFeatures([Feature.Copy]);
        instance.UI.disableFeatures([Feature.Search]);

        if (instance?.UI) {
          let FtMode = instance.UI.FitMode;
          instance.UI.setFitMode(FtMode?.FitWidth);
          instance.UI.openElements(["leftPanel"]);
          instance.UI.disableElements([
            "thumbnailsPanelButton",
            "outlinesPanelButton",
            "selectToolButton",
            "panToolButton",
            "toggleNotesButton",
            "menuButton",
            "searchPanel",
            "thumbnailsSizeSlider",
            "leftPanelTabs",
            "viewControlsButton",
            "zoomOverlayButton",
            "leftPanelButton",
            "header",
            "leftPanelResizeBar",
          ]);
        }
      }
    };
    initWebViewer();
  }, [filePath]);

  useEffect(() => {
    docViewerState.setCurrentPage(currentPage);
  }, [currentPage]);

  const handleZoom = (newZoomLevel: number) => {
    newZoomLevel = Math.min(Math.max(newZoomLevel, MIN_ZOOM), MAX_ZOOM);
    setCurrentZoomLevel(newZoomLevel);
    docViewerState.zoomTo(newZoomLevel);
  };

  return (
    <Grid container direction="row">
      <Grid item paddingLeft="8px" paddingTop="28px">
        <IconComponent src={BackIcon} onclick={onNavBack} data-testid="icon" />
      </Grid>
      <Grid item paddingLeft="6px" paddingTop="25px">
        <CustomTypography variant="h2" color={theme.palette.text.black}>
          {fileName}
        </CustomTypography>
      </Grid>
      <Box
        sx={{
          position: "absolute",
          right: theme.spacing(6),
          paddingTop: "12px",
        }}
      >
        <SearchPopup
          searchKey={searchKey}
          searchContent={searchContent}
          pdfName={fileName}
          data-testid="search-popup"
        />
      </Box>
      <Grid item xs={12}>
        <StyledBox ref={viewer}></StyledBox>
      </Grid>
      <PaginationStyle>
        <PDFPagination
          hanldeIncrement={() => handleZoom(currentZoomLevel + 0.1)}
          handleDecrement={() => handleZoom(currentZoomLevel - 0.1)}
          percentage={Math.round(currentZoomLevel * 100)}
          totalPages={docViewerState.getPageCount()}
          pageNumber={currentPage}
        ></PDFPagination>
      </PaginationStyle>
    </Grid>
  );
};

export default PDFViewer;
