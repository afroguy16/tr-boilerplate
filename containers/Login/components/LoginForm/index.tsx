import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

import { LoginFormPropsI } from "../../interfaces";
import {
  EMAIL_ERROR_TEXT,
  EMAIL_TYPE_REGEX,
  MINIMUM_PASSWORD_LENGTH,
  PASSWORD_ERROR_TEXT,
} from "./constants";

export default (props: LoginFormPropsI) => {
  const { isLoading, error, onSubmit } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorListener, setEmailErrorListener] = useState(false);
  const [passwordErrorListener, setPasswordErrorListener] = useState(false);

  const isEmailTypeValid = EMAIL_TYPE_REGEX.test(email);
  const isPasswordLengthValid = password.length >= MINIMUM_PASSWORD_LENGTH;
  const hasEmailError = emailErrorListener && !isEmailTypeValid;
  const hasPasswordError =
    password.length < MINIMUM_PASSWORD_LENGTH && passwordErrorListener;
  const hasValidFormData =
    Boolean(email) && isEmailTypeValid && isPasswordLengthValid;
  const isEnabled = hasValidFormData && !isLoading;

  return (
    <Flex
      direction="column"
      alignItems={"center"}
      textAlign="center"
      paddingTop="200px"
    >
      {error && (
        <Alert
          status="error"
          width={300}
          mb="40px"
          borderRadius={4}
          aria-label="error"
        >
          <AlertIcon />
          {error}
        </Alert>
      )}

      <form style={{ width: "300px" }}>
        <FormControl mb={"20px"} isInvalid={hasEmailError}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            aria-label="email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailErrorListener(true)}
          />
          {hasEmailError && (
            <FormErrorMessage as="p" aria-label="email-error">
              {EMAIL_ERROR_TEXT}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl mb={"40px"} isInvalid={hasPasswordError}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            aria-label="password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordErrorListener(true)}
          />
          {hasPasswordError && (
            <FormErrorMessage as="p" aria-label="email-error">
              {PASSWORD_ERROR_TEXT}
            </FormErrorMessage>
          )}
        </FormControl>

        <Button
          role="button"
          colorScheme="blue"
          aria-label="login"
          disabled={!isEnabled}
          onClick={() => onSubmit({ email, password })}
        >
          {isLoading ? "loading" : "login"}
        </Button>
      </form>
    </Flex>
  );
};
