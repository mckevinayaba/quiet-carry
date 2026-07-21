import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  siteUrl?: string;
}

const QuietLetterConfirmation = ({ siteUrl = "https://thenoteyouneeded.today" }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You are on the quiet list.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Heading style={heading}>You are on the quiet list.</Heading>
          <Text style={paragraph}>You asked for one quiet letter a day.</Text>
          <Text style={paragraph}>We will send it each morning.</Text>
          <Text style={paragraph}>No noise. No branding. No call to action.</Text>
          <Text style={paragraph}>Just the note you needed.</Text>
          <Text style={paragraph}>&nbsp;</Text>
          <Text style={paragraph}>
            If you ever want to stop, you can unsubscribe with one click from any
            letter, or reply with the word &ldquo;stop&rdquo; and we will remove
            you quietly.
          </Text>
          <Text style={paragraph}>&nbsp;</Text>
          <Text style={signature}>With love,</Text>
          <Text style={signature}>MAD</Text>
          <Text style={muted}>The Note You Needed Today</Text>
          <Text style={muted}>
            <a href={siteUrl} style={link}>
              thenoteyouneeded.today
            </a>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: QuietLetterConfirmation,
  subject: "You are on the quiet list.",
  displayName: "Quiet letter — confirmation",
  previewData: { siteUrl: "https://thenoteyouneeded.today" },
} satisfies TemplateEntry;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Georgia, 'Cormorant Garamond', 'Times New Roman', serif",
  color: "#2a2320",
};

const container = {
  padding: "32px 28px",
  maxWidth: "560px",
  margin: "0 auto",
};

const heading = {
  fontSize: "26px",
  lineHeight: "34px",
  fontWeight: 400 as const,
  margin: "0 0 20px",
  color: "#2a2320",
};

const paragraph = {
  fontSize: "17px",
  lineHeight: "28px",
  margin: "0 0 4px",
  color: "#2a2320",
};

const signature = {
  fontSize: "17px",
  lineHeight: "26px",
  margin: "0",
  color: "#2a2320",
};

const muted = {
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0",
  color: "#7a6f68",
};

const link = {
  color: "#7a6f68",
  textDecoration: "underline",
};
