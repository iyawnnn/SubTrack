import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Button,
  Link,
} from "@react-email/components";
import * as React from "react";

interface TrialReminderEmailProps {
  userName: string;
  vendorName: string;
  daysLeft: number;
  renewalCost?: string;
}

// ✅ This is a standard React component (Not async)
export const TrialReminderEmail = ({
  userName,
  vendorName,
  daysLeft,
  renewalCost = "$0.00",
}: TrialReminderEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Trial for {vendorName} ends soon!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>⚠️ Trial Ending Soon</Heading>
          <Text style={text}>Hi {userName},</Text>
          <Text style={text}>
            Your free trial for <strong>{vendorName}</strong> is expiring in{" "}
            <span style={{ color: "#d93025", fontWeight: "bold" }}>
              {daysLeft} days
            </span>
            .
          </Text>
          <Section style={highlightSection}>
            <Text style={highlightText}>
              Renewal Cost: <strong>{renewalCost}</strong>
            </Text>
          </Section>
          <Text style={text}>
            If you want to keep it, no action is needed. If you want to cancel,
            do it now to avoid being charged.
          </Text>
          <Link href="https://subvantage.iansebastian.dev/dashboard" style={button}>
            Check Dashboard
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = { backgroundColor: "#ffffff", fontFamily: "sans-serif" };
const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};
const h1 = { fontSize: "24px", fontWeight: "bold", color: "#333" };
const text = { fontSize: "16px", lineHeight: "26px", color: "#333" };
const highlightSection = {
  padding: "24px",
  border: "1px solid #dedede",
  borderRadius: "5px",
  margin: "24px 0",
};
const highlightText = { fontSize: "18px", textAlign: "center" as const };
const button = {
  backgroundColor: "#000",
  borderRadius: "5px",
  color: "#fff",
  padding: "12px 20px",
  textDecoration: "none",
  display: "inline-block",
};

export default TrialReminderEmail;
