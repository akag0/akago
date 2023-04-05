import { Box, chakra } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../feature/auth/provider/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";

import Confirm from "../../../../../components/molecules/users/Confirm";

interface Props {
  profile: any;
}

const DonnieProfileConfirm: NextPage<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const { user } = useAuthContext();
  const Router = useRouter();
  const imageUrl = Router.query.imageUrl as string;

  useEffect(() => {
    try {
      if (user) {
        const uid = user.uid;
        const getUser = async () => {
          const userRef = doc(db, "users", uid);
          const userDoc = await getDoc(userRef);
          const userData: any = userDoc.data();
          setProfile(userData);
        };
        getUser();
      }
    } catch (e) {
      console.log("エラーです");
    }
  }, [user]);

  return (
    <Box>
      <Confirm imageUrl={imageUrl} profile={profile} isLoading={isLoading} />
    </Box>
  );
};

export default DonnieProfileConfirm;
