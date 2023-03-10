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
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../../firebase";

const DonorCompletionRegistration: NextPage = () => {
  return (
    <Box>
      <Center>
        <chakra.form>
          <Text>あなたはどちらですか？</Text>
          <RadioGroup>
            <Stack>
              <Text>✔︎</Text>
              <Text>新規登録が完了しました</Text>
            </Stack>
          </RadioGroup>
          <Center>
            <Button type="submit">次へ</Button>
          </Center>
        </chakra.form>
      </Center>
    </Box>
  );
};

export default DonorCompletionRegistration;
