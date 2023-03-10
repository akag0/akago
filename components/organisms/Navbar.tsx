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

const Navbar: React.FC = () => {
  const { user } = useAuthContext();
  const toast = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "ログアウトしました",
        status: "error",
        position: "top",
      });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };

  return (
    <Flex
      bg={"orange.100"}
      h={16}
      justify={"space-between"}
      alignItems={"center"}
      px={{ base: "1rem", sm: "4rem" }}
    >
      <Link href={"/"}>
        <Text>akago</Text>
      </Link>
      <Menu>
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
      </Menu>
    </Flex>
  );
};

export default Navbar;
