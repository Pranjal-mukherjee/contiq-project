import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUpload, { FileDropProps } from './';
import { ThemeProvider } from '@mui/system';
import theme from '@src/theme';
import { FILE_UPLOAD_TEXT } from '../../../utils/constants';

describe('FileUpload Component', () => {
  const mockHandleFileChange = jest.fn();
  const mockOnClick = jest.fn();

  const renderComponent = (props: Partial<FileDropProps> = {}) => {
    const defaultProps: FileDropProps = {
      selectedFile: null,
      handleFileChange: mockHandleFileChange,
      onClick: mockOnClick,
    };

    const mergedProps = { ...defaultProps, ...props };

    return render(
      <ThemeProvider theme={theme}>
        <FileUpload {...mergedProps} />
      </ThemeProvider>
    );
  };

  it('renders the choose file container when no file is selected', () => {
    renderComponent();

    expect(screen.getByText(FILE_UPLOAD_TEXT[1])).toBeInTheDocument();
    expect(
      screen.getByTestId('choose-file-container')
    ).toBeInTheDocument();
  });

  it('triggers handleFileChange when a file is selected', () => {
    renderComponent();

    const fileInput = screen.getByLabelText(FILE_UPLOAD_TEXT[1]);

    fireEvent.change(
      fileInput,
      new File(['file contents'], 'file.pdf', {
        type: 'application/pdf',
      })
    );

    expect(mockHandleFileChange).toHaveBeenCalledWith(
      expect.any(Object)
    );

    expect(screen.getByText(FILE_UPLOAD_TEXT[1])).toBeInTheDocument();
  });

  it('renders the file upload container when a file is selected', () => {
    renderComponent({
      selectedFile: new File(['file contents'], 'file.pdf', {
        type: 'application/pdf',
      }),
    });

    expect(screen.getByText(FILE_UPLOAD_TEXT[2])).toBeInTheDocument();
    expect(
      screen.getByTestId('file-upload-container')
    ).toBeInTheDocument();
  });
});
