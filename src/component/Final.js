import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Document, Page, Text, View, pdf, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  strong: {
    fontWeight: "bold",
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});


const Final = ({ resetForm }) => {
  const handleReset = () => {
    resetForm();
  };

  const downloadPdf = async () => {
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.text}>Resume</Text>
          </View>
         
          <View style={styles.section}>
            <Text style={styles.text}>
              <Text style={styles.strong}>First Name: </Text> {localStorage.getItem("firstName")}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.strong}>Last Name: </Text> {localStorage.getItem("lastName")}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.strong}>Email: </Text> {localStorage.getItem("email")}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.strong}>Phone Number: </Text> {localStorage.getItem("phoneNumber")}
            </Text>
            <View style={styles.divider}></View> 
            <Text style={styles.text}>
              <Text style={styles.strong}>College Name: </Text> {localStorage.getItem("collegeName")}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.strong}>Degree: </Text> {localStorage.getItem("degree")}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.strong}>Year: </Text> {localStorage.getItem("year")}
            </Text>
            <View style={styles.divider}></View> 
            <Text style={styles.text}>
              <Text style={styles.strong}>Skills: </Text> {localStorage.getItem("skills")}
            </Text>
          </View>
        </Page>
      </Document>
    );

    const pdfBlob = await pdf(doc).toBlob();
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'review.pdf';
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(pdfUrl);
  };

  const handleDownload = () => {
    downloadPdf().catch((error) => {
      console.error('Failed to generate or download PDF:', error);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#e0e0e0",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#ffffff",
          width: 500,
          mx: "auto",
          p: 5,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ marginTop: 0, marginBottom: 6 }}>
          Review Page
        </Typography>
        <Divider />
        <Divider />
        <Typography variant="body1" sx={{ marginBottom: 1, marginTop: 2 }}>
          <strong>First Name:</strong> {localStorage.getItem("firstName")}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Last Name:</strong> {localStorage.getItem("lastName")}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Email:</strong> {localStorage.getItem("email")}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          <strong>Phone Number:</strong> {localStorage.getItem("phoneNumber")}
        </Typography>
        <Divider />
        <Typography variant="body1" sx={{ marginBottom: 1, marginTop: 2 }}>
          <strong>College Name:</strong> {localStorage.getItem("collegeName")}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Degree:</strong> {localStorage.getItem("degree")}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          <strong>Year:</strong> {localStorage.getItem("year")}
        </Typography>
        <Divider />
        <Typography variant="body1" sx={{ marginBottom: 6, marginTop: 2 }}>
          <strong>Skills:</strong> {localStorage.getItem("skills")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button variant="contained" onClick={handleReset}>
            Reset Form
          </Button>
          <Button variant="contained" onClick={handleDownload}>
            Download
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Final;
