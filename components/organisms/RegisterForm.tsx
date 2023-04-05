import {
  Box,
  Button,
  Center,
  Input,
  Stack,
  Text,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/router";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "タイプを選択してください。",
        status: "success",
        position: "top",
      });
      setEmail("");
      setPassword("");
      router.push("/users/profile/create/gender");
    } catch (e) {
      alert("登録できていません");
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
              <Button type="submit">新規登録</Button>
            </Center>
          </Stack>
        </chakra.form>
      </Center>
    </Box>
  );
};

export default RegisterForm;
