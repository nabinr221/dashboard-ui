import React, { useState } from "react";
import ToolTip from "../tooltip/ToolTip";
import { Trash2, Pencil } from "lucide-react";
import TableContainer from "../../container/TableContainer";
import Modal from "../../models/Model";
import { toast } from "react-toastify";
import useDataDeletion from "../../../hooks/useDataDeletion/usedDataDeletion";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";

const PublicationTable = ({ data, refetchData }) => {
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/publications`;
  const { deleteData } = useDataDeletion();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  // Number of posts per page, adjust as needed

  const openModal = (id) => {
    setDeleteItemId(id);
  };

  const closeModal = () => {
    setDeleteItemId(null);
  };
  const handleDelete = async () => {
    deleteData(`${apiUrl}/${deleteItemId}`, () => {
      toast.success("Data deleted successfully!");
      refetchData();
      closeModal();
    });
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const newData = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <TableContainer>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50 capitalize font-bold '>
          <tr>
            <th
              scope='col'
              className='px-4 py-3.5 text-left text-sm  text-gray-700'
            >
              <span>SN</span>
            </th>

            <th scope='col' className='px-4 py-3.5  text-sm  text-gray-700'>
              image
            </th>
            <th
              scope='col'
              className='w-[12rem] px-5 py-3.5 text-left text-sm  text-gray-700'
            >
              Book Name
            </th>

            <th
              scope='col'
              className='px-5 py-3.5 text-left text-sm  text-gray-700'
            >
              Publication
            </th>
            <th
              scope='col'
              className='w-[20rem] px-5 py-3.5 text-left text-sm  text-gray-700'
            >
              summary
            </th>
            <th
              scope='col'
              className='px-2 py-3.5 text-left text-sm  text-gray-700'
            >
              Status
            </th>

            <th scope='col' className='text-gray-700 px-4 py-3.5'>
              <span className=''>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {newData?.map((publication, index) => (
            <tr key={index}>
              <td className='whitespace-wrap font-bold px-4 py-4 text-sm text-gray-700'>
                <div className='text-sm text-gray-700'>{index + 1}</div>
              </td>

              <td className='whitespace-wrap px-4 py-4'>
                <div className='flex items-center pl-4 '>
                  <div className='h-16 w-16  flex-shrink-0'>
                    <img
                      className='h-full w-full object-cover'
                      src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                        publication?.image
                      }`}
                      alt=''
                    />
                  </div>
                </div>{" "}
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-semibold  capitalize line-clamp-3 overflow-hidden '>
                  {publication?.bookTitle}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize'>
                  {publication?.publication}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize line-clamp-3 overflow-hidden  '>
                  {publication?.summary}
                </div>
              </td>
              <td className='w-fit px-4 py-4'>
                <div className='w-fit text-sm font-medium text-black capitalize'>
                  {publication?.isPurchased ? (
                    <div className='inline-block bg-orange-500 text-white px-4 py-2 rounded-full'>
                      Paid
                    </div>
                  ) : (
                    <div className='inline-block bg-blue-500 text-white px-4 py-2 rounded-full'>
                      Free
                    </div>
                  )}
                </div>
              </td>

              <td className='whitespace-wrap px-12 w-full py-6 flex items-center justify-center gap-3'>
                <div className='text-sm text-gray-900 '>
                  <ToolTip text='edit'>
                    <Link to={`/publications/edit/${publication._id}`}>
                      <span className='flex items-center gap-2 rounded-full bg-blue-500 p-2 text-white'>
                        <Pencil className='h-4 w-4  ' aria-hidden='true' />
                      </span>
                    </Link>
                  </ToolTip>
                </div>
                <div className='text-sm text-gray-700'>
                  <ToolTip text='delete'>
                    <span
                      onClick={() => openModal(publication._id)}
                      className='flex items-center gap-2 rounded-full bg-orange-500 p-2 text-white'
                    >
                      <Trash2 className='h-4 w-4' aria-hidden='true' />
                    </span>
                  </ToolTip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        className='my-10'
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <Modal isOpen={deleteItemId !== null} onClose={closeModal}>
        <button
          onClick={closeModal}
          className=' p-4 w-fit bg-indigo-600  text-white font-bold text-sm '
        >
          Cancle
        </button>
        <button
          onClick={() => handleDelete(deleteItemId)}
          className=' p-4 w-fit bg-orange-600 text-white font-bold text-sm '
        >
          Delete
        </button>
      </Modal>
    </TableContainer>
  );
};

export default PublicationTable;
