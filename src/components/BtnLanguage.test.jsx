import React from 'react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import BtnLanguage from './BtnLanguage';
import { LanguageProvider, LANGUAGES } from '../contexts/LanguageContext';
expect.extend(matchers);
const mockChangeLanguage = vi.fn();

function renderWithContext(language = 'id') {
  return render(
    <LanguageProvider value={{ language, changeLanguage: mockChangeLanguage }}>
      <BtnLanguage />
    </LanguageProvider>
  );
}

describe('BtnLanguage', () => {
  afterEach(() => cleanup());
  it('shows current language code', () => {
    renderWithContext('en');
    expect(screen.getByTestId('toggleLanguage')).toHaveTextContent('EN');
  });

  it('shows all language options in dropdown', () => {
    renderWithContext('id');
    fireEvent.click(screen.getByTestId('toggleLanguage'));
    LANGUAGES.forEach((lang) => {
      expect(screen.getByText(lang.label)).toBeInTheDocument();
    });
  });

  it('calls changeLanguage when a language is clicked', () => {
    renderWithContext('id');
    fireEvent.click(screen.getByTestId('toggleLanguage'));
    fireEvent.click(screen.getByText(LANGUAGES[1].label));
    expect(mockChangeLanguage).toHaveBeenCalledWith(LANGUAGES[1].code);
  });
});
