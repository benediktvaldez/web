import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface Props {
  locale: Locale;
  confirmUrl: string;
  copy: Dictionary['subscribe']['confirmEmail'];
}

export function ConfirmSubscription({ locale, confirmUrl, copy }: Props) {
  return (
    <Html lang={locale}>
      <Head />
      <Preview>{copy.preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brand}>benedikt.valdez.is</Text>
          </Section>
          <Section>
            <Text style={heading}>{copy.heading}</Text>
            <Text style={paragraph}>{copy.body}</Text>
            <Section style={buttonWrap}>
              <Button href={confirmUrl} style={button}>
                {copy.button}
              </Button>
            </Section>
            <Text style={small}>{copy.fallback}</Text>
            <Text style={smallLink}>
              <Link href={confirmUrl} style={linkStyle}>
                {confirmUrl}
              </Link>
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>{copy.footer}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ConfirmSubscription;

const body: React.CSSProperties = {
  backgroundColor: '#eff1f3',
  fontFamily: 'Outfit, Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  margin: 0,
  padding: '32px 0',
};

const container: React.CSSProperties = {
  maxWidth: '520px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '32px',
};

const header: React.CSSProperties = {
  borderBottom: '2px solid #bf1313',
  paddingBottom: '12px',
  marginBottom: '24px',
};

const brand: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  color: '#272727',
  letterSpacing: '0.04em',
  margin: 0,
};

const heading: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 700,
  color: '#272727',
  margin: '0 0 12px',
};

const paragraph: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 300,
  lineHeight: 1.6,
  color: '#272727',
  margin: '0 0 24px',
};

const buttonWrap: React.CSSProperties = {
  margin: '8px 0 24px',
};

const button: React.CSSProperties = {
  backgroundColor: '#bf1313',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: '6px',
  display: 'inline-block',
};

const small: React.CSSProperties = {
  fontSize: '12px',
  color: '#696773',
  margin: '0 0 4px',
};

const smallLink: React.CSSProperties = {
  fontSize: '12px',
  margin: '0 0 16px',
  wordBreak: 'break-all',
};

const linkStyle: React.CSSProperties = {
  color: '#00a1e4',
  textDecoration: 'underline',
};

const hr: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid #eff1f3',
  margin: '24px 0 16px',
};

const footer: React.CSSProperties = {
  fontSize: '11px',
  color: '#696773',
  margin: 0,
};
