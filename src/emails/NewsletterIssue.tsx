import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Markdown,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface Props {
  locale: Locale;
  issue: {
    subject: string;
    date: string;
    preview?: string;
    body: string;
  };
  unsubscribeUrl: string;
  copy: Dictionary['subscribe']['issueEmail'];
}

export function NewsletterIssue({ locale, issue, unsubscribeUrl, copy }: Props) {
  const formatter = new Intl.DateTimeFormat(locale === 'is' ? 'is-IS' : 'en-US', {
    dateStyle: 'long',
  });
  const formattedDate = formatter.format(new Date(issue.date));

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{issue.preview ?? issue.subject}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brand}>benedikt.valdez.is</Text>
            <Text style={dateLine}>{formattedDate}</Text>
          </Section>
          <Section style={bodySection}>
            <Markdown
              markdownContainerStyles={markdownContainer}
              markdownCustomStyles={markdownStyles}
            >
              {issue.body}
            </Markdown>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>{copy.siteLabel}</Text>
          <Text style={footer}>
            <Link href={unsubscribeUrl} style={footerLink}>
              {copy.unsubscribeLabel}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default NewsletterIssue;

const body: React.CSSProperties = {
  backgroundColor: '#eff1f3',
  fontFamily: 'Outfit, Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  margin: 0,
  padding: '32px 0',
};

const container: React.CSSProperties = {
  maxWidth: '560px',
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

const dateLine: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 500,
  color: '#696773',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  margin: '4px 0 0',
};

const bodySection: React.CSSProperties = {
  margin: '0 0 16px',
};

const markdownContainer: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 300,
  lineHeight: 1.65,
  color: '#272727',
};

const markdownStyles = {
  h1: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#272727',
    margin: '24px 0 12px',
  },
  h2: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#272727',
    margin: '24px 0 8px',
  },
  h3: {
    fontSize: '17px',
    fontWeight: 600,
    color: '#272727',
    margin: '20px 0 8px',
  },
  p: {
    margin: '0 0 16px',
  },
  link: {
    color: '#bf1313',
    textDecoration: 'underline',
  },
  ul: {
    margin: '0 0 16px',
    paddingLeft: '20px',
  },
  ol: {
    margin: '0 0 16px',
    paddingLeft: '20px',
  },
  li: {
    margin: '0 0 4px',
  },
  codeInline: {
    backgroundColor: '#eff1f3',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  blockQuote: {
    borderLeft: '3px solid #bf1313',
    paddingLeft: '12px',
    margin: '0 0 16px',
    color: '#696773',
    fontStyle: 'italic',
  },
};

const hr: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid #eff1f3',
  margin: '24px 0 16px',
};

const footer: React.CSSProperties = {
  fontSize: '11px',
  color: '#696773',
  margin: '0 0 4px',
};

const footerLink: React.CSSProperties = {
  color: '#696773',
  textDecoration: 'underline',
};
