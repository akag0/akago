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

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      alert("ログインできました");
      router.push("/users/profile");
    } catch (e) {}
    if (e instanceof FirebaseError) {
      console.log(e);
      alert("ログインできませんでした");
    }
  };

  return (
    <Box>
      <Center>
        <chakra.form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Box>
              <Text>メールアドレス</Text>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Box>
            <Box>
              <Text>パスワード</Text>
              <Input
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Center>
              <Button type="submit">ログイン</Button>
            </Center>
          </Stack>
        </chakra.form>
      </Center>
    </Box>
  );
};

export default Login;
