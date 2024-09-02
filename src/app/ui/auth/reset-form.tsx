"use client";
import {
  Box,
  Button,
  FormControl,
  Text,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ResetSchema } from "../../../schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { reset } from "@/actions/auth/reset";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const toast = useToast();

  function showToast(message: string, status: "success" | "error") {
    toast({
      title: message,
      status,
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  }

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    console.log(values);
    startTransition(() => {
      reset(values).then((data) => {
        if (data?.error) {
          showToast(data.error, "error");
        }
        if (data?.success) {
          showToast(data.success, "success");
        }
      });
    });
  };

  const errorMsg = {
    color: "red",
    fontSize: { base: "xs", lg: "sm" },
  };

  return (
    <Box
      w={"300px"}
      p={5}
      border={"1px"}
      borderColor={"gray.200"}
      marginInline={"auto"}
      marginTop={"100px"}
      rounded={"md"}
      shadow={"md"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email" fontSize={{ base: "sm", lg: "md" }}>
            Email
          </FormLabel>
          <Input
            id="email"
            type="text"
            placeholder="Email"
            {...form.register("email")}
            size={{ base: "sm", lg: "md" }}
          />
          {errors.email && <Text sx={errorMsg}>{errors.email.message}</Text>}
        </FormControl>
        <FormControl mt={5}>
          <FormLabel htmlFor="password" fontSize={{ base: "sm", lg: "md" }}>
            Password
          </FormLabel>
          <Select
            {...form.register("accountType")}
            size={"sm"}
            placeholder="Account Type"
          >
            <option value="students">Student</option>
            <option value="instructors">Instructor</option>
            <option value="admin">Admin</option>
          </Select>
          {errors.accountType && (
            <Text sx={errorMsg}>{errors.accountType.message}</Text>
          )}
        </FormControl>
        <Box w={"100%"} display={"flex"} justifyContent={"flex-end"}>
          <Button
            type="submit"
            isLoading={isPending}
            loadingText="Submitting"
            disabled={isPending}
            size={{ base: "sm", lg: "md" }}
            mt={5}
            colorScheme="blue"
            rounded={"4"}
            justifySelf={"right"}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};
