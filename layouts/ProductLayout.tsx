import { Box } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Footer from "../components/organisms/Footer";
import Navbar from "../components/organisms/Navbar";
import { useAuthContext } from "../feature/auth/provider/AuthProvider";
import { db } from "../firebase";

interface Props {
  children: React.ReactNode;
}

type Profile = {
  name: string;
  user_name: string;
  age: string;
  country: string;
  address: string;
  available_region: string;
  height: string;
  last_education: string;
  blood_type: string;
  self_pr: string;
};

const ProductLayout: React.FC<Props> = ({ children }) => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<Profile>();

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
    <>
      <Navbar />
      <Box pt={20}>{children}</Box>
      {profile?.name ? <Footer /> : null}
    </>
  );
};

export default ProductLayout;
