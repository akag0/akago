import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ImagePreview } from "./ImagePreview";

interface Props {
  profile: any;
  isLoading: boolean;
  imageUrl: string;
}

const Confirm: React.FC<Props> = (props) => {
  const { profile, isLoading, imageUrl } = props;
  const Router = useRouter();
  const handleClick = () => {
    Router.push("/");
  };
  return (
    <Box>
      <Center>
        <Stack>
          {imageUrl && <ImagePreview imageUrl={imageUrl} />}
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
          <Center>
            <Link href={"/"}>
              <Button isLoading={isLoading} type="submit" onClick={handleClick}>
                プロフィールを確定する
              </Button>
            </Link>
            <Link href={"/users/donor/profile/create"}>
              <Button isLoading={isLoading} type="submit">
                戻る
              </Button>
            </Link>
          </Center>
        </Stack>
      </Center>
    </Box>
  );
};

export default Confirm;
