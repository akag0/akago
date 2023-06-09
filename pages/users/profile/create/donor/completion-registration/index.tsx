import {
  Box,
  Center,
  Text,
  chakra,
  Stack,
  Input,
  Button,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const DonorCompletionRegistration: NextPage = () => {
  const toast = useToast();

  const onClickToast = () => {
    toast({
      title: "プロフィールを作成してください",
      status: "success",
      position: "top",
    });
  };

  return (
    <Box>
      <Center>
        <chakra.form>
          <Text>ドナーの登録が完了しました</Text>
          <RadioGroup>
            <Stack>
              <Text>✔︎</Text>
              <Text>新規登録が完了しました</Text>
            </Stack>
          </RadioGroup>
          <Link href={"/users/donor/profile/create"}>
            <Button onClick={onClickToast}>次へ</Button>
          </Link>
        </chakra.form>
      </Center>
    </Box>
  );
};

export default DonorCompletionRegistration;
