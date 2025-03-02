import { screen } from '@testing-library/react';
import { RepoDetails } from '../repo-details';
import { renderWithProviders } from '@/utils/test';

describe('RepoDetails', () => {
  const repoMock = {
    id: 10270250,
    name: 'react',
    description: 'The library for web and native user interfaces.',
    url: 'https://github.com/facebook/react',
    owner: {
      login: 'facebook',
      url: 'https://github.com/facebook',
    },
    stars: 232791,
  };

  it('renders repo details', () => {
    renderWithProviders(<RepoDetails repo={repoMock} />);

    expect(screen.getByText(repoMock.name)).toBeInTheDocument();
    expect(screen.getByText(repoMock.owner.login)).toBeInTheDocument();
    expect(screen.getByText(repoMock.stars)).toBeInTheDocument();
  });
});
