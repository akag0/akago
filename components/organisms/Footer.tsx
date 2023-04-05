import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import { auth } from "../../firebase";
import { GrMailOption } from "react-icons/gr";
import { BiUserCircle } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";
import Logo from "../../public/images/logo.png";
import Image from "next/image";

const Footer: React.FC = () => {
  const user = useAuthContext();
  // const { user } = useAuthContext();
  // const toast = useToast();
  // const Router = useRouter();

  // const handleSignOut = async () => {
  //   try {
  //     await signOut(auth);
  //     toast({
  //       title: "ログアウトしました",
  //       status: "error",
  //       position: "top",
  //     });
  //     Router.push("/");
  //   } catch (e) {
  //     if (e instanceof FirebaseError) {
  //       console.log(e);
  //     }
  //   }
  // };

  return (
    <Box zIndex={100}>
      <Flex
        zIndex={100}
        w={"full"}
        bg={"whiteAlpha.900"}
        h={"48px"}
        justify={"center"}
        alignItems={"center"}
        px={{ base: "1rem", sm: "4rem" }}
        boxShadow={"0px 1px 0px rgba(0, 0, 0, 0.1)"}
        position={"fixed"}
        bottom={"0"}
        gap={"6px"}
      >
        <Box w={"121px"}>
          <Center>
            <FiSearch />
          </Center>
          <Text textAlign={"center"} fontSize={"10px"}>
            さがす
          </Text>
        </Box>
        <Box w={"121px"}>
          <Center>
            <GrMailOption />
          </Center>
          <Text textAlign={"center"} fontSize={"10px"}>
            メッセージ
          </Text>
        </Box>
        <Box w={"121px"}>
          <Center>
            <BiUserCircle />
          </Center>
          <Text textAlign={"center"} fontSize={"10px"}>
            マイページ
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
