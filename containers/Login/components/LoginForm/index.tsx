import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { LoginFormPropsI } from "../../interfaces";

export default (props: LoginFormPropsI) => {
  const { isLoading, hasEmailError, hasError, onSubmit } = props;

  return (
    <Flex
      direction="column"
      alignItems={"center"}
      textAlign="center"
      paddingTop="200px"
    >
      <FormControl width={300}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" mb={"20px"} />
        <FormLabel>Password</FormLabel>
        <Input type="password" mb={"40px"} />
        <Button
          role="button"
          colorScheme="blue"
          aria-label="login"
          disabled={false}
        >
          Login
        </Button>
      </FormControl>
    </Flex>
  );
};
