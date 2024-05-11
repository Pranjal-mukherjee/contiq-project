import {
  CircularProgress,
  CircularProgressProps,
} from '@mui/material';

export interface ICircularLoadProps extends CircularProgressProps {
  loaderColor: any;
}

const StyledCircularLoad = (props: ICircularLoadProps) => {
  return (
    <CircularProgress
      color={props.loaderColor}
      data-test-id="test-loader"
    />
  );
};

export default StyledCircularLoad;
