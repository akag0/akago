import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import UserList from "../components/organisms/UserList";
import { useAuthContext } from "../feature/auth/provider/AuthProvider";

const Home: NextPage = () => {
  const { user } = useAuthContext();

  return <Box>{user && <UserList />}</Box>;
};

export default Home;
