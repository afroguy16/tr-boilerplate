import { LoginFormPropsI } from "./interfaces";

export default (): Omit<LoginFormPropsI, 'onSubmit'> => {
  const onResetError = () => console.log('onReset error called!')

  return {
    isLoading: false,
    error: '',
    onResetError
  }
}
