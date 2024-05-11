import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Loader from '.';

jest.useFakeTimers();

describe('to test Loader component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  })
  afterEach(() => {
    jest.clearAllTimers();
  })
  test('should renders Loader component with the progress bar', () => {
    const { container } = render(<Loader />);
    const loaderElement = container.querySelector('.MuiLinearProgress-root');
    expect(loaderElement).toBeInTheDocument();
  });

  test('should reach full progress in loader', () => {
    render(<Loader />);
    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toBeInTheDocument();

    const intialProgress = Number(progressBar.getAttribute("aria-valuenow"));
    expect(intialProgress).toBe(10);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    const updatedProgress = Number(progressBar.getAttribute("aria-valuenow"));
    expect(updatedProgress).toBe(20);

    act(() => {
      jest.advanceTimersByTime(1600);
    });

    const finalProgress = Number(progressBar.getAttribute("aria-valuenow"));
    expect(finalProgress).toBe(100);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const afterFinalProgress = Number(progressBar.getAttribute("aria-valuenow"));


    expect(afterFinalProgress).toBe(100);
  });
});
