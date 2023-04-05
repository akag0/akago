import { useEffect, useState } from "react";
import { Box, Image, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import { storage } from "../../firebase";
import { db } from "../../firebase";
import { getDownloadURL, list, listAll, ref } from "firebase/storage";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";

type ImageData = {
  url: string;
  userName: string;
};

const UserList = () => {
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);
  const { user } = useAuthContext();
  const [userGenderType, setUserGenderType] = useState("");

  useEffect(() => {
    if (user) {
      getUserData();
    }
  });

  const getUserData = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists() && docSnapshot.data()) {
        setUserGenderType(docSnapshot.data().gender_type);
      } else {
        console.error("User document not found or access denied.");
      }
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storageRef = ref(storage);
        const folders = await list(storageRef);

        for (const folder of folders.prefixes) {
          const usersQuery = query(
            collection(db, "users"),
            where("email", "==", folder.name),
            where(
              "gender_type",
              "==",
              userGenderType === "donnie" ? "donor" : "donnie"
            )
          );
          const userSnap = await getDocs(usersQuery);
          let userName = "";

          userSnap.forEach((doc) => {
            userName = doc.data().user_name || "";
          });

          if (userName) {
            const res = await listAll(folder);

            const urls = await Promise.all(
              res.items.map((itemRef) => getDownloadURL(itemRef))
            );

            const imageData = urls.map((url) => ({ url, userName }));
            setImageDataList((prevData) => [...prevData, ...imageData]);
          }
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (userGenderType) {
      fetchImages();
    }
  }, [userGenderType]);

  return (
    <Box>
      <SimpleGrid columns={[2, 3, 4]} spacing={10}>
        {imageDataList.map((imageData, index) => (
          <VStack key={index}>
            <Image
              style={{ borderRadius: "50%", width: "140px", height: "140px" }}
              src={imageData.url}
              alt={`User image ${index}`}
            />
            <Text>{imageData.userName}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default UserList;
