import {
  Box,
  Center,
  Text,
  chakra,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../../firebase";

const CreatePage: NextPage = () => {
  return (
    <Box>
      <Center>
        <chakra.form>
          <Stack spacing={4}>
            <Box>
              <Text>メールアドレス</Text>
              {/* <Input value={} onChange={(e) => setEmail(e.target.value)} /> */}
            </Box>
            <Box>
              <Text>パスワード</Text>
              {/* <Input
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
            </Box>
            <Center>
              <Button>戻る</Button>
              <Button type="submit">次へ</Button>
            </Center>
          </Stack>
        </chakra.form>
      </Center>
    </Box>
  );
};

export default CreatePage;
