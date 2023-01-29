import LoginForm from "./components/LoginForm";
import useLogin from "./useLogin";

export default () => {
  const { isLoading, error, onResetError } = useLogin();

  return (
    <LoginForm
      isLoading={isLoading}
      error={error}
      onSubmit={() => null}
      onResetError={onResetError}
    />
  );
};
