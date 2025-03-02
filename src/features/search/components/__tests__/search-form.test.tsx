import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test';

import { Form, SearchForm } from '../search-form';

const buttonName = /load issues/i;
const inputLabel = /enter repo url/i;

describe('SearchForm', () => {
  it('renders input with provided url', () => {
    const initialState = {
      url: 'https://github.com/facebook/react',
      repo: 'react',
      owner: 'facebook',
    };

    renderWithProviders(<SearchForm />, { preloadedState: { search: initialState } });

    const inputEl = screen.getByLabelText(inputLabel);

    expect(inputEl).toHaveValue('https://github.com/facebook/react');
  });
});

describe('Form', () => {
  it('renders form elements correctly', () => {
    renderWithProviders(<Form />);

    const inputEl = screen.getByLabelText(inputLabel);
    const button = screen.getByRole('button', {
      name: buttonName,
    });

    expect(inputEl).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('shows an error message for an invalid repo url', () => {
    renderWithProviders(<Form />);

    const inputEl = screen.getByLabelText(inputLabel);
    fireEvent.change(inputEl, { target: { value: 'invalid url' } });

    expect(screen.getByRole('button', { name: buttonName })).toBeDisabled();
    expect(screen.getByText(/repo url is not valid/i)).toBeInTheDocument();
  });

  it('does not submit the form when input value nit change', () => {
    const { store } = renderWithProviders(<Form />);

    const inputEl = screen.getByLabelText(inputLabel);
    const button = screen.getByRole('button', {
      name: buttonName,
    });

    fireEvent.change(inputEl, { target: { value: 'https://github.com/facebook/react' } });
    fireEvent.click(button);

    expect(store.getState().search).toEqual({
      repo: 'react',
      owner: 'facebook',
      url: 'https://github.com/facebook/react',
    });
  });

  it('submits the form if url is valid', () => {
    const { store } = renderWithProviders(<Form />);

    const inputEl = screen.getByLabelText(inputLabel);
    const button = screen.getByRole('button', {
      name: buttonName,
    });

    fireEvent.change(inputEl, { target: { value: 'https://github.com/facebook/react' } });
    fireEvent.click(button);

    expect(store.getState().search).toEqual({
      repo: 'react',
      owner: 'facebook',
      url: 'https://github.com/facebook/react',
    });
  });

  it('reset the search state when input is empty', () => {
    const initialState = {
      url: 'https://github.com/facebook/react',
      repo: 'react',
      owner: 'facebook',
    };

    const { store } = renderWithProviders(<Form />, { preloadedState: { search: initialState } });

    const inputEl = screen.getByLabelText(inputLabel);
    const button = screen.getByRole('button', {
      name: buttonName,
    });

    fireEvent.change(inputEl, { target: { value: '' } });
    fireEvent.click(button);

    expect(store.getState().search).toEqual({
      url: '',
      repo: '',
      owner: '',
    });
  });
});
