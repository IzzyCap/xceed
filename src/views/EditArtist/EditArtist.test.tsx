import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArtistContext } from '@/context/Artist';
import EditArtist from './EditArtist';
import { ReactNode } from 'react';
import { fillArtistForm } from './test-utils/utils';

const queryClient = new QueryClient();

describe('EditArtist', () => {
  it('handles form submission', async () => {
    userEvent.setup()
    const setArtistMock = vi.fn();
    const wrapper = ({ children }: {children: ReactNode}) => (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true
        }}>
          <ArtistContext.Provider
            value={{
              artist: {
                id: 'test',
                slug: 'test-slug',
                name: 'Test Artist',
                musicGenres: [],
                description: '',
                coverUrl: '',
                recordLabel: '',
                website: '',
                spotify: '',
                soundcloud: '',
                mixcloud: '',
                tracks: [],
              },
              isArtistLoading: false,
              setArtist: setArtistMock,
              setArtistId: vi.fn(),
              getArtistRequest: vi.fn(),
            }}
          >
            {children}
          </ArtistContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    );

    render(<EditArtist />, { wrapper });

    // Fill form
    await fillArtistForm()

    // Save result
    const saveButton = screen.getByRole('button', { name: /save artist/i });
    fireEvent.click(saveButton);

    expect(setArtistMock).toHaveBeenCalledWith({
      coverUrl: 'https://test.com/image.jpg',
      description: 'Artist bio',
      id: 'test',
      mixcloud: 'Test mixcloud',
      musicGenres: [{name:'House'}],
      name: 'Test Artist',
      recordLabel: 'Test Label',
      slug: 'test-slug',
      soundcloud: 'Test soundcloud',
      spotify: 'Test spotify',
      tracks: [],
      website: 'Test website',
    });
  });
});
