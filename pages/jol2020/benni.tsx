import { Main } from '$components/Main/Main';
import { GlobalStyles } from '$styles';
import Head from 'next/head';
import styled from 'styled-components';

const Content = styled.div`
  padding: 0 2rem 0 0;
`;

const Item = styled.article<{ fav?: boolean }>`
  margin: 0 1rem 2rem;
  padding: 2rem;
  display: flex;
  width: 100%;
  max-width: 500px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  background: white;

  ${({ fav }) => (fav ? `outline: 4px solid var(--blue);` : '')}

  a {
    text-decoration: none;

    color: var(--blue);
    &:hover {
      color: var(--red);
    }
  }

  @media (max-width: 432px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  /* ${({ height }) =>
    height
      ? `
        height: ${height};
        width: auto;
        `
      : `
        width: 100%;
        height: auto;
        `} */
`;

const Gifts = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 2rem 0;
  width: 100%;
`;

const Title = styled.h4`
  margin: 0 auto 1rem;
  line-height: 1;
  font-weight: bold;
  font-size: 2rem;
`;

const Description = styled.p`
  margin: 0 0 1rem;
  padding: 0;

  &:before {
    content: 'Nánari lýsing ';
    text-transform: uppercase;
    font-size: 60%;
    font-weight: 900;
    display: block;
  }
`;
const Store = styled.div`
  margin: 0 0 1rem;
  padding: 0;
  &:before {
    content: 'Verslun ';
    text-transform: uppercase;
    font-size: 60%;
    font-weight: 900;
    display: block;
  }
`;
const Price = styled.div`
  margin: 0 0 1rem;
  padding: 0;
  &:before {
    content: 'Verð ';
    text-transform: uppercase;
    font-size: 60%;
    font-weight: 900;
    display: block;
  }
