import { useState } from "react";
import { AxiosError } from 'axios';

import axios from "../../axios";
import { LoginFormAttributesI, LoginFormPropsI } from "./interfaces";

export default (): LoginFormPropsI => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')

  const onLogin = async (payload: LoginFormAttributesI) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post('login', payload)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setError((e as any).response?.data[0].message || "")
    }
  }

  return {
    isLoading,
    error,
    onResetError: () => setError(''),
    onLogin
  }
}
