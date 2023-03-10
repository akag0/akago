import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import ProductLayout from "../layouts/ProductLayout";
import { AuthProvider } from "../feature/auth/provider/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <ProductLayout>
          <Component {...pageProps} />
        </ProductLayout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
