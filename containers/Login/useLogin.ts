import { LoginFormPropsI } from "./interfaces";

export default (): Omit<LoginFormPropsI, 'onSubmit'> => ({
  isLoading: false,
  hasError: false,
  hasEmailError: false
})
