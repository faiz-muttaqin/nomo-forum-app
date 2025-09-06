import React from 'react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BtnMotion from './BtnMotion';
expect.extend(matchers);
describe('BtnMotion', () => {
  it('renders children correctly', () => {
    render(<BtnMotion>Click Me</BtnMotion>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    render(<BtnMotion className="btn-primary">Test</BtnMotion>);
    expect(screen.getByText('Test')).toHaveClass('btn-primary');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<BtnMotion onClick={handleClick}>Click</BtnMotion>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
