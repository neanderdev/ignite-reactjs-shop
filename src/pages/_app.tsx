import { AppProps } from "next/app";
import Image from "next/future/image";

import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";

import logoImg from "../assets/logo.svg";

export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="Logo Ignite Shop" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
