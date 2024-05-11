import { Divider, styled } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import DownArrow from "../../../../public/assets/icons/downarrow.svg";
import CloseIcon from "../../../../public/assets/icons/notificationClose.svg";
import UpArrow from "../../../../public/assets/icons/uparrow.svg";
import theme from "../../../theme";
import { CLOSE_NOT_FOUND, NOT_FOUND } from "../../../utils/constants";
import TypographyComponent from "../../atoms/Typography";

const StyledSelect = styled(Select)`
  && {
    height: 36px;
    width: fit-content;
    border-radius: 4px;
    padding: 22px;
    padding-left: 0px !important;
    padding-right: 5px !important;
    .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
      padding-right: 12px !important;
    }
    border: ${({ value }) =>
      value === ""
        ? `1px solid ${theme.palette.grays.gray100}`
        : `1px solid #BFBFBF`};
    & .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }
    background-color: ${({ value }) =>
      value ? theme.palette.primary.light : theme.palette.text.white};
  }
`;

export interface FilterProps {
  menuItems: string[];
  placeholder: string;
  label: string;
}
const Filter: React.FC<FilterProps> = ({ menuItems, placeholder, label }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleReset = () => {
    setValue("");
  };

  const renderIcon = () => {
    if (value !== "" && !isOpen) {
      return (
        <img
          src={CloseIcon}
          alt={CLOSE_NOT_FOUND}
          style={{ cursor: "pointer" }}
          onClick={handleReset}
          onKeyDown={() => {}}
        />
      );
    } else if (isOpen) {
      return (
        <img src={UpArrow} alt={NOT_FOUND} style={{ cursor: "pointer" }} />
      );
    } else {
      return (
        <img src={DownArrow} alt={NOT_FOUND} style={{ cursor: "pointer" }} />
      );
    }
  };
  const paperStyle = {
    backgroundColor: theme.palette.text.black,
    color: theme.palette.text.white,
    width: "259px",
    marginLeft:"80px",
    marginTop: "8px",
    boxShadow: "none",

  };
  return (
    <div>
      <FormControl>
        <StyledSelect
          value={value}
          displayEmpty
          data-testid="select"
          onChange={handleChange}
          onOpen={toggleDropdown}
          onClose={toggleDropdown}
          MenuProps={{
            PaperProps: {
              style: paperStyle,
            },
          }}
          IconComponent={() => renderIcon()}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="" disabled style={{ display: "none" }}>
            <TypographyComponent variant="body1" children={placeholder} />
          </MenuItem>
          <MenuItem style={{ pointerEvents: "none" }}>
            <TypographyComponent variant="body1" children={label} />
          </MenuItem>
          <Divider sx={{ backgroundColor: "grey" }} />
          {menuItems.map((value) => (
            <MenuItem key={value} value={value}>
              <TypographyComponent variant="body1" children={value} />
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </div>
  );
};

export default Filter;
