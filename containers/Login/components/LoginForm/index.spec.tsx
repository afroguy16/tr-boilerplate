import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from ".";
import { EMAIL_ERROR_TEXT, PASSWORD_ERROR_TEXT } from "./constants";

describe("Component - Login Form", () => {
  const props = {
    isLoading: false,
    error: "",
    onSubmit: jest.fn(),
  };

  it("should have a disabled login button which doesn't contain the text 'loading' when it is not loading", () => {
    render(<LoginForm {...props} />);

    const errorAlertElement = screen.queryByRole("alert", { name: "error" });
    const emailInputElement = screen.getByLabelText("email");
    const emailErrorTextElement = screen.queryByText(EMAIL_ERROR_TEXT);
    const buttonElement = screen.getByRole("button", { name: "login" });

    expect(errorAlertElement).not.toBeInTheDocument();
    expect(emailInputElement).toBeValid();
    expect(emailErrorTextElement).not.toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).not.toHaveTextContent(/loading/i);
  });

  it("should not display error indicators if an invalid email is typed and the email focus hasn't been lost", async () => {
    const user = userEvent.setup();
    render(<LoginForm {...props} />);

    const errorAlertElement = screen.queryByRole("alert", { name: "error" });
    const buttonElement = screen.getByRole("button", { name: "login" });
    const emailInputElement = screen.getByLabelText("email");
    const emailErrorTextElement = screen.queryByText(EMAIL_ERROR_TEXT);

    await user.type(emailInputElement, "hi");

    expect(emailInputElement).toBeInvalid(); // the html native validator would invalidate this by default, because it's type email
    expect(emailErrorTextElement).not.toBeInTheDocument(); // this however won't be in the document until we trigger our js invalidation on blur
    expect(buttonElement).toBeDisabled();

    expect(errorAlertElement).not.toBeInTheDocument();
    expect(buttonElement).not.toHaveTextContent(/loading/i);
  });

  it("should display error indicators if an invalid email is typed and the email focus has been lost", async () => {
    const user = userEvent.setup();
    render(<LoginForm {...props} />);

    const errorAlertElement = screen.queryByRole("alert", { name: "error" });
    const buttonElement = screen.getByRole("button", { name: "login" });
    const emailInputElement = screen.getByLabelText("email");

    await user.type(emailInputElement, "hi");
    act(() => {
      emailInputElement.blur();
    });

    const emailErrorTextElement = screen.getByText(EMAIL_ERROR_TEXT);
    expect(emailErrorTextElement).toBeInTheDocument();
    expect(emailInputElement).toBeInvalid();

    expect(buttonElement).toBeDisabled();
    expect(errorAlertElement).not.toBeInTheDocument();
    expect(buttonElement).not.toHaveTextContent(/loading/i);
  });

  it("should not display error indicators if an invalid password is typed and the password focus hasn't been lost", async () => {
    const user = userEvent.setup();
    render(<LoginForm {...props} />);

    const errorAlertElement = screen.queryByRole("alert", { name: "error" });
    const buttonElement = screen.getByRole("button", { name: "login" });
    const passwordInputElement = screen.getByLabelText("password");

    await user.type(passwordInputElement, "1");

    const passwordErrorTextElement = screen.queryByText(PASSWORD_ERROR_TEXT);
    expect(passwordErrorTextElement).not.toBeInTheDocument();
    expect(passwordInputElement).toBeValid();

    expect(buttonElement).toBeDisabled();
    expect(errorAlertElement).not.toBeInTheDocument();
    expect(buttonElement).not.toHaveTextContent(/loading/i);
  });

  it("should display error indicators if an invalid password is typed and the password focus has been lost", async () => {
    const user = userEvent.setup();
    render(<LoginForm {...props} />);

    const errorAlertElement = screen.queryByRole("alert", { name: "error" });
    const buttonElement = screen.getByRole("button", { name: "login" });
    const passwordInputElement = screen.getByLabelText("password");

    await user.type(passwordInputElement, "1");
    act(() => {
      passwordInputElement.blur();
    });

    const passwordErrorTextElement = screen.queryByText(PASSWORD_ERROR_TEXT);
    expect(passwordErrorTextElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInvalid();

    expect(buttonElement).toBeDisabled();
    expect(errorAlertElement).not.toBeInTheDocument();
    expect(buttonElement).not.toHaveTextContent(/loading/i);
  });

  it("button should be enabled if ", async () => {
    const user = userEvent.setup();
    render(<LoginForm {...props} />);

    const errorAlertElement = screen.queryByRole("alert", { name: "error" });
    const buttonElement = screen.getByRole("button", { name: "login" });
    const emailInputElement = screen.getByLabelText("email");

    await user.type(emailInputElement, "hi");
    act(() => {
      emailInputElement.blur();
    });

    const emailErrorTextElement = screen.getByText(EMAIL_ERROR_TEXT);
    expect(emailErrorTextElement).toBeInTheDocument();
    expect(emailInputElement).toBeInvalid();

    expect(buttonElement).toBeDisabled();
    expect(errorAlertElement).not.toBeInTheDocument();
    expect(buttonElement).not.toHaveTextContent(/loading/i);
  });

  it("should enable the login button once password and email have been typed correctly", async () => {
    const user = userEvent.setup();
    render(<LoginForm {...props} />);

    const errorAlertElement = screen.queryByRole("alert", { name: "error" });
    const buttonElement = screen.getByRole("button", { name: "login" });
    const emailInputElement = screen.getByLabelText("email");
    const passwordInputElement = screen.getByLabelText("password");

    await user.type(emailInputElement, "hi@test.co");
    act(() => {
      emailInputElement.blur();
    });

    const emailErrorTextElement = screen.queryByText(EMAIL_ERROR_TEXT);
    expect(emailErrorTextElement).not.toBeInTheDocument();
    expect(emailInputElement).toBeValid();

    await user.type(passwordInputElement, "12");
    act(() => {
      passwordInputElement.blur();
    });

    const passwordErrorTextElement = screen.queryByText(PASSWORD_ERROR_TEXT);
    expect(passwordErrorTextElement).not.toBeInTheDocument();
    expect(passwordInputElement).toBeValid();

    expect(buttonElement).toBeEnabled();
    expect(errorAlertElement).not.toBeInTheDocument();
    expect(buttonElement).not.toHaveTextContent(/loading/i);
  });

  it("should disable the login button and display loading in the button when the form is loading", async () => {
    const localProps = { ...props, isLoading: true };
    render(<LoginForm {...localProps} />);

    const buttonElement = screen.getByRole("button", { name: "login" });

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveTextContent(/loading/i);
  });

  it("should disable the login button if it is loading even when the email and password are valid", async () => {
    const user = userEvent.setup();
    const localProps = { ...props, isLoading: true };
    render(<LoginForm {...localProps} />);

    const errorAlertElement = screen.queryByRole("alert", { name: "error" });
    const buttonElement = screen.getByRole("button", { name: "login" });
    const emailInputElement = screen.getByLabelText("email");
    const passwordInputElement = screen.getByLabelText("password");

    await user.type(emailInputElement, "hi@test.co");
    act(() => {
      emailInputElement.blur();
    });

    const emailErrorTextElement = screen.queryByText(EMAIL_ERROR_TEXT);
    expect(emailErrorTextElement).not.toBeInTheDocument();
    expect(emailInputElement).toBeValid();

    await user.type(passwordInputElement, "12");
    act(() => {
      passwordInputElement.blur();
    });

    const passwordErrorTextElement = screen.queryByText(PASSWORD_ERROR_TEXT);
    expect(passwordErrorTextElement).not.toBeInTheDocument();
    expect(passwordInputElement).toBeValid();

    expect(buttonElement).toBeDisabled();
    expect(errorAlertElement).not.toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/loading/i);
  });

  it("should show an error alert when there is a login error", () => {
    const error = "fake error";

    const localProps = { ...props, error };
    render(<LoginForm {...localProps} />);

    screen.getByRole("alert");
    screen.getByText(error);
  });

  it("should call the onSubmit callback function when the submit button is Clicked", async () => {
    const { onSubmit } = props;
    const user = userEvent.setup();
    const email = "fake@email.co";
    const password = "fakePassword";

    render(<LoginForm {...props} />);

    const buttonElement = screen.getByRole("button", { name: "login" });
    const emailInputElement = screen.getByLabelText("email");
    const passwordInputElement = screen.getByLabelText("password");

    await user.type(emailInputElement, email);
    act(() => {
      emailInputElement.blur();
    });

    const emailErrorTextElement = screen.queryByText(EMAIL_ERROR_TEXT);
    expect(emailErrorTextElement).not.toBeInTheDocument();
    expect(emailInputElement).toBeValid();

    await user.type(passwordInputElement, password);
    act(() => {
      passwordInputElement.blur();
    });

    await user.click(buttonElement);

    expect(onSubmit).toHaveBeenCalledWith({ email, password });
  });
});
