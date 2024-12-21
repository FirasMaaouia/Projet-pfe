import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers
import { act } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import RegisterPage from "../../src/authPages/RegisterPage/RegisterPage";

const mockStore = configureStore([]);

describe('Register Page Integration Test', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { isAuthenticated: false },
    });
  });

  afterEach(() => {
    cleanup(); // Cleans up the DOM between tests
  });

  test('registers a new user successfully', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <RegisterPage register={jest.fn()} />
          </BrowserRouter>
        </Provider>
      );
    });

    // Assertion: Check if the Register button is in the document
    expect(screen.getByText(/Register/)).toBeInTheDocument();
  });
});
