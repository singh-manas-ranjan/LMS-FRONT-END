import { Box, Text } from "@chakra-ui/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface Props {
  message?: string;
}

export const FormError = ({ message }: Props) => {
  if (!message) return null;
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      columnGap={2}
      color={"red"}
      fontSize={"sm"}
      bg={"red.100"}
      p={1}
      borderRadius={"sm"}
    >
      <ExclamationTriangleIcon style={{ width: "1rem", height: "1rem" }} />
      <Text>{message}</Text>
    </Box>
  );
};
