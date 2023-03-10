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
import axios from "axios";

const CreateGender: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectUserType, setSelectUserType] = useState("donor");
  const { user } = useAuthContext();
  const toast = useToast();
  const Router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const data = {
          gender_type: selectUserType,
          timestamp: serverTimestamp(),
        };

        axios.post("/api/createProfile", {
          user,
        });
        setDoc(userRef, data);
      }
      toast({
        title: "プロフィールの作成が完了しました！",
        status: "success",
        position: "top",
      });
      Router.push("/users/profile");
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

  const genderType = ["ドナー（男性）", "ドニー（女性）"];

  return (
    <Box>
      <Center>
        <chakra.form onSubmit={handleSubmit}>
          <Text>あなたはどちらですか？</Text>
          {/* {genderType.map((type) => {
            return (
              <div key={type}>
                <Radio
                  type={"radio"}
                  value={selectUserType}
                  id={type}
                  checked={type === selectUserType}
                  onChange={(e) => {
                    setSelectUserType(e.target.value);
                  }}
                >
                  {type}
                </Radio>
              </div>
            );
          })} */}
          <RadioGroup onChange={setSelectUserType} value={selectUserType}>
            <Stack>
              <Radio value="donor">ドニー</Radio>
              <Radio value="donnie">ドナー</Radio>
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

export default CreateGender;
