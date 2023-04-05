import { Center } from "@chakra-ui/react";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { storage } from "../../../firebase";

type ImagePreviewProps = {
  imageUrl: string;
};

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const storageRef = ref(storage, imageUrl);
    getDownloadURL(storageRef).then((url) => setImageSrc(url));
  }, [imageUrl]);

  return (
    <>
      {imageSrc && (
        <Center mt={4}>
          <Image
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
            src={imageSrc}
            alt="preview-image"
            width={50}
            height={50}
          />
        </Center>
      )}
    </>
  );
};
