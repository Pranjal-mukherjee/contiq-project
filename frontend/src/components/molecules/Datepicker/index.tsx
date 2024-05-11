import React, { useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import 'react-datepicker/dist/react-datepicker.css';
import { Close, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Popover } from "@mui/material";
import theme from "../../../theme";
import { DAYS_OF_WEEK, DAY } from "../../../utils/constants";
import TypographyComponent from "../../atoms/Typography";

type Props = {
  label: string;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

const DatePicker = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { label, date, setDate } = props;
  const divRef = useRef<HTMLDivElement>(null);

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    width: "fit-content",
    border:
      date === ""
        ? `1px solid ${theme.palette.grays.gray100}`
        : `1px solid ${theme.palette.primary.light}`,
    background:
      date === "" ? theme.palette.text.white : theme.palette.primary.light,
    padding: "8px",
    borderRadius: "4px",
  };

  const dateCalendarStyles = {
    ".MuiPickersCalendarHeader-root": {
      display: "flex",
      alignItems: "center",
      justifyItems: "center",
      paddingBottom: "12px",
    },
    ".MuiPickersCalendarHeader-root:first-child": {
      border: 0,
      paddingRight: "20px",
      paddingLeft: "20px",
    },
    ".MuiPickersArrowSwitcher-root": {
      display: "flex",
      marginLeft: "-12px",
    },
    ".MuiPickersCalendarHeader-label": {
      textAlign: "center",
      color: theme.palette.text.white,
    },
    ".MuiPickersArrowSwitcher-spacer": {
      width: "250px",
    },
    ".css-31ca4x-MuiPickersFadeTransitionGroup-root": {
      display: "flex",
      position: "absolute",
      paddingLeft: "100px",
    },
    ".MuiPickersFadeTransitionGroup-root-MuiDateCalendar-viewTransitionContainer":
      {
        borderTop: `1px solid ${theme.palette.grays.gray300}`,
      },
    ".MuiPickersArrowSwitcher-button": {
      paddingRight: "7px",
      color: theme.palette.grays.gray100,
    },
    ".MuiDayCalendar-weekDayLabel": {
      color: theme.palette.text.highEmphasis,
    },
    ".MuiPickersDay-root": {
      color: theme.palette.text.white,
    },
    ".MuiPickersDay-today": {
      background: theme.palette.grays.gray300,
      borderRadius: "2px",
      color: theme.palette.text.white,
    },
    ".MuiButtonBase-root.MuiPickersDay-root:not(.Mui-selected)": {
      border: 0,
    },
    ".MuiPickersDay-root.Mui-disabled:not(.Mui-selected)": {
      color: theme.palette.text.lowEmphasis,
    },
    ".MuiPickersDay-dayOutsideMonth": {
      color: theme.palette.text.lowEmphasis,
    },
    ".css-7se398-MuiPickersCalendarHeader-labelContainer": {
      marginLeft: "2rem",
    },
    ".css-1bx5ylf": {
      display: "block",
      position: "absolute",
      margin: "30%",
    },
    background: theme.palette.grays.gray400,
    border: `1px solid ${theme.palette.grays.gray100}`,
  };
  const popoverOnCloseHandler = () => {
    setAnchorEl(null);
  };

  const expandMoreClickHandler = () => {
    setAnchorEl(divRef.current);
  };

  const closeClickHandler = (e: any) => {
    setDate("");
    setAnchorEl(null);
  };

  const dayOfWeekFormatterHandler = (dayOfWeek: string) =>
    DAYS_OF_WEEK.get(dayOfWeek) ?? "";

  const dateCalendarChangeHandler = (value: string | null) => {
    if (value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const monthName = new Intl.DateTimeFormat("en", {
        month: "long",
      }).format(date);
      const day = date.getDate();

      setDate(`${day} ${monthName} ${year}`);
      setAnchorEl(null);
    }
  };

  const getIcon = () => {
    if (date === "") {
      if (anchorEl !== null) {
        return <ExpandLess />;
      } else {
        return <ExpandMore onClick={expandMoreClickHandler} />;
      }
    } else {
      return <Close onClick={closeClickHandler} />;
    }
  };

  return (
    <>
      <div ref={divRef} style={divStyle}>
        <TypographyComponent
          variant="body1"
          children={date === "" ? label : date}
        />
        {getIcon()}
      </div>
      <Popover
        open={anchorEl !== null}
        onClose={popoverOnCloseHandler}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        anchorEl={divRef.current}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            onChange={dateCalendarChangeHandler}
            sx={dateCalendarStyles}
            views={[DAY]}
            disableFuture
            showDaysOutsideCurrentMonth
            dayOfWeekFormatter={dayOfWeekFormatterHandler}
            className="MuiPickersFadeTransitionGroup-root css-31ca4x-MuiPickersFadeTransitionGroup-root"
          />
        </LocalizationProvider>
      </Popover>
    </>
  );
};
export default DatePicker;
