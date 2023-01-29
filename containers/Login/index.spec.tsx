import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import Login from ".";
import {
  EMAIL_ERROR_TEXT,
  PASSWORD_ERROR_TEXT,
} from "./components/LoginForm/constants";
import { LoginFormPropsI } from "./interfaces";
import useLogin from "./useLogin";

jest.mock("./useLogin");

describe("Container - Login", () => {
  const fakeReturnValue: LoginFormPropsI = {
    isLoading: false,
    error: "",
    onLogin: jest.fn(),
    onResetError: jest.fn(),
  };

  afterEach(jest.resetAllMocks);

  it("should have a disabled button with a loading text if useLogin returns an isLoading state", () => {
    const isLoading = true;
    jest.mocked(useLogin).mockReturnValue({ ...fakeReturnValue, isLoading });
    render(<Login />);

    const buttonElement = screen.getByRole("button", { name: "login" });

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveTextContent(/loading/i);
  });

  it("should have an error Alert with the error text and the button should be enabled if useLogin returns an error", () => {
    const error = "fake error";
    jest.mocked(useLogin).mockReturnValue({ ...fakeReturnValue, error });
    render(<Login />);

    screen.getByRole("alert");
    screen.getByText(error);
  });

  it("should call onLogin callback when the LoginForm triggers onLogin", async () => {
    const { onLogin } = fakeReturnValue;
    const user = userEvent.setup();
    jest.mocked(useLogin).mockReturnValue({ ...fakeReturnValue });

    render(<Login />);
    const buttonElement = screen.getByRole("button", { name: "login" });
    const emailInputElement = screen.getByLabelText("email");
    const passwordInputElement = screen.getByLabelText("password");

    await user.type(emailInputElement, "hi@test.co");
    await user.type(passwordInputElement, "12");
    await user.click(buttonElement);

    expect(onLogin).toHaveBeenCalled();
  });

  it("should call onReset callback when the LoginForm triggers onReset", async () => {
    const error = "fake error";
    const { onResetError } = fakeReturnValue;
    const user = userEvent.setup();
    jest.mocked(useLogin).mockReturnValue({ ...fakeReturnValue, error });

    render(<Login />);

    const emailInputElement = screen.getByLabelText("email");

    await user.type(emailInputElement, "h");
    expect(onResetError).toHaveBeenCalled();
  });
});
