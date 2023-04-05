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
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthContext } from "../../../../../feature/auth/provider/AuthProvider";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { ImagePreview } from "../../../../../components/molecules/users/ImagePreview";

const DonnieCreateProfile: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const toast = useToast();
  const Router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    user_name: "",
    age: "",
    country: "",
    address: "",
    available_region: "",
    height: "",
    last_education: "",
    blood_type: "",
    self_pr: "",
  });

  const onFileChange = (e: any) => {
    if (user) {
      const uid = user.uid;
      const file = e.target.files[0];
      const storageRef = ref(storage, `profileImages/userEmail/${uid}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        setImageUrl(snapshot.ref.fullPath);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const data = {
          ...formData,
          timestamp: serverTimestamp(),
        };

        updateDoc(userRef, data);
      }
      toast({
        title: "この内容でよろしいでしょうか？",
        status: "success",
        position: "top",
      });
      Router.push({
        pathname: "/users/donnie/profile/confirm",
        query: { ...formData, imageUrl },
      });
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
          <Stack>
            {imageUrl && <ImagePreview imageUrl={imageUrl} />}
            <Input
              h={12}
              py={2}
              mt={2}
              type={"file"}
              onChange={onFileChange}
              required
            />
            <Input
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder={"名前"}
              required
            />
            {/* <Input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
              placeholder={"名前"}
              required
            /> */}
            <Input
              value={formData.user_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, user_name: e.target.value })
              }
              placeholder={"ニックネーム"}
              required
            />
            {/* <Input
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(e.target.value);
              }}
              placeholder={"ニックネーム"}
              required
            /> */}
            <Input
              value={formData.age}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, age: e.target.value })
              }
              placeholder={"年齢"}
              required
            />
            {/* <Input
              value={age}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAge(e.target.value);
              }}
              placeholder={"年齢"}
              required
            /> */}
            <Input
              value={formData.country}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, country: e.target.value })
              }
              placeholder={"国籍"}
              required
            />
            {/* <Input
              value={country}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCountry(e.target.value);
              }}
              placeholder={"国籍"}
              required
            /> */}
            <Input
              value={formData.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder={"居住地"}
              required
            />
            {/* <Input
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddress(e.target.value);
              }}
              placeholder={"居住地"}
              required
            /> */}
            <Input
              value={formData.available_region}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, available_region: e.target.value })
              }
              placeholder={"提供可能地域"}
              required
            />
            {/* <Input
              value={availableRegion}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAvailableRegion(e.target.value);
              }}
              placeholder={"提供可能地域"}
              required
            /> */}
            <Input
              value={formData.height}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, height: e.target.value })
              }
              placeholder={"身長"}
              required
            />
            {/* <Input
              value={height}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setHeight(e.target.value);
              }}
              placeholder={"身長"}
              required
            /> */}
            <Input
              value={formData.last_education}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, last_education: e.target.value })
              }
              placeholder={"最終学歴"}
              required
            />
            {/* <Input
              value={lastEducation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLastEducation(e.target.value);
              }}
              placeholder={"最終学歴"}
              required
            /> */}
            <Input
              value={formData.blood_type}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, blood_type: e.target.value })
              }
              placeholder={"血液型"}
              required
            />
            {/* <Input
              value={bloodType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBloodType(e.target.value);
              }}
              placeholder={"血液型"}
              required
            /> */}
            <Textarea
              value={formData.self_pr}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, self_pr: e.target.value })
              }
              placeholder={"血液型"}
              required
            />
            {/* <Textarea
              value={selfPr}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setSelfPr(e.target.value);
              }}
              placeholder={"自己紹介（20文字以上）"}
              required
            /> */}
          </Stack>
          <Center>
            <Button isLoading={isLoading} type="submit">
              プロフィール確認する
            </Button>
          </Center>
        </chakra.form>
      </Center>
    </Box>
  );
};

export default DonnieCreateProfile;
