import { PDFViewer } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import PdfDocument from './PdfDocument';
const PrintAssetPdf = ({ pdfData,assetInfo, showModal, setShowModal }) => {
  const axiosSecure = useAxiosSecure();
  // get HR information
  const email = pdfData?.provider_info?.email;
  const { data: companyInfo = {} } = useQuery({
    queryKey: ['company-info-pdf', email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employee/${email}`);
      return data;
    },
  });


 

  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-full max-w-3xl">
              {/*content*/}
              <div className="relative flex h-[90vh] w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/* header*/}
                <div className="border-blueGray-200 flex items-start justify-between">
                  <button
                    className="float-right ml-auto border-0 bg-primary bg-transparent p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <IoIosClose className="text-red-500" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto pb-9">
                  <PDFViewer width={'100%'} height={'100%'}>
                    <PdfDocument assetInfo={assetInfo} companyInfo={companyInfo} pdfData={pdfData} />
                  </PDFViewer>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
        </>
      ) : null}
    </>
  );
};

PrintAssetPdf.propTypes = {
  pdfData: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default PrintAssetPdf;
