import { useState } from "react";
import ToolTip from "../tooltip/ToolTip";
import { Trash2, Pencil } from "lucide-react";
import TableContainer from "../../container/TableContainer";
import Modal from "../../models/Model";
import { toast } from "react-toastify";
import useDataDeletion from "../../../hooks/useDataDeletion/usedDataDeletion";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import PropTypes from "prop-types";

const ContactTable = ({ data, refetchData }) => {
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/contacts`;

  const { deleteData } = useDataDeletion();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;

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
              className='w-[20%] px-12 py-3.5 text-left text-sm  text-gray-700'
            >
              full Name
            </th>

            <th
              scope='col'
              className='px-12 py-3.5 text-left text-sm  text-gray-700'
            >
              email
            </th>
            <th
              scope='col'
              className='px-12 py-3.5 text-left text-sm  text-gray-700'
            >
              subject{" "}
            </th>
            <th
              scope='col'
              className='px-12 py-3.5 text-left text-sm  text-gray-700'
            >
              message{" "}
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
                <div className='text-sm font-medium text-black capitalize'>
                  <span>
                    {item?.firstName}
                    {item?.lastName}
                  </span>
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black lowercase '>
                  {item?.email}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize'>
                  {item?.subject}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black  text-justify line-clamp-3 md:line-clamp-6'>
                  {item?.message} sadfasf sdfa asdf asdf asdf asdf sadfasf sdfa
                  asdf asdf asdf asdf sadfasf sdfa asdf asdf asdf asdf sadfasf
                  sdfa asdf asdf asdf asdf sdfa asdf asdf asdf asdf sdfa asdf
                  sdfa asdf asdf asdf asdf sdfa asdf asdf asdf asdf asdf asdf
                  sdfa asdf asdf asdf asdf sdfa asdf asdf asdf asdf sdfa asdf
                  sdfa asdf asdf asdf asdf sdfa asdf asdf asdf asdf asdf asdf
                  sdfa asdf asdf asdf asdf sdfa asdf asdf asdf asdf sdfa asdf
                  asdf asdf asdf asdf asdf
                </div>
              </td>

              <td className='whitespace-wrap px-12 py-4 flex items-center justify-center gap-3'>
                {/* <div className='text-sm text-gray-900 '>
                  <ToolTip text='edit'>
                    <Link to={`/contacts-info/edit/${item.id}`}>
                      <span className='flex items-center gap-2 rounded-full bg-blue-500 p-2 text-white'>
                        <Pencil className='h-4 w-4  ' aria-hidden='true' />
                      </span>
                    </Link>
                  </ToolTip>
                </div> */}
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
ContactTable.propTypes = {
  data: PropTypes.array.isRequired,
  refetchData: PropTypes.func.isRequired,
};
export default ContactTable;
