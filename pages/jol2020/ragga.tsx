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
        <title>Ragga Jól 2020 @benediktvaldez</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Main>
        <h2>Ragga jól 2020</h2>
        <Gifts>
          <Item fav>
            <Content>
              <Title>Braun Kaffivél</Title>
              <Description>BRA-KF560</Description>
              <Price>9.995 kr.</Price>
              <Store>
                Heimilistæki
                <br />
                Suðurlandsbraut
              </Store>
            </Content>
            <Image width="200px" height="180px" src="/ragga/BRA-KF560_720_560_2.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>RCR - Luxion Kanna 1l.</Title>
              <Price>4.990 kr.</Price>
              <Store>Dúka</Store>
            </Content>
            <Image width="170px" height="200px" src="/ragga/rcr.jpg" />
          </Item>
          <Item fav>
            <Content>
              <Title>Söngfugl – Kay</Title>
              <Price>11.550 kr.</Price>
              <Store>
                Líf og List
                <br />
                Smáralind
              </Store>
            </Content>
            <Image width="200px" height="200px" src="/ragga/kay.png" />
          </Item>
          <Item>
            <Content>
              <Title>Elizabeth Arden Green Tea scent spray 50ml</Title>
              <Price>3.689 kr.</Price>
              <Store>Lyfja</Store>
            </Content>
            <Image width="200px" height="200px" src="/ragga/10082135_400_400_2.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Elizabeth Arden Green Tea honey drops líkamskrem 500 ml.</Title>
              <Price>5.192 kr.</Price>
              <Store>Lyfja</Store>
            </Content>
            <Image width="200px" height="200px" src="/ragga/10084086_400_400_2.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Völuspá Ilmkerti í dós</Title>
              <Price>4.490 kr.</Price>
              <Store>
                Maia
                <br />
                Kringlunni
              </Store>
            </Content>
            <Image width="200px" height="200px" src="/ragga/2532-2_1296x.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Völuspá Ilmkerti stórt</Title>
              <Price>6.490 kr.</Price>
              <Store>
                Maia
                <br />
                Kringlunni
              </Store>
            </Content>
            <Image width="200px" height="200px" src="/ragga/2502-2_1296x.jpg" />
          </Item>
          <Item>
            <Content>
              <Title>Handtvenna</Title>
              <Description>Handsápa og handkrem</Description>
              <Price>5.250 kr.</Price>
              <Store>
                L'Occitane
                <br />
                Kringlunni
              </Store>
            </Content>
            <Image width="200px" height="100px" src="/ragga/IMG_8597.PNG" />
          </Item>
          <Item>
            <Content>
              <Title>Möndludraumur</Title>
              <Description>Líkamskrem, múslískrúbbur, sturtuolía og mjólkurbað</Description>
              <Price>9.990 kr.</Price>
              <Store>
                L'Occitane
                <br />
                Kringlunni
              </Store>
            </Content>
            <Image width="200px" height="100px" src="/ragga/IMG_8598.PNG" />
          </Item>
          <Item>
            <Content>
              <Title>Meraki Húsilmur White Tea (100ml)</Title>
              <Price>3.990 kr.</Price>
              <Store>
                Hrím
                <br />
                Kringlunni
              </Store>
            </Content>
            <Image
              width="200px"
              height="200px"
              src="/ragga/7c3162e2-ade9-488e-80d2-ebd55d02fbfb.jpg"
            />
          </Item>
          <Item>
            <Content>
              <Title>Meraki Bað- og Sturtuolía Velvet Mood (275ml)</Title>
              <Price>4.995 kr.</Price>
              <Store>
                Hrím
                <br />
                Kringlunni
              </Store>
            </Content>
            <Image
              width="200px"
              height="200px"
              src="/ragga/eb96849f-436b-4ac1-9bfa-50940b89d04a.jpg"
            />
          </Item>
          <Item>
            <Content>
              <Title>Meraki Líkamsolía (500ml)</Title>
              <Price>6.599 kr.</Price>
              <Store>
                Hrím
                <br />
                Kringlunni
              </Store>
            </Content>
            <Image
              width="200px"
              height="200px"
              src="/ragga/42dd90ce-8078-419f-9d1c-93f6d6044271.jpg"
            />
          </Item>
        </Gifts>
      </Main>
    </>
  );
}
