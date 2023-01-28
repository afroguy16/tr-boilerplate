export interface LoginFormAttributesI {
  email: string;
  password: string;
}

export interface LoginFormPropsI {
  isLoading: boolean;
  error: string;
  onSubmit: (payload: LoginFormAttributesI) => void;
}
