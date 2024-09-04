"use client";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Text,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { newPassword } from "@/actions/auth/new-password";
import { LockKeyholeIcon } from "lucide-react";

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const accountType = searchParams.get("acc-type");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword(values, token, accountType)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        })
        .finally(() => {
          reset();
        });
    });
  };

  return (
    <Box
      w={{ base: "300px", sm: "350px" }}
      p={5}
      border={"1px"}
      borderColor={"gray.200"}
      marginInline={"auto"}
      marginTop={"-200px"}
      rounded={"md"}
      shadow={"md"}
      bg="rgba(225, 225, 225, 0.8)"
    >
      <Text
        fontSize={{ base: "md", sm: "x-large" }}
        textAlign={"center"}
        mb={5}
      >
        Reset Password
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.password}>
            <InputGroup size={{ base: "sm", lg: "md" }}>
              <InputLeftElement>
                <LockKeyholeIcon size={15} color="grey" />
              </InputLeftElement>
              <Input
                id="new-password"
                type="password"
                placeholder="New Password"
                {...register("password")}
                size={{ base: "sm", lg: "md" }}
                fontSize={{ base: ".8rem", lg: "md" }}
                bg={"white"}
                rounded={"4"}
              />
            </InputGroup>
            <FormErrorMessage fontSize={".8rem"}>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <InputGroup size={{ base: "sm", lg: "md" }}>
              <InputLeftElement>
                <LockKeyholeIcon size={15} color="grey" />
              </InputLeftElement>
              <Input
                id="confirm-password"
                type="password"
                fontSize={{ base: ".8rem", lg: "md" }}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                size={{ base: "sm", lg: "md" }}
                bg={"white"}
                rounded={"4"}
              />
            </InputGroup>
            <FormErrorMessage fontSize={".8rem"}>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>

          <FormSuccess message={success} />
          <FormError message={error} />

          <Box w={"100%"} display={"flex"} justifyContent={"center"}>
            <Button
              type="submit"
              isLoading={isPending}
              loadingText="Submitting"
              disabled={isPending}
              size={{ base: "sm", lg: "md" }}
              w={"100%"}
              colorScheme="blue"
              rounded={"4"}
              justifySelf={"right"}
            >
              <Text fontSize={{ base: ".8rem", lg: "md" }}>Reset Password</Text>
            </Button>
          </Box>

          <Box display={"flex"} justifyContent={"center"} w={"100%"}>
            <Link href={"/"} style={{ color: "#0275d8", fontSize: ".8rem" }}>
              Back to Login
            </Link>
          </Box>
        </VStack>
      </form>
    </Box>
  );
};
