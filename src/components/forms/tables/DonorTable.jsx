import { useState } from "react";
import PropTypes from "prop-types";
import { Trash2, Pencil, Facebook, Mail, Linkedin } from "lucide-react";
import ToolTip from "../tooltip/ToolTip";
import TableContainer from "../../container/TableContainer";
import Modal from "../../models/Model";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useDataDeletion from "../../../hooks/useDataDeletion/usedDataDeletion";
import Pagination from "../pagination/Pagination";

const DonorTable = ({ data, refetchData }) => {
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/donors`;
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
    try {
      await deleteData(`${apiUrl}/${deleteItemId}`);
      toast.success("Data deleted successfully!");
      refetchData();
      closeModal();
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Failed to delete data");
    }
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
              className='px-4 py-3.5 text-left text-sm text-gray-700'
            >
              <span>SN</span>
            </th>
            <th
              scope='col'
              className='px-12 py-3.5 text-left text-sm text-gray-700'
            >
              image
            </th>
            <th
              scope='col'
              className='px-12 py-3.5 text-left text-sm text-gray-700'
            >
              Donar Name
            </th>
            <th
              scope='col'
              className='w-[100rem] px-12 py-3.5 text-left text-sm text-gray-700'
            >
              Description
            </th>
            <th
              scope='col'
              className='px-12 py-3.5 text-left text-sm text-gray-700'
            >
              Category
            </th>
            <th
              scope='col'
              className='w-[100px] px-12 py-3.5 text-left text-sm text-gray-700'
            >
              Social Media
            </th>
            <th scope='col' className='relative px-4 py-3.5'>
              <span className=''>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {newData.map((donar, index) => (
            <tr key={index}>
              <td className='whitespace-wrap font-bold px-4 py-4 text-sm text-gray-700'>
                <div className='text-sm text-gray-700'>{index + 1}</div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='flex items-center pl-4'>
                  <div className='h-16 w-16 flex-shrink-0'>
                    <img
                      className='h-full w-full object-cover'
                      src={`${
                        import.meta.env.VITE_APP_BASE_URL
                      }/uploads/images/${donar?.image}`}
                      alt=''
                    />
                  </div>
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize'>
                  {donar?.name}
                </div>
              </td>
              <td className='w-[90rem] whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize'>
                  {donar?.description}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize'>
                  {donar?.category}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black flex flex-col  gap-y-2'>
                  {donar.email && (
                    <span className='flex gap-2 items-center justify-start'>
                      <Mail className='w-5 h-5 text-blue-800' />
                      {donar.email}
                    </span>
                  )}
                  {donar.facebook && (
                    <span className='flex gap-2 items-center justify-start'>
                      <Facebook className='w-5 h-5 text-blue-800' />
                      {donar.facebook}
                    </span>
                  )}
                  {donar.linkedin && (
                    <span className='flex gap-2 items-center justify-start'>
                      <Linkedin className='w-5 h-5 text-blue-800' />
                      {donar.linkedin}
                    </span>
                  )}
                </div>
              </td>
              <td className='whitespace-wrap px-12 py-4 flex items-center justify-center gap-3'>
                <div className='text-sm text-gray-900'>
                  <ToolTip text='edit'>
                    <Link to={`/donors/edit/${donar.id}`}>
                      <span className='flex items-center gap-2 rounded-full bg-blue-500 p-2 text-white'>
                        <Pencil className='h-4 w-4' aria-hidden='true' />
                      </span>
                    </Link>
                  </ToolTip>
                </div>
                <div className='text-sm text-gray-700'>
                  <ToolTip text='delete'>
                    <span
                      onClick={() => openModal(donar.id)}
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
          className='p-4 w-fit bg-indigo-600 text-white font-bold text-sm'
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className='p-4 w-fit bg-orange-600 text-white font-bold text-sm'
        >
          Delete
        </button>
      </Modal>
    </TableContainer>
  );
};

const IconForSocialMedia = ({ socialMedia }) => {
  switch (socialMedia) {
    case "facebook":
      return <Facebook className='w-5 h-5 text-blue-800' />;
    case "email":
      return <Mail className='w-5 h-5 text-blue-800' />;
    case "linkedin":
      return <Linkedin className='w-5 h-5 text-blue-800' />;
    default:
      return null;
  }
};

DonorTable.propTypes = {
  data: PropTypes.array.isRequired,
  refetchData: PropTypes.func.isRequired,
};

IconForSocialMedia.propTypes = {
  socialMedia: PropTypes.string.isRequired,
};

export default DonorTable;
