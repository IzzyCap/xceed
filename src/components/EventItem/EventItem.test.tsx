import {render, screen} from '@testing-library/react';
import {vi} from 'vitest'

import EventItem from '.';
describe('EventItem', () => {
  
  const event = {
    id: '1',
    name: 'Test Event',
    coverUrl: 'test-cover-url',
    startingTime: 1620000000,
    endingTime: 1620000200,
    legacyId: 1,
    slug: 'test-event',
    venue: {
      city: {
        coverUrl: 'test-cover-url',
        currency: 'test-currency',
        id: '2',
        legacyId: 2,
        name: 'Test City',
        slug: 'test-city',
        timezone: 'test-timezone',
      },
      coordinates: {
        latitude: 1,
        longitude: 1,
      },
      coverUrl: 'test-cover-url',
      id: '2',
      legacyId: 2,
      name: 'Test Venue',
      slug: 'test-venue',
    },
  };
  it('should render', () => {
    render(<EventItem event={event} onClick={() => vi.fn()}/>);
  });
  it('should render with correct date', () => {
    render(<EventItem event={event} onClick={() => vi.fn()}/>);
    const day = screen.getByText('M3');
    const month = screen.getByText('MAY');
    expect(day).toBeInTheDocument();
    expect(month).toBeInTheDocument();
  });
  it('should render with correct name', () => {
    render(<EventItem event={event} onClick={() => vi.fn()}/>);
    const name = screen.getByText(event.name);
    expect(name).toBeInTheDocument();
  });
  it('should render with correct city', () => {
    render(<EventItem event={event} onClick={() => vi.fn()}/>);
    const city = screen.getByText(event.venue.city.name);
    expect(city).toBeInTheDocument();
  });
  it('should render with correct image', () => {
    render(<EventItem event={event} onClick={() => vi.fn()}/>);
    const image = screen.getByAltText(`event ${event.name} photo`);
    expect(image).toBeInTheDocument();
  });
  it('should call onClick with correct id', () => {
    const onClick = vi.fn();
    render(<EventItem event={event} onClick={onClick}/>);
    const article = screen.getByRole('article');
    article.click();
    expect(onClick).toHaveBeenCalledWith(event.id);
  });
}); 
