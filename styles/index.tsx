import { createGlobalStyle } from 'styled-components';

export const NoScroll = createGlobalStyle`
  html,body {
    overflow: hidden;
    height: 100vh !important;
    min-height: 0 !important;
  }
`;

export const GlobalStyles = createGlobalStyle`
  html, body {
    overscroll-behavior-y: none;
  }

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
    min-height: 100vh;

    line-height: 1.375;
    font-family: 'Overpass', sans-serif;
    font-family: 'Nunito', 'Overpass', sans-serif;
    font-weight: 200;
  }

  html {
    background: var(--red);
    background-image: radial-gradient(
      farthest-corner circle at 20% 0%,
      #bf1313 0%,
      75%,
      #370000 110%
    );
    background-image: radial-gradient(
      farthest-corner circle at 20% 0% in oklab,
      oklch(51.18% 0.201 28.28) 0%,
      75%,
      oklch(0% 0.5 28.28) 110%
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
  }

  h1 {
    font-size: 12.5rem;
    font-family: 'Overpass', sans-serif;
    font-weight: 700;
  }

  h2 {
    font-size: 2rem;
    font-weight: 400;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  p {
    margin: 0 auto 1rem;
    font-size: 1.5rem;
    font-weight: 200;
    color: var(--light);
  }
`;
