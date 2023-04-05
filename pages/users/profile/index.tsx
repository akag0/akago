import { Text, Center, Box, Stack, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../feature/auth/provider/AuthProvider";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

const Profile: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<null | any>(null);
  const { user } = useAuthContext();
  const Router = useRouter();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    try {
      if (user) {
        const userEmail = user.email;
        const uid = user.uid;
        const getUser = async () => {
          const userRef = doc(db, "users", uid);
          const userDoc = await getDoc(userRef);
          const userData: any = userDoc.data();
          setProfile(userData);

          // Get image URL from Firebase Storage
          try {
            const storageRef = ref(storage, `profileImages/userEmail/${uid}`);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);
          } catch (error) {
            console.error("Error getting image URL:", error);
          }
        };
        getUser();
      }
    } catch (e) {
      console.log("エラーです");
    }
  }, [user]);

  return (
    <>
      <Center>
        <Box pt={24}>
          <Stack>
            {imageUrl && (
              <Image src={imageUrl} alt="Profile" width={100} height={100} />
            )}
            {profile ? (
              <>
                <Text>{profile.gender_type}</Text>
                <Text>{profile.name}</Text>
                <Text>{profile.user_name}</Text>
                <Text>{profile.age}</Text>
                <Text>{profile.country}</Text>
                <Text>{profile.address}</Text>
                <Text>{profile.available_region}</Text>
                <Text>{profile.height}</Text>
                <Text>{profile.last_education}</Text>
                <Text>{profile.blood_type}</Text>
                <Text>{profile.self_pr}</Text>
              </>
            ) : (
              <Text>Loading...</Text>
            )}
          </Stack>
        </Box>
      </Center>
    </>
  );
};

export default Profile;
