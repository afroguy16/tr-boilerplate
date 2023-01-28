import LoginForm from "./components/LoginForm";
import useLogin from "./useLogin";

export default () => {
  const { isLoading, error } = useLogin();

  return (
    <LoginForm isLoading={isLoading} error={error} onSubmit={() => null} />
  );
};
