import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
} from "@react-email/components";
import * as React from "react";

const PropDefaults = {
  tips: [
    {
      id: 1,
      bolded: "Perfect Pitch:",
      description:
        "A rare gem in the musical world, allowing one to identify any note instantly and with precision, sans any reference.",
    },
    {
      id: 2,
      bolded: "Absolute Pitch:",
      description:
        "Similar to perfect pitch but slightly less accurate and more reliant on the musical context.",
    },
    {
      id: 3,
      bolded: "Relative Pitch",
      description:
        "The most common approach, it involves comparing notes against a known reference or key.",
    },
  ],
};

export const NewsLetterEmail = () => (
  <Html>
    <Head />
    <Preview>The Key to Musical Mastery</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logo}>
          <Img
            width={110}
            style={{ borderRadius: "50%" }}
            src={`https://www.eu-startups.com/wp-content/uploads/2021/06/bzlyqjugxjpazbqhacog-150x150.jpg`}
          />
        </Section>

        <Section style={header}>
          <Row>
            <Column style={headerContent}>
              <Heading style={headerContentTitle}>
                Unlock the World of Music
              </Heading>
              <Text style={headerContentSubtitle}>
                Discover, Analyze, and Grow Your Musical Talent
              </Text>
            </Column>
            <Column style={headerImageContainer}>
              <Img
                style={headerImage}
                width={340}
                src={`https://tse4.mm.bing.net/th/id/OIG3._v4S8Y214kfZANcQvLFM?pid=ImgGn`}
              />
            </Column>
          </Row>
        </Section>

        <Section style={content}>
          <Heading as="h2" style={title}>
            Searching for solutions
          </Heading>
          <Text style={paragraph}>
            Music transcends boundaries, connecting people across generations
            and cultures. It’s a passion pursued from a tender age, whether as a
            hobby or a professional path. Success in music hinges on a keen
            sense of pitch—the ability to discern and reproduce musical notes.
          </Text>

          <Hr style={divider} />

          <Heading as="h2" style={title}>
            Understanding Pitch
          </Heading>
          <Text style={paragraph}>
            The Key to Musical Mastery Pitch is categorized into three distinct
            types
          </Text>
          <ul>
            {PropDefaults.tips.map((tip) => (
              <li key={tip.id}>
                <Text style={paragraph}>
                  <span style={{ fontWeight: "bold" }}>{tip.bolded}</span>
                  {tip.description}
                </Text>
              </li>
            ))}
          </ul>

          <Text style={paragraph}>
            Possessing any of these pitch abilities can vastly enhance musical
            prowess and creativity. Yet, not all are innately equipped with
            these skills; many cultivate them through dedicated training and
            practice.
          </Text>

          <Hr style={divider} />

          <Text style={paragraph}>
            Embark on Your Musical Voyage Whether you’re a budding musician or a
            seasoned artist, our Web Application is your companion in exploring
            and enhancing your musical talents. Join us in this symphony of
            innovation and let your musicality soar to new heights.
          </Text>

          <Section style={buttonContainer}>
            <Link style={button} href="http://159.223.74.216:8080/" target="_blank">
              Go to Musify
            </Link>
          </Section>
        </Section>
      </Container>

      <Section style={footer}>
        <Text style={footerText}>
          You{"'"}re receiving this email because your Musify activity triggered
          this tip or reminder.
        </Text>

        <Link href="/" style={footerLink}>
          Unsubscribe from emails like this{" "}
        </Link>
        <Link href="/" style={footerLink}>
          Edit email settings{" "}
        </Link>
        <Link href="/" style={footerLink}>
          Contact us
        </Link>
        <Link href="/" style={footerLink}>
          Privacy
        </Link>

        <Hr style={footerDivider} />

        <Text style={footerAddress}>
          <strong>Musify</strong>, NSBM Green University 💖 with the University
          of Plymouth
        </Text>
        <Text style={footerHeart}>{"<3"}</Text>
      </Section>
    </Body>
  </Html>
);

/* NewsLetter.PreviewPro = {
  tips: PropDefaults.tips,
};

NewsLetter.propTypes = {
  tips: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      bolded: propTypes.string,
      description: propTypes.string,
    })
  ),
}; */

const main = {
  backgroundColor: "#f3f3f5",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const headerContent = { padding: "20px 30px 15px" };

const headerContentTitle = {
  color: "#fff",
  fontSize: "27px",
  fontWeight: "bold",
  lineHeight: "27px",
};

const headerContentSubtitle = {
  color: "#fff",
  fontSize: "17px",
};

const headerImageContainer = {
  padding: "30px 10px",
};

const headerImage = {
  maxWidth: "100%",
};

const title = {
  margin: "0 0 15px",
  fontWeight: "bold",
  fontSize: "21px",
  lineHeight: "21px",
  color: "#0c0d0e",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "21px",
  color: "#3c3f44",
};

const divider = {
  margin: "30px 0",
};

const container = {
  width: "680px",
  maxWidth: "100%",
  margin: "0 auto",
  backgroundColor: "#ffffff",
};

const footer = {
  width: "680px",
  maxWidth: "100%",
  margin: "32px auto 0 auto",
  padding: "0 30px",
};

const content = {
  padding: "30px 30px 40px 30px",
};

const logo = {
  display: "flex",
  background: "#f3f3f5",
  padding: "20px 30px",
};

const header = {
  borderRadius: "5px 5px 0 0",
  display: "flex",
  flexDireciont: "column",
  backgroundColor: "#2b2d6e",
};

const buttonContainer = {
  marginTop: "24px",
  display: "block",
};

const button = {
  backgroundColor: "#0095ff",
  border: "1px solid #0077cc",
  fontSize: "17px",
  lineHeight: "17px",
  padding: "13px 17px",
  borderRadius: "4px",
  maxWidth: "120px",
  color: "#fff",
};

const footerDivider = {
  ...divider,
  borderColor: "#d6d8db",
};

const footerText = {
  fontSize: "12px",
  lineHeight: "15px",
  color: "#9199a1",
  margin: "0",
};

const footerLink = {
  display: "inline-block",
  color: "#9199a1",
  textDecoration: "underline",
  fontSize: "12px",
  marginRight: "10px",
  marginBottom: "0",
  marginTop: "8px",
};

const footerAddress = {
  margin: "4px 0",
  fontSize: "12px",
  lineHeight: "15px",
  color: "#9199a1",
};

const footerHeart = {
  borderRadius: "1px",
  border: "1px solid #d6d9dc",
  padding: "4px 6px 3px 6px",
  fontSize: "11px",
  lineHeight: "11px",
  fontFamily: "Consolas,monospace",
  color: "#e06c77",
  maxWidth: "min-content",
  margin: "0 0 32px 0",
};

export default NewsLetterEmail;
