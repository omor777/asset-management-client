// src/components/PdfDocument.js
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
  section: {
    alignContent: 'flex-start',
    marginTop: 30,
  },
  companyInfo: {
    fontSize: 12,
    marginBottom: 10,
  },
  date: {
    fontSize: 10,
  },
});
// Create Document Component
const PdfDocument = ({ pdfData }) => {
  console.log(pdfData, 'form pdf document-------------------------');
  const currentDate = format(new Date(), 'MMM do, yyy h:mm:ss a');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <div>
          <View style={styles.header}>
            <Text style={styles.companyInfo}>Your Company Name</Text>
            <Text style={styles.companyInfo}>1234 Main Street</Text>
            <Text style={styles.companyInfo}>City, State, ZIP</Text>
            <Text style={styles.companyInfo}>Phone: (123) 486-7890</Text>
            <Text style={styles.companyInfo}>Email: info@yourcompany.com</Text>
          </View>
          <View style={styles.section}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 14,
                textTransform: 'capitalize',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                Product name:
              </Text>{' '}
              {pdfData?.product_name}
            </Text>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 14,
                textTransform: 'capitalize',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                Product type:
              </Text>{' '}
              {pdfData?.product_type}
            </Text>

            <Text
              style={{
                marginBottom: 8,
                fontSize: 14,
                textTransform: 'capitalize',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                Product quantity:
              </Text>{' '}
              {pdfData?.product_quantity}
            </Text>

            <Text
              style={{
                marginBottom: 8,
                fontSize: 14,
                textTransform: 'capitalize',
              }}
            >
              {' '}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                Availability:
              </Text>{' '}
              {pdfData?.availability}
            </Text>

            {/* Add more asset details as needed */}
          </View>
        </div>
        <View style={styles.footer}>
          <Text
            style={{
              fontStyle: 'italic',
            }}
          >
            {currentDate}
          </Text>
        </View>          
      </Page>
    </Document>
  );
};

PdfDocument.propTypes = {
  pdfData: PropTypes.object,
};

export default PdfDocument;
