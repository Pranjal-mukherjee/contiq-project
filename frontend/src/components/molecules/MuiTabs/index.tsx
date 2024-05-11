import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import theme from "../../../theme";

export interface MuiTabsProps {
  variant: "standard" | "scrollable" | "fullWidth";
  tabNames: string[];
  sxProps?: any;
  selectedColor?: string;
  backgroundColor?: string;
  notSelectedColor?: string;
  isTabDisabled?: boolean;
  onSelectTab: (tabName: string) => void;
  handleChange:(e:any,newValue:number)=>void;
  selectIndex:number;
  borderBottom?: string;
}

const MuiTabs: React.FC<MuiTabsProps> = ({
  variant = "standard",
  tabNames,
  sxProps,
  selectedColor,
  backgroundColor,
  notSelectedColor,
  isTabDisabled = false,
  handleChange,
  borderBottom,
  selectIndex,
  onSelectTab,
}) => {

  return (
    <Box
      sx={{
        width: "100%",
        ...sxProps,
        backgroundColor: backgroundColor,
        "& .MuiTab-root": { ...theme.typography.body1 },
        borderBottom: borderBottom,
      }}
      data-testid="mui-tabs"

    >
      <Tabs value={selectIndex} onChange={handleChange} variant={variant}>
        {tabNames.map((name) => (
          <Tab
            key={name}
            label={name}
            disabled={isTabDisabled}
            sx={{
              height: "100%",
              maxHeight: "100%",
              textTransform: "none",
              fontWeight: "600",
              color: notSelectedColor,
              
              fontSize: "14px",
              "&.Mui-selected": { color: selectedColor },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default MuiTabs;
