import {
  Box,
  Center,
  Text,
  chakra,
  Button,
  Radio,
  useToast,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthContext } from "../../../../../feature/auth/provider/AuthProvider";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";
// import axios from "axios";
import Link from "next/link";

const CreateGender: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectUserType, setSelectUserType] = useState("donor");
  const { user } = useAuthContext();
  const toast = useToast();
  const Router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        const userDoc = doc(db, "users", uid);
        const data = {
          gender_type: selectUserType,
          email: email,
          timestamp: serverTimestamp(),
        };

        // axios.post("/api/createProfile", {
        //   user,
        // });
        await setDoc(userDoc, data);
      }
      toast({
        title: "ユーザー登録が完了しました。",
        status: "success",
        position: "top",
      });

      if (selectUserType === "donor") {
        Router.push("/users/profile/create/donor/completion-registration");
      } else {
        Router.push("/users/profile/create/donnie/completion-registration");
      }
    } catch (e) {
      toast({
        title: "必要項目を入力してください。",
        status: "error",
        position: "top",
      });
    }
    if (e instanceof FirebaseError) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <Center>
        <chakra.form onSubmit={handleSubmit}>
          <Text>あなたはどちらですか？</Text>
          <RadioGroup onChange={setSelectUserType} value={selectUserType}>
            <Stack>
              <Radio value="donnie">ドニー</Radio>
              <Radio value="donor">ドナー</Radio>
            </Stack>
          </RadioGroup>
          <Center>
            <Button isLoading={isLoading} type="submit">
              次へ
            </Button>
          </Center>
        </chakra.form>
      </Center>
    </Box>
  );
};

export default CreateGender;
