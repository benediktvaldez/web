import { createGlobalStyle } from 'styled-components';

export const NoScroll = createGlobalStyle`
  body {
    height: 100vh !important;
    min-height: 0 !important;
  }
`;

export const GlobalStyles = createGlobalStyle`
  body {
    --red: #bf1313;
    --blue: #00a1e4;
    --dark: #272727;
    --gray: #696773;
    --light: #eff1f3;

    margin: 0;
    padding: 0;
    width: 100vw;
    height: auto;
    min-height: 100vw;

    font-family: 'Overpass', sans-serif;
    font-family: 'Poppins', 'Overpass', sans-serif;
    font-weight: 200;

    background: var(--red);
    background-image: radial-gradient(
      farthest-corner circle at 50% 50%,
      #bf1313 0%,
      75%,
      #370000 100%
    );
    background-image: radial-gradient(
      farthest-corner circle at 50% 50% in oklab,
      oklch(51.18% 0.201 28.28) 0%,
      75%,
      oklch(0% 0.5 28.28) 100%
    );
  }

  #__next {
    width: 100%;
    height: 100%;
  }

  /* Default box-sizing to border-box, except for images and hr */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  hr,
  img {
    box-sizing: content-box;
  }

  black-lives {
    font-family: Overpass, sans-serif;
  }

  h1,
  h2,
  h3 {
    margin: 0 auto;
    line-height: 1;

    color: var(--light);
    font-family: 'Overpass', sans-serif;
  }

  h1 {
    font-size: 12.5rem;
  }

  h2 {
    font-size: 4rem;

    padding: 2rem 2rem 0;
    text-align: center;
  }

  h3 {
    font-size: 3rem;

    padding: 2rem 2rem 0;
    text-align: center;
  }

  p {
    margin: 0 auto 1rem;
    color: var(--light);
    text-align: center;
  }
`;
