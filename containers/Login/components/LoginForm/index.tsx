import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default () => {
  return (
    <Flex
      direction="column"
      alignItems={"center"}
      textAlign="center"
      paddingTop="200px"
    >
      <form style={{ width: "300px" }}>
        <FormControl mb="40px">
          <FormLabel>Email address</FormLabel>
          <Input type="email" mb={"20px"} />
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="blue">Login</Button>
      </form>
    </Flex>
  );
};
