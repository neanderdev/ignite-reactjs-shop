import { AppProps } from "next/app";

import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";

import logoImg from "../assets/logo.svg";

export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <Container>
      <Header>
        <img src={logoImg.src} alt="Logo Ignite Shop" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
