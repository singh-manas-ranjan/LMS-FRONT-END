"use client";
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Lock, Eye, EyeOff, User, UserIcon } from "lucide-react";
import Link from "next/link";
interface FormType {
  username: string;
  password: string;
}

const errorMsg = {
  color: "red",
  fontSize: { base: "xs", lg: "sm" },
};

const inputField = {
  bg: "#fff",
  fontSize: { base: "sm" },
};

type TAuth = {
  role: "admin" | "instructors" | "students";
  successPath: string;
};

type Props = {
  access: TAuth;
  onClose: () => void;
};

const SignInForm = ({ access: { role, successPath }, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>();

  const [show, setShow] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const showSuccessToast = async () => {
    setTimeout(() => {
      toast({
        title: "Login Successful",
        description: "Welcome back to your dashboard.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }, 500);
  };

  const showFailedToast = async (desc: string) => {
    setTimeout(() => {
      toast({
        title: "Login Failed",
        description: desc,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }, 500);
  };

  const onSubmit = async (e: FormType) => {
    const body = { ...e };
    reset();
    try {
      const response = await axios.post(
        `http://localhost:3131/api/v1/${role}/login`,
        body,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        onClose();
        localStorage.setItem("userInfo", JSON.stringify(response.data.body));
        router.push(successPath);
        showSuccessToast();
      }
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        switch (axiosError.response?.status) {
          case 401:
            showFailedToast("Invalid credentials");
            break;
          case 404:
            showFailedToast("Invalid credentials");
            break;
          default:
            showFailedToast("Something went wrong");
        }
      } else {
        showFailedToast("Unable to Sign In, please try again ");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputGroup size={{ base: "sm", lg: "md" }}>
          <InputLeftElement>
            <UserIcon color="grey" size={15} />
          </InputLeftElement>
          <Input
            {...register("username", {
              required: { value: true, message: "username is required." },
            })}
            type="text"
            sx={inputField}
            size={{ base: "sm", lg: "md" }}
            placeholder="Username"
            rounded={"4"}
          />
        </InputGroup>
        <Text sx={errorMsg}>{errors.username?.message}</Text>
      </FormControl>
      <FormControl mt={5}>
        <InputGroup size={{ base: "sm", lg: "md" }}>
          <InputLeftElement>
            <Lock size={15} color="grey" />
          </InputLeftElement>
          <Input
            {...register("password", {
              required: { value: true, message: "password is required" },
            })}
            type={show ? "text" : "password"}
            sx={inputField}
            size={{ base: "sm", lg: "md" }}
            placeholder="Password"
            rounded={"4"}
          />
          <InputRightElement height={"100%"} width={"fit-content"} pr={1}>
            <Button
              size="xs"
              onClick={() => setShow((prev) => !prev)}
              p={0}
              bg={"none"}
              _hover={{ bg: "none" }}
            >
              {show ? <EyeOff size={15} /> : <Eye size={15} color="grey" />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text sx={errorMsg}>{errors.password?.message}</Text>
      </FormControl>
      <FormControl mt={3} fontSize={{ base: "sm", lg: "md" }}>
        <Text>
          Forgot Password ?
          <Link
            href={"/auth/reset"}
            style={{ color: "#0275d8", marginLeft: "5px" }}
          >
            click here.
          </Link>
        </Text>
      </FormControl>
      <FormControl>
        <Stack direction={"column"} spacing={3}>
          <Button
            type="submit"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
            colorScheme="blue"
            size={{ base: "sm", lg: "md" }}
            rounded={"4"}
          >
            Sign in
          </Button>
          <Button
            type="reset"
            onSubmit={() => reset}
            colorScheme="teal"
            size={{ base: "sm", lg: "md" }}
            rounded={"4"}
          >
            Reset
          </Button>
        </Stack>
      </FormControl>
    </form>
  );
};

export default SignInForm;
