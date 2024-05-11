import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DuplicationModal from '.';
import { MODAL_TEXT } from '@src/utils/constants';

jest.mock('../../../utils/constants', () => ({
  MODAL_TEXT: [
    'Upload options',
    'Subtitle',
    'Contract agreement.pdf',
  ],
}));

describe('DuplicationModal Component', () => {
  const mockClickToCancel = jest.fn();
  const mockClickToUpload = jest.fn();

  const renderComponent = () => {
    return render(
      <DuplicationModal
        fileName={null}
        clickToCancel={mockClickToCancel}
        clickToUpload={mockClickToUpload}
      />
    );
  };

  it('renders modal with default file name and buttons', () => {
    renderComponent();

    expect(screen.getByText(MODAL_TEXT[0])).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  it('renders modal with custom file name', () => {
    render(
      <DuplicationModal
        fileName={null}
        clickToCancel={mockClickToCancel}
        clickToUpload={mockClickToUpload}
      />
    );
  });

  it('calls clickToCancel function when Cancel button is clicked', () => {
    renderComponent();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockClickToCancel).toHaveBeenCalled();
  });

  it('calls clickToUpload function when Upload button is clicked', () => {
    renderComponent();

    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    expect(mockClickToUpload).toHaveBeenCalled();
  });
});
