"use client";
import {
  Box,
  Button,
  FormControl,
  Text,
  Input,
  Select,
  useToast,
  Heading,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ResetSchema } from "../../../schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { reset } from "@/actions/auth/reset";
import Link from "next/link";
import { Mail } from "lucide-react";

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
    reset: resetForm,
  } = form;

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    console.log(values);
    startTransition(() => {
      reset(values)
        .then((data) => {
          if (data?.error) {
            showToast(data.error, "error");
          }
          if (data?.success) {
            showToast(data.success, "success");
          }
        })
        .finally(() => {
          resetForm();
        });
    });
  };

  const errorMsg = {
    color: "red",
    fontSize: { base: "xs", lg: "sm" },
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
        Forgot Password ?
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <InputGroup size={{ base: "sm", lg: "md" }}>
            <InputLeftElement>
              <Mail size={15} color="grey" />
            </InputLeftElement>
            <Input
              id="email"
              type="text"
              placeholder="Registered Email"
              {...form.register("email")}
              size={{ base: "sm", lg: "md" }}
              fontSize={{ base: ".8rem", lg: "md" }}
              bg={"white"}
              rounded={"4"}
            />
          </InputGroup>
          {errors.email && <Text sx={errorMsg}>{errors.email.message}</Text>}
        </FormControl>
        <FormControl mt={5}>
          <Select
            {...form.register("accountType")}
            size={{ base: "sm", lg: "md" }}
            placeholder="Account Type"
            bg={"white"}
            fontSize={{ base: ".8rem", lg: "md" }}
            rounded={"4"}
          >
            <option value="students">Student</option>
            <option value="instructors">Instructor</option>
          </Select>
          {errors.accountType && (
            <Text sx={errorMsg}>{errors.accountType.message}</Text>
          )}
        </FormControl>

        <Box w={"100%"} display={"flex"} justifyContent={"center"}>
          <Button
            type="submit"
            isLoading={isPending}
            loadingText="Submitting"
            disabled={isPending}
            size={{ base: "sm", lg: "md" }}
            w={"100%"}
            mt={5}
            colorScheme="blue"
            rounded={"4"}
            justifySelf={"right"}
          >
            <Text fontSize={{ base: ".8rem", lg: "md" }}>Submit</Text>
          </Button>
        </Box>
        <Box mt={3} display={"flex"} justifyContent={"center"} w={"100%"}>
          <Link href={"/"} style={{ color: "#0275d8", fontSize: ".8rem" }}>
            Back to Login
          </Link>
        </Box>
      </form>
    </Box>
  );
};
