"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Trophy, UserCog, Heart, Ambulance, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Dynamically import individual MUI components
const Container = dynamic(() => import("@mui/material/Container"), {
  loading: () => <div className="animate-pulse">Loading...</div>,
  ssr: false,
});

const Typography = dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});

const Paper = dynamic(() => import("@mui/material/Paper"), {
  ssr: false,
});

const Box = dynamic(() => import("@mui/material/Box"), {
  ssr: false,
});

const Fade = dynamic(() => import("@mui/material/Fade"), {
  ssr: false,
});

const Grow = dynamic(() => import("@mui/material/Grow"), {
  ssr: false,
});

// Import theme utilities directly since they're hooks
import { useTheme, useMediaQuery } from "@mui/material";

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const stats = [
    { number: "20+", label: "Years of Excellence", icon: Trophy },
    { number: "100+", label: "Expert Doctors", icon: UserCog },
    { number: "50K+", label: "Satisfied Patients", icon: Heart },
    { number: "24/7", label: "Emergency Care", icon: Ambulance },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)",
      }}
    >
      <Navbar />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, flex: 1 }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Box
            sx={{
              mb: 8,
              textAlign: "center",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                backgroundColor: "primary.main",
                borderRadius: "2px",
              },
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)",
                backgroundClip: "text",
                textFillColor: "transparent",
                mb: 4,
              }}
            >
              About Doc-Genie
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                mb: 4,
                maxWidth: "800px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Providing Exceptional Healthcare Since 2004
            </Typography>
          </Box>
        </Fade>

        {/* Mission Statement */}
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              mb: 8,
              borderRadius: 4,
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)",
              },
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              We are committed to delivering the highest quality healthcare
              services with compassion, expertise, and innovation. Our dedicated
              team of healthcare professionals strives to improve the health and
              well-being of our community through personalized care and
              cutting-edge medical solutions.
            </Typography>
          </Paper>
        </Fade>

        {/* Stats Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 4,
            mb: 8,
          }}
        >
          {stats.map((stat, index) => (
            <Grow key={index} in timeout={1000 + index * 200}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  borderRadius: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ mb: 2, color: "primary.main" }}>
                  {<stat.icon size={48} />}
                </Box>
                <Typography
                  variant="h3"
                  color="primary.main"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            </Grow>
          ))}
        </Box>

        {/* Values Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 6,
            mb: 8,
          }}
        >
          <Fade in timeout={1000}>
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                border: "2px solid",
                borderColor: "primary.light",
                background: "rgba(25, 118, 210, 0.02)",
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Our Values
              </Typography>
              {[
                "Excellence in Patient Care",
                "Compassion and Empathy",
                "Innovation and Research",
                "Professional Development",
                "Community Engagement",
              ].map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    boxShadow: 1,
                  }}
                >
                  <CheckCircle2
                    size={24}
                    color={theme.palette.primary.main}
                    style={{ marginRight: 8 }}
                  />
                  <Typography variant="body1">{value}</Typography>
                </Box>
              ))}
            </Box>
          </Fade>

          <Fade in timeout={1000}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                background: "linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)",
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Why Choose Us?
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                Our hospital combines world-class medical expertise with
                state-of-the-art facilities to provide exceptional healthcare
                services. We pride ourselves on:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  "Advanced Medical Technology",
                  "Experienced Healthcare Professionals",
                  "Patient-Centered Approach",
                  "Comprehensive Care Services",
                  "Modern Facilities",
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(25, 118, 210, 0.04)",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateX(10px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <Typography sx={{ color: "white", fontWeight: 600 }}>
                        {index + 1}
                      </Typography>
                    </Box>
                    <Typography variant="body1">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Fade>
        </Box>

        {/* Contact Section */}
        <Fade in timeout={1000}>
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              p: 6,
              borderRadius: 4,
              bgcolor: "background.paper",
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 3,
              }}
            >
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Have questions? Our team is here to help. Contact us at
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                display: "inline-block",
                p: 2,
                borderRadius: 2,
                bgcolor: "primary.light",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                  cursor: "pointer",
                },
              }}
            >
              contact@hospital.com
            </Typography>
          </Box>
        </Fade>
      </Container>
      <Footer />
    </Box>
  );
};

export default AboutPage;
