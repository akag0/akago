import {
  Box,
  Button,
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
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/router";
import Logo from "../../public/images/logo.png";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { user } = useAuthContext();
  const toast = useToast();
  const Router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "ログアウトしました",
        status: "error",
        position: "top",
      });
      Router.push("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };

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
      >
        <Link href={"/"}>
          <Image alt={"logo"} src={Logo} width={106} />
        </Link>
        <Box>
          {user ? (
            <Text onClick={handleSignOut}>ログアウト</Text>
          ) : (
            <Link href={"/login"}>
              <Text>ログイン</Text>
            </Link>
          )}
        </Box>
        {/* <Menu>
        <MenuButton
          as={IconButton}
          colorScheme={"orange"}
          icon={<RxHamburgerMenu />}
        />
        <MenuList>
          <MenuItem>
            <Box>
              {user ? (
                <Text onClick={handleSignOut}>ログアウト</Text>
              ) : (
                <Link href={"/login"}>
                  <Text>ログイン</Text>
                </Link>
              )}
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              {user ? (
                <Link href={"/"}>
                  <Text>{user.email}</Text>
                </Link>
              ) : (
                <Link href={"/register"}>
                  <Text>新規登録</Text>
                </Link>
              )}
            </Box>
          </MenuItem>
        </MenuList>
      </Menu> */}
      </Flex>
    </Box>
  );
};

export default Navbar;
