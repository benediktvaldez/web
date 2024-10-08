import { Main } from '$components/Main/Main';
import { GlobalStyles, NoScroll } from '$styles';
import { Medium } from '@styled-icons/boxicons-logos';
import { Dribbble, Keybase, Snapchat, StackOverflow } from '@styled-icons/fa-brands';
import { Codepen, Facebook, Github, Instagram, Linkedin, Twitter } from '@styled-icons/feather';
import Head from 'next/head';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Link = styled.a.attrs({ target: '_blank' })`
  display: inline-block;
  margin: 0;
  ${Nav} & {
    display: block;
    padding: 1rem;
  }

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

const ShortGreet = styled.p`
  text-align: center;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>@benediktvaldez</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <NoScroll />
      <Main>
        <h1>hi.</h1>
        <ShortGreet>
          I&apos;m Benedikt D. Valdez,
          <br />a full stack digital product developer
        </ShortGreet>
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
            <Snapchat />
          </Link>
          <Link href="https://medium.com/@benediktvaldez">
            <Medium />
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
