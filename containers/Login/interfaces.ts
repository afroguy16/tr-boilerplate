export interface LoginFormAttributesI {
  email: string;
  password: string;
}

export interface LoginFormPropsI {
  isLoading: boolean;
  hasEmailError: boolean;
  hasError: boolean;
  onSubmit: (payload: LoginFormAttributesI) => void;
}
