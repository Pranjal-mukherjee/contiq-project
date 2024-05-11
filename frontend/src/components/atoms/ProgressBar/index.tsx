import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import theme from "@src/theme";
import { useEffect, useState } from "react";

export default function LinearDeterminate() {
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 200);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: "8px",
          borderRadius: "5px",
          backgroundColor: theme.palette.grays.gray700,
          "& .MuiLinearProgress-bar": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      />
    </Box>
  );
}
