import { Box, Text } from "@chakra-ui/react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface Props {
  message?: string;
}

export const FormSuccess = ({ message }: Props) => {
  if (!message) return null;
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      columnGap={2}
      color={"green"}
      fontSize={"sm"}
      bg={"green.100"}
      p={1}
      borderRadius={"sm"}
    >
      <CheckCircledIcon style={{ width: "1rem", height: "1rem" }} />
      <Text>{message}</Text>
    </Box>
  );
};
