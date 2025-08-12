import { render, screen } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
// import '@testing-library/jest-dom';
import * as redux from 'react-redux';

// Mock the router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock fetchOpportunities dispatch
jest.mock('@/redux/opportunitiesSlice', () => ({
  fetchOpportunities: jest.fn(() => ({ type: 'FETCH_OPPORTUNITIES' })),
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'mock-token');
  });

  it('renders loading state when loading is true', () => {
    const mockSelector = jest.spyOn(redux, 'useSelector' as any);
    mockSelector.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const mockSelector = jest.spyOn(redux, 'useSelector' as any);
    mockSelector.mockReturnValue({
      data: [],
      loading: false,
      error: 'Something went wrong',
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Error: Something went wrong/i)).toBeInTheDocument();
  });

  it('renders job cards when jobs are available', () => {
    const mockSelector = jest.spyOn(redux, 'useSelector' as any);
    mockSelector.mockReturnValue({
      data: [
        {
          id: '1',
          title: 'Frontend Developer',
          orgName: 'Tech Co',
          logoUrl: '',
          location: ['Remote'],
          description: 'Great opportunity',
          opType: 'Full-time',
          categories: ['Development'],
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Co/i)).toBeInTheDocument();
  });
});
