import LoginForm from "./components/LoginForm";
import useLogin from "./useLogin";

export default () => {
  const { isLoading, error, onResetError, onLogin } = useLogin();

  return (
    <LoginForm
      isLoading={isLoading}
      error={error}
      onLogin={onLogin}
      onResetError={onResetError}
    />
  );
};
