import { LoginFormPropsI } from "./interfaces";

export default (): LoginFormPropsI => {
  const onResetError = () => console.log('onReset error called!')
  const onLogin = () => console.log('onLogin called!')

  return {
    isLoading: false,
    error: '',
    onResetError,
    onLogin
  }
}
