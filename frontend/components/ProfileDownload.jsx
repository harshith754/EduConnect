import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
});

// Create Document Component
const MyDocument = ({ facultyDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Personal Details */}
      <View style={styles.section}>
        <Text style={styles.title}>Personal Details</Text>
        <Text style={styles.text}>
          Full Name: {facultyDetails?.personalDetails?.fullName}
        </Text>
        <Text style={styles.text}>
          Gender: {facultyDetails?.personalDetails?.gender}
        </Text>
        <Text style={styles.text}>
          Date of Birth: {facultyDetails?.personalDetails?.dateOfBirth}
        </Text>
        <Text style={styles.text}>
          Email: {facultyDetails?.personalDetails?.email}
        </Text>
      </View>

      {/* Professional Details */}
      <View style={styles.section}>
        <Text style={styles.title}>Professional Details</Text>
        <Text style={styles.text}>
          Department: {facultyDetails?.professionalDetails?.department}
        </Text>
        <Text style={styles.text}>
          Designation: {facultyDetails?.professionalDetails?.designation}
        </Text>
        <Text style={styles.text}>
          Teaching Experience:{" "}
          {facultyDetails?.professionalDetails?.teachingExperience} years
        </Text>
        <Text style={styles.text}>
          Institute Experience:{" "}
          {facultyDetails?.professionalDetails?.instituteExperience} years
        </Text>
      </View>

      {/* Books Published */}
      <View style={styles.section}>
        <Text style={styles.title}>Books Published</Text>
        {facultyDetails?.booksPublished?.books.map((book, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.subtitle}>Title: {book.title}</Text>
            <Text style={styles.text}>Publishers: {book.publishers}</Text>
            <Text style={styles.text}>
              Year of Publication: {book.yearOfPublication}
            </Text>
            <Text style={styles.text}>Chapters: {book.chapters}</Text>
            <Text style={styles.text}>Co-Authors: {book.coAuthors}</Text>
          </View>
        ))}
      </View>

      {/* Patents Registered */}
      <View style={styles.section}>
        <Text style={styles.title}>Patents Registered</Text>
        {facultyDetails?.patentsRegistered.patents.map((patent, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.subtitle}>
              Patent Title: {patent.patentTitle}
            </Text>
            <Text style={styles.text}>
              Application No: {patent.applicationNo}
            </Text>
            <Text style={styles.text}>
              Publication Date: {patent.publicationDate}
            </Text>
            <Text style={styles.text}>Author List: {patent.authorList}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Download link component
const ProfileDownload = ({ facultyDetails }) => (
  <div className="flex ">
    <PDFDownloadLink
      document={<MyDocument facultyDetails={facultyDetails} />}
      fileName="facultyDetails.pdf"
    >
      {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
    </PDFDownloadLink>
  </div>
);

export default ProfileDownload;
