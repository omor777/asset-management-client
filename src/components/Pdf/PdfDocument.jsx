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
    fontSize: 13,
    marginBottom: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 10,
  },
});
// Create Document Component
const PdfDocument = ({ pdfData, assetInfo, companyInfo }) => {
  const requestDate = format(pdfData?.requested_date, 'EEEE, MMMM do, yyyy');
  const approveDate = format(pdfData?.approve_date, 'EEEE, MMMM do, yyyy');

  const currentDate = format(new Date(), 'MMM do, yyy h:mm:ss a');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <div>
          <View style={styles.header}>
            <Text style={styles.companyInfo}>
              <Text style={styles.heading}>Company Name:</Text>{' '}
              {companyInfo?.company_name}
            </Text>
            <Text style={styles.companyInfo}>
              <Text style={styles.heading}>HR Name:</Text> {companyInfo?.name}
            </Text>
            <Text style={styles.companyInfo}>
              {' '}
              <Text style={styles.heading}>HR Email:</Text> {companyInfo?.email}
            </Text>
            <Text style={styles.companyInfo}>
              <Text style={styles.heading}>Total Employee:</Text>{' '}
              {companyInfo?.employee_count}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.companyInfo}>
              <Text style={styles.heading}>Product name:</Text>{' '}
              {pdfData?.product_name}
            </Text>
            <Text style={styles.companyInfo}>
              <Text style={styles.heading}>Product type:</Text>{' '}
              {pdfData?.product_type}
            </Text>

            <Text style={styles.companyInfo}>
              <Text style={styles.heading}>Product quantity:</Text>{' '}
              {assetInfo?.product_quantity}
            </Text>

            <Text style={styles.companyInfo}>
              {' '}
              <Text style={styles.heading}>Availability:</Text>{' '}
              {assetInfo?.availability}
            </Text>
            <Text style={styles.companyInfo}>
              {' '}
              <Text style={styles.heading}>Request date:</Text> {requestDate}
            </Text>
            <Text style={styles.companyInfo}>
              {' '}
              <Text style={styles.heading}>Approve date:</Text> {approveDate}
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
  companyInfo: PropTypes.object,
  assetInfo: PropTypes.object,
};

export default PdfDocument;
