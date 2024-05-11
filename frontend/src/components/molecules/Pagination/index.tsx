import ImageComponent from '@components/atoms/Image';
import {
  Box,
  Card,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import theme from '@src/theme';
import { MouseEventHandler } from 'react';
import MinusIcon from '../../../../public/assets/icons/minus.svg';
import PlusIcon from '../../../../public/assets/icons/plus.svg';

export interface IPaginationProps {
  handleDecrement: MouseEventHandler<HTMLButtonElement> | undefined;
  hanldeIncrement: MouseEventHandler<HTMLButtonElement> | undefined;
  percentage: number;
  totalPages: number;
  pageNumber: number;
}

const PaginationBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: theme.spacing(2),
}));

const ZoomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.grays?.gray300,
  borderRadius: theme.spacing(2),
  color: 'white',
}));

const PDFPagination = (props: IPaginationProps) => {
  return (
    <Card
      sx={{
        borderRadius: '8px',
        bgcolor: theme.palette.grays.gray400,
        maxWidth: theme.spacing(80),
      }}
    >
      <PaginationBox>
        <Box alignSelf={'center'}>
          <Typography
            variant="body1"
            color={theme.palette.text.highEmphasis}
          >
            Page {props.pageNumber} of {props.totalPages}
          </Typography>
        </Box>
        <ZoomBox data-testid="pagination">
          <IconButton onClick={props.handleDecrement}>
            <ImageComponent imgSrc={MinusIcon} imgAlt={'Zoom out'} />
          </IconButton>
          <Typography alignSelf={'center'}>
            {props.percentage}
          </Typography>
          <IconButton onClick={props.hanldeIncrement}>
            <ImageComponent imgSrc={PlusIcon} imgAlt={'Zoom in'} />
          </IconButton>
        </ZoomBox>
      </PaginationBox>
    </Card>
  );
};

export default PDFPagination;