`;

export default function Jol2020() {
  return (
    <>
      <Head>
        <title>Benni Jól 2020 @benediktvaldez</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Main>
        <h2>Benni jól 2020</h2>
        <h3>LEGO</h3>
        <Gifts>
          <Item fav>
            <Content>
              <Title>Boba Fett</Title>
              <Description>Star Wars – LEGO-75277</Description>
              <Price>12.990 kr.</Price>
              <Store>
                Lego búðin
                <br />
                Smáralind
              </Store>
            </Content>
            <Image height="300px" src="/benni/lego-star-wars-boba-fett-helmet-75277.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Iron Man</Title>
              <Description>Marvel – LEGO-76165</Description>
              <Price>13.299 kr.</Price>
              <Store>
                Lego búðin
                <br />
                Smáralind
              </Store>
            </Content>
            <Image height="300px" src="/benni/LEGO_76165_Iron__5ef1c0eb2f4cf.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Trafalgar Square</Title>
              <Description>Architecture – LEGO-21045</Description>
              <Price>14.999 kr.</Price>
              <Store>
                Lego búðin
                <br />
                Smáralind
              </Store>
            </Content>
            <Image width="200px" height="200px" src="/benni/81A3BEo8F3L._AC_SL1500_.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Statue of Liberty</Title>
              <Description>Architecture – LEGO-21042</Description>
              <Price>15.499 kr.</Price>
              <Store>
                Lego búðin
                <br />
                Smáralind
              </Store>
            </Content>
            <Image height="300px" src="/benni/21042-1.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>White House</Title>
              <Description>Architecture – LEGO-21054</Description>
              <Price>18.999 kr.</Price>
              <Store>
                Lego búðin
                <br />
                Smáralind
              </Store>
            </Content>
            <Image
              width="200px"
              height="200px"
              src="/benni/the-white-house-lego-architecture-onebricktwobricks.com-1_350x.jpg"
            />
          </Item>
          <Item>
            <Content>
              <Title>Yoda</Title>
              <Description>Star Wars – LEGO-75255</Description>
              <Price>21.999 kr.</Price>
              <Store>
                Lego búðin
                <br />
                Smáralind
              </Store>
            </Content>
            <Image width="208px" height="156px" src="/benni/75255.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Iron Man</Title>
              <Description>Art – Marvel – LEGO-31199</Description>
              <Price>24.999 kr.</Price>
              <Store>
                Lego búðin
                <br />
                Smáralind
              </Store>
            </Content>
            <Image width="208px" height="200px" src="/benni/31199.jpg" />
          </Item>
          <Item fav>
            <Content>
              <Title>The Sith</Title>
              <Description>Art – Star Wars – LEGO-31200</Description>
              <Price>24.999 kr.</Price>
              <Store>
                Lego búðin
                <br />
                Smáralind
              </Store>
            </Content>
            <Image width="208px" height="200px" src="/benni/31200.jpg" />
          </Item>
        </Gifts>
        <h3>Fatnaður</h3>
        <Gifts>
          <Item>
            <Content>
              <Title>Kvistur</Title>
              <Description>Hanskar, brúnir, Stærð 9</Description>
              <Price>8.600 kr.</Price>
              <Store>Feldur verkstæði / Herrafataverzlun Kormáks & Skjaldar</Store>
            </Content>
            <Image width="200px" height="300px" src="/benni/OI_3255-copy.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Máni</Title>
              <Description>Húfa, hvít</Description>
              <Price>9.200 kr.</Price>
              <Store>
                Feldur verkstæði
                <br />
                Snorrabraut 56
                <br />
                <a target="_blank" href="https://www.feldur.is/collection/mani-hat/">
                  Vefsíða
                </a>
              </Store>
            </Content>
            <Image width="200px" height="300px" src="/benni/mani_hvitmbrunu.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Polo bolur Thermolite Long Sleeved</Title>
              <Description>
                Sama hvaða lit, helst blátt eða hvítt en má vera svart. Stærð L
              </Description>
              <Price>11.900 kr.</Price>
              <Store>
                Prósjoppan Golfbúð
                <br />
                Síðumúla 33
                <br />
                <a target="_blank" href="https://prosjoppan.is">
                  Vefsíða
                </a>
              </Store>
            </Content>
            <Image
              width="160px"
              height="200px"
              src="/benni/FJ20ThermoliteLongSleevedSmoothPique96955_2000x.jpg"
            />
          </Item>
          <Item>
            <Content>
              <Title>Peysa Heather Colour Block Chill-Out</Title>
              <Description>Rauða, Stærð L</Description>
              <Price>14.900 kr.</Price>
              <Store>
                Prósjoppan Golfbúð
                <br />
                Síðumúla 33
                <br />
                <a target="_blank" href="https://prosjoppan.is">
                  Vefsíða
                </a>
              </Store>
            </Content>
            <Image
              width="150px"
              height="200px"
              src="/benni/FJ-Pullovers-Men-Arlington-92942-Front_2000x.jpg"
            />
          </Item>
          <Item fav>
            <Content>
              <Title>Jersey Fleece Backed Buttoned Collar</Title>
              <Description>Peysa, Stærð L</Description>
              <Price>15.900 kr.</Price>
              <Store>
                Prósjoppan Golfbúð
                <br />
                Síðumúla 33
                <br />
                <a target="_blank" href="https://prosjoppan.is">
                  Vefsíða
                </a>
              </Store>
            </Content>
            <Image
              width="200px"
              height="200px"
              src="/benni/FJ-Pullovers-Men-Spirit-90293-Front_2000x.png"
            />
          </Item>
          <Item>
            <Content>
              <Title>Vindpeysa Wool Blend 1/2 Zip Argyle Lined</Title>
              <Description>Stærð L, eða aðra stærð sem ég get þá skipt seinna</Description>
              <Price>22.900 kr.</Price>
              <Store>
                Prósjoppan Golfbúð
                <br />
                Síðumúla 33
                <br />
                <a target="_blank" href="https://prosjoppan.is">
                  Vefsíða
                </a>
              </Store>
            </Content>
            <Image
              width="150px"
              height="200px"
              src="/benni/FJ20WoolBlend_ZipArgylePullover92946Front_2000x.jpg"
            />
          </Item>
          <Item>
            <Content>
              <Title>Stetson Hanskar - Leður / Cashmere</Title>
              <Description>Stærð L</Description>
              <Price>19.900 kr.</Price>
              <Store>Herrafataverzlun Kormáks & Skjaldar</Store>
            </Content>
            <Image
              width="200px"
              height="170px"
              src="/benni/706c54b15aeed9f826300968b65e187e-700x0-c-default_2048x2048.jpg"
            />
          </Item>
          <Item>
            <Content>
              <Title>Desmond Cognac brúnir</Title>
              <Description>Skór, stærð 43</Description>
              <Price>19.900 kr.</Price>
              <Store>
                JÖR by GUÐMUNDUR JÖRUNDSSON
                <br />
                Lækjartorgi 5, 3. hæð, gengið inn við hliðiná Te&Kaffi
                <br />
                Opið 11-22 alla daga
                <br />
                <a target="_blank" href="https://www.facebook.com/jorstudios">
                  Facebook síða
                </a>
              </Store>
            </Content>
            <Image width="209px" height="139px" src="/benni/IMG_5365.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Baxley svartir</Title>
              <Description>Skór, stærð 43</Description>
              <Price>20.900 kr.</Price>
              <Store>
                JÖR by GUÐMUNDUR JÖRUNDSSON
                <br />
                Lækjartorgi 5, 3. hæð, gengið inn við hliðiná Te&Kaffi
                <br />
                Opið 11-22 alla daga
                <br />
                <a target="_blank" href="https://www.facebook.com/jorstudios">
                  Facebook síða
                </a>
              </Store>
            </Content>
            <Image width="200px" height="200px" src="/benni/IMG_5367.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Stetson Sixpensari</Title>
              <Description>
                Ekki viss með stærð, frekar stærra en minna, get þá skipt bara ef það passar ekki
              </Description>
              <Price>23.900 kr.</Price>
              <Store>Herrafataverzlun Kormáks & Skjaldar</Store>
            </Content>
            <Image width="200px" height="100px" src="/benni/6647401-68_2048x2048.jpg" />
          </Item>
          <Item fav>
            <Content>
              <Title>Foot Joy Contour BOA</Title>
              <Description>Skór, Stærð 43, Breidd Wide</Description>
              <Price>26.900 kr.</Price>
              <Store>
                Prósjoppan Golfbúð
                <br />
                Síðumúla 33
                <br />
                <a target="_blank" href="https://prosjoppan.is">
                  Vefsíða
                </a>
                <br />
                (líka til í Golfskálanum)
              </Store>
            </Content>
            <Image width="200px" height="200px" src="/benni/FJ20Mens_Contour_54197_Right.jpg" />
          </Item>
        </Gifts>
        <h3>Golf</h3>
        <Gifts>
          <Item>
            <Content>
              <Title>Púttmotta Auto Return</Title>
              <Description>Púttmotta</Description>
              <Price>7.990 kr.</Price>
              <Store>
                Örninn Golfverslun
                <br />
                Bíldshöfða 9
              </Store>
            </Content>
            <Image width="200px" height="170px" src="/benni/pm02dlx_.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Odyssey White Hot Pro 2-Ball</Title>
              <Description>Pútter, stærð 35" ef til, annars 34"</Description>
              <Price>22.400 kr.</Price>
              <Store>
                Golfskálinn
                <br />
                Bíldshöfða 16
              </Store>
            </Content>
            <Image width="200px" height="200px" src="/benni/286385_4.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Wellputt FIRST 3 metrar</Title>
              <Description>Púttmotta</Description>
              <Price>13.800 kr.</Price>
              <Store>
                Golfskálinn
                <br />
                Bíldshöfða 16
              </Store>
            </Content>
            <Image width="200px" height="200px" src="/benni/FIRST_14_balles_bases_def.png" />
          </Item>
          <Item fav>
            <Content>
              <Title>Triple Track 2Ball</Title>
              <Description>Pútter, stærð 35" ef til, annars 34"</Description>
              <Price>41.990 kr.</Price>
              <Store>
                Örninn Golfverslun
                <br />
                Bíldshöfða 9
              </Store>
            </Content>
            <Image width="200px" height="170px" src="/benni/triple-track-2-ball_.jpg" />
          </Item>
        </Gifts>
      </Main>
    </>
  );
}
