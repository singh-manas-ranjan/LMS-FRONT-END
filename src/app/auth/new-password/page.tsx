import { NewPasswordForm } from "@/app/ui/auth/new-password-form";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Suspense } from "react";

const navStyle = {
  w: "100%",
  paddingInline: "2rem",
  justifyContent: "space-between",
  alignItems: "center",
};
const NewPasswordPage = () => {
  return (
    <Box>
      <Flex as="nav" sx={navStyle} boxShadow={"0 2px 2px -2px gray"}>
        <Link href={"/"}>
          <Text
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            fontWeight={"bold"}
            padding={"1rem"}
            color={"#044F63"}
            position={"absolute"}
            pl={"2rem"}
            top={"0"}
            left={"0"}
            right={"0"}
            boxShadow={"0 2px 2px -2px gray"}
          >
            Learnopia
          </Text>
        </Link>
      </Flex>
      <Box
        bgImage={"/bgImg.jpg"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPosition={"center"}
        w={"100dvw"}
        h={"100dvh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Suspense>
          <NewPasswordForm />
        </Suspense>
      </Box>
    </Box>
  );
};

export default NewPasswordPage;
