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
import { auth } from "../../firebase";

const DonnieCompletionRegistration: NextPage = () => {
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
          <Text>ドニーの登録が完了しました</Text>
          <RadioGroup>
            <Stack>
              <Text>✔︎</Text>
              <Text>新規登録が完了しました</Text>
            </Stack>
          </RadioGroup>
          <Center>
            <Link href={"/users/donnie/profile/create"}>
              <Button onClick={onClickToast}>次へ</Button>
            </Link>
          </Center>
        </chakra.form>
      </Center>
    </Box>
  );
};

export default DonnieCompletionRegistration;
