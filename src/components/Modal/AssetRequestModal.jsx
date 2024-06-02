const AssetRequestModal = ({
  showModal,
  isDirty,
  register,
  setShowModal,
  handleSubmit,
  handleRequest,
}) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-full max-w-md">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-gray-800">
                {/*body*/}
                <form
                  onSubmit={handleSubmit(handleRequest)}
                  noValidate
                  className="relative mt-6 flex-auto px-6"
                >
                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Additional Notes
                    </label>
                    <input
                      {...register('notes', { required: true })}
                      type="text"
                      id="notes"
                      placeholder="add additional notes"
                      className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between py-6">
                    <button
                      disabled={!isDirty}
                      className={`rounded bg-primary px-5 py-1.5 font-medium text-white transition-colors duration-200 hover:bg-blue-700 ${!isDirty ? 'cursor-not-allowed bg-gray-600 hover:bg-gray-600' : ''}`}
                      type="submit"
                    >
                      Request
                    </button>
                    <button
                      className="rounded bg-rose-500 px-5 py-1.5 font-medium text-white transition-colors duration-200 hover:bg-rose-700"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
        </>
      ) : null}
    </>
  );
};

export default AssetRequestModal;
