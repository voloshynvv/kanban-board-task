import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { renderWithProviders } from './utils/test';
import { App } from './app';
import { server } from './setup-tests';
import { http, HttpResponse } from 'msw';
import { env } from './config/env';

describe('App flow', () => {
  it('shows intro screen when search options are empty', () => {
    renderWithProviders(<App />);

    expect(screen.getByText(/Enter a GitHub repository to get started!/i)).toBeInTheDocument();
  });

  it('shows error screen on api error', async () => {
    const initialState = {
      owner: 'facebook',
      repo: 'react',
      url: 'https://github.com/facebook/react',
    };

    server.use(
      http.get(`${env.baseUrl}/repos/:owner/:repo`, () => {
        return new HttpResponse(null, { status: 404 });
      }),
    );
    server.use(
      http.get(`${env.baseUrl}/repos/:owner/:repo/issues`, () => {
        return new HttpResponse(null, { status: 404 });
      }),
    );

    renderWithProviders(<App />, { preloadedState: { search: initialState } });

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('fetches and receives issues and repo info after clicking load issue button', async () => {
    renderWithProviders(<App />);

    const inputEl = screen.getByLabelText(/enter repo url/i);
    const button = screen.getByRole('button', {
      name: /load issues/i,
    });

    fireEvent.change(inputEl, { target: { value: 'https://github.com/facebook/react' } });
    fireEvent.click(button);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText('mocked repo')).toBeInTheDocument();
    expect(await screen.findAllByTestId('dnd-cart')).toHaveLength(2);
  });
});
