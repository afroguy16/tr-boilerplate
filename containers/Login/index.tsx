import LoginForm from "./components/LoginForm";
import useLogin from "./useLogin";

export default () => {
  const { isLoading, hasEmailError, hasError } = useLogin();

  return (
    <LoginForm
      isLoading={isLoading}
      hasEmailError={hasEmailError}
      hasError={hasError}
      onSubmit={() => null}
    />
  );
};
