import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterPageInputs from "../../src/authPages/RegisterPage/RegisterPageInputs";

test("renders all input fields with correct labels and allows state updates", () => {
  // Mock state handlers
  const mockSetMail = jest.fn();
  const mockSetUsername = jest.fn();
  const mockSetPassword = jest.fn();

  // Render the component with mock props
  render(
    <RegisterPageInputs
      mail=""
      setMail={mockSetMail}
      username=""
      setUsername={mockSetUsername}
      password=""
      setPassword={mockSetPassword}
    />
  );

  // Check for input elements
  const emailInput = screen.getByPlaceholderText("Enter e-mail address");
  const usernameInput = screen.getByPlaceholderText("Enter a username");
  const passwordInput = screen.getByPlaceholderText("Enter password");

  // Assert inputs are present
  expect(emailInput).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  // Simulate input changes
  fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Verify the mock functions are called with correct values
  expect(mockSetMail).toHaveBeenCalledWith("test@mail.com");
  expect(mockSetUsername).toHaveBeenCalledWith("testuser");
  expect(mockSetPassword).toHaveBeenCalledWith("password123");
});
