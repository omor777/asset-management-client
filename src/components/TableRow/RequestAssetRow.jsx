import { useState } from 'react';
import AssetRequestModal from '../Modal/AssetRequestModal';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../utils/alert';

const RequestAssetRow = ({ asset = {}, refetch }) => {
  const {
    product_name,
    product_type,
    availability,
    _id,
    status,
    product_quantity,
    provider_info,
  } = asset;
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  //   console.log(deleteId);
  // console.log(asset);
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: {
      notes: '',
    },
  });
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleRequest = async (data) => {
    const updatedData = {
      additional_notes: data.notes,
      requested_date: new Date(),
      status: 'pending',
      requester_info: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    try {
      const { data } = await axiosSecure.patch(
        `/asset/update/${deleteId}`,
        updatedData,
      );
      //   console.log(data, 'form hanlde ');
      if (data.modifiedCount > 0) {
        setShowModal(false);
        refetch();
        reset();
        successAlert('Your request have been sent!');
      }
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  const handleOpenModal = () => {
    // if (asset.status === 'pending')
    //   return warningAlert('You have already request this asset!');
    setShowModal(true);
  };

  return (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-12 text-sm font-medium text-gray-700 dark:text-gray-200">
          <span className="capitalize">{product_name}</span>
        </td>

        <td className="whitespace-nowrap py-4 text-sm text-gray-500 dark:text-gray-300">
          <p
            className={`inline-flex w-14 items-center justify-center rounded-full bg-purple-100/60 py-1 dark:bg-gray-800`}
          >
            <span className={`text-sm font-normal text-purple-500`}>
              {product_quantity}
            </span>
          </p>
        </td>

        <td className="whitespace-nowrap py-4 text-sm text-gray-500 dark:text-gray-300">
          <span className="capitalize">{product_type}</span>
        </td>

        <td className="whitespace-nowrap py-4 text-sm text-gray-500 dark:text-gray-300">
          <span className="capitalize">{provider_info?.name}</span>
        </td>

        <td className="whitespace-nowrap py-4 text-sm text-gray-500 dark:text-gray-300">
          <span className="capitalize">{provider_info?.email}</span>
        </td>

        <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
          <p
            className={`inline-flex items-center rounded-full ${availability === 'Out of stock' ? 'bg-red-100/60' : 'bg-emerald-100/60'} w-28 justify-center py-1 dark:bg-gray-800`}
          >
            <span
              className={`text-sm font-normal ${availability === 'Out of stock' ? 'text-red-500' : 'text-emerald-500'}`}
            >
              {availability}
            </span>
          </p>
        </td>

        <td className="whitespace-nowrap py-4 text-sm">
          <button
            onClick={() => {
              handleOpenModal();
              setDeleteId(_id);
            }}
            disabled={availability === 'Out of stock' || status === 'pending'}
            className={`rounded px-3 py-1 tracking-wide text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none ${availability === 'Out of stock' || status === 'pending' ? 'cursor-not-allowed bg-gray-700 hover:bg-gray-700' : 'bg-primary'}`}
          >
            Request
          </button>
        </td>
      </tr>
      <AssetRequestModal
        showModal={showModal}
        isDirty={isDirty}
        setShowModal={setShowModal}
        register={register}
        handleSubmit={handleSubmit}
        handleRequest={handleRequest}
      />
    </>
  );
};

RequestAssetRow.propTypes = {
  asset: PropTypes.object,
};

export default RequestAssetRow;
