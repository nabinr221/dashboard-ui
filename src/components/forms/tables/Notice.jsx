import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import ToolTip from "../tooltip/ToolTip";
import { Pencil, Trash2 } from "lucide-react";
import TableContainer from "../../container/TableContainer";
import Modal from "../../models/Model";
import { toast } from "react-toastify";
import useDataDeletion from "../../../hooks/useDataDeletion/usedDataDeletion";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";

const NoticeTable = ({ data, refetchData }) => {
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/notices`;

  const { deleteData } = useDataDeletion();
  const [deleteItemId, setDeleteItemId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Number of posts per page, adjust as needed

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

            <th
              scope='col'
              className='px-12 py-3.5 text-left text-sm  text-gray-700'
            >
              Image
            </th>
            <th scope='col' className='relative px-4 py-3.5'>
              <span className=''>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {newData?.map((item, index) => (
            <tr key={index}>
              <td className='whitespace-wrap font-bold px-4 py-4 text-sm text-gray-700'>
                <div className='text-sm text-gray-700'>{index + 1}</div>
              </td>

              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize w-20 h-20'>
                  <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                      item?.image
                    }`}
                    className='w-full h-full object-contain'
                    alt='image'
                  />
                </div>
              </td>

              <td className='whitespace-wrap px-12 py-4 flex items-center justify-center gap-3'>
                <div className='text-sm text-gray-900 '>
                  <ToolTip text='edit'>
                    <Link to={`/notices/edit/${item.id}`}>
                      <span className='flex items-center gap-2 rounded-full bg-blue-500 p-2 text-white'>
                        <Pencil className='h-4 w-4  ' aria-hidden='true' />
                      </span>
                    </Link>
                  </ToolTip>
                </div>
                <div className='text-sm text-gray-700'>
                  <ToolTip text='delete'>
                    <span
                      onClick={() => openModal(item.id)}
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

NoticeTable.propTypes = {
  data: PropTypes.array.isRequired, // data prop is required and must be an array
  refetchData: PropTypes.func.isRequired, // refetchData prop is required and must be a function
};

export default NoticeTable;
