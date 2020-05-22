import { GlobalStyles } from '$styles';
import { Keybase, MediumM, SnapchatGhost, StackOverflow, Dribbble } from '@styled-icons/fa-brands';
import { Facebook, Github, Instagram, Linkedin, Twitter, Codepen } from '@styled-icons/feather';
import Head from 'next/head';
import styled from 'styled-components';

const Main = styled.main`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0 auto;
  line-height: 1;

  font-size: 12.5rem;
  color: var(--light);
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Link = styled.a.attrs({ target: '_blank' })`
  display: block;
  margin: 0;
  padding: 1rem;

  text-decoration: none;
  color: var(--light);

  transition: color 500ms;

  > svg {
    display: block;
    width: 2rem;
    height: 2rem;

    @media (max-width: 400px) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &:hover {
    color: var(--blue);
  }
`;

const Break = styled.span`
  flex-basis: 100%;
  height: 0;

  @media screen and (max-width: 320px) {
    display: none;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>@benediktvaldez</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Main>
        <Title>hi.</Title>

        <Nav>
          <Link href="https://github.com/benediktvaldez">
            <Github />
          </Link>
          <Link href="https://codepen.com/benediktvaldez">
            <Codepen />
          </Link>
          <Link href="https://twitter.com/benediktvaldez">
            <Twitter />
          </Link>
          <Link href="https://m.me/benediktvaldez">
            <Facebook />
          </Link>
          <Link href="https://instagram.com/benediktvaldez">
            <Instagram />
          </Link>
          <Link href="https://linkedin.com/in/benediktvaldez">
            <Linkedin />
          </Link>
          <Break />
          <Link href="https://keybase.io/benediktvaldez">
            <Keybase />
          </Link>
          <Link href="https://snapchat.com/add/benediktvaldez">
            <SnapchatGhost />
          </Link>
          <Link href="https://medium.com/@benediktvaldez">
            <MediumM />
          </Link>
          <Link href="https://stackoverflow.com/users/1000085/benedikt-d-valdez?tab=profile">
            <StackOverflow />
          </Link>
          <Link href="https://dribbble.com/benediktvaldez">
            <Dribbble />
          </Link>
        </Nav>
      </Main>
    </>
  );
}
