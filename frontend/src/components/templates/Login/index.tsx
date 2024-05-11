import { Box, Grid, styled } from "@mui/material";
import { ReactNode } from "react";

export interface ILoginTemplateProps {
  rightPanel: ReactNode;
  leftPanel: ReactNode;
}

const RootGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "row",
  padding: "0px",
  margin: 0,
  height: "100vh",
  width: "100%",
}));

const RightPanelBox = styled(Box)(() => ({
  display: "flex",
  width: "80%",
  marginX: "auto",
  height: "100%",
  alignItems: "center",
}));

const LoginTemplate = (props: ILoginTemplateProps) => {
  return (
    <RootGrid>
      <Grid item width={"60%"}>
        {props.leftPanel}
      </Grid>
      <Grid item width={"40%"}>
        <RightPanelBox marginX="auto">{props.rightPanel}</RightPanelBox>
      </Grid>
    </RootGrid>
  );
};

export default LoginTemplate;
