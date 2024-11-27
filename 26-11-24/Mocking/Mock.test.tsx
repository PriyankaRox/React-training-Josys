// Mocking in Unit Testing
// Mocking in unit testing refers to creating a simulated or "mock" version of a function, module, or API to isolate the unit of code being tested. Mocking ensures that external dependencies (like APIs, third-party libraries, or unrelated functions) don’t interfere with the behavior and results of the tests.

// Mocking is especially useful when:

// You want to test a function that calls external APIs or services.
// You need to avoid actual side effects (like modifying the database or making network requests).
// A function relies on other parts of the application you don't want to test in the current test case.
// In React, mocking is often used for API calls, event handlers, or other external dependencies in components.

import axios from 'axios';

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import MyComponent from './MyComponent';

jest.mock("axios"); // Mock axios

test("should fetch and display data on button click", async () => {
  axios.get.mockResolvedValueOnce({ data: { message: "Hello, Jest!" } });

  render(<MyComponent />);

  fireEvent.click(screen.getByRole("button", { name: /fetch data/i }));

  await waitFor(() => {
    expect(screen.getByText("Hello, Jest!")).toBeInTheDocument();
  });

  expect(axios.get).toHaveBeenCalledWith("/api/data");
  expect(axios.get).toHaveBeenCalledTimes(1);
});
