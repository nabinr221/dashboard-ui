import ToolTip from "../tooltip/ToolTip";
import PropTypes from "prop-types";
import TableContainer from "../../container/TableContainer";
import useDataDeletion from "../../../hooks/useDataDeletion/usedDataDeletion";
import Modal from "../../models/Model";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formateDate } from "../../../utility/dateFormate/formateDate";

const ProjectDonationsTable = ({ data, refetchData }) => {
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/project-donations`;

  const { deleteData } = useDataDeletion();
  const [deleteItemId, setDeleteItemId] = useState(null);

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

  return (
    <TableContainer>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50 capitalize font-bold '>
          <tr>
            <th
              scope='col'
              className='w-fit px-4 py-3.5 text-left text-sm  text-gray-700'
            >
              <span>SN</span>
            </th>

            <th
              scope='col'
              className='w-[20%] px-5 py-3.5 text-left text-sm  text-gray-700'
            >
              Project
            </th>

            <th
              scope='col'
              className=' px-5 py-3.5 text-left text-sm  text-gray-700'
            >
              donor{" "}
            </th>

            <th
              scope='col'
              className='px-2 py-3.5 text-left text-sm  text-gray-700'
            >
              donation Amount{" "}
            </th>
            <th
              scope='col'
              className=' px-2 py-3.5 text-left text-sm  text-gray-700'
            >
              donate date
            </th>

            <th scope='col' className='text-gray-700 px-4 py-3.5'>
              <span className=''>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {data?.map((item, index) => (
            <tr key={index}>
              <td className='whitespace-wrap font-bold px-4 py-4 text-sm text-gray-700'>
                <div className='text-sm text-gray-700'>{index + 1}</div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-semibold  capitalize line-clamp-3 overflow-hidden '>
                  {item?.project?.title}{" "}
                </div>
              </td>

              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize line-clamp-3 overflow-hidden  '>
                  {item?.donor?.name}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize'>
                  Rs: {item?.donationAmount}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize line-clamp-3 overflow-hidden  '>
                  {formateDate(item?.donationDate)}
                </div>
              </td>

              <td className='whitespace-wrap px-12 w-full py-6 flex items-center justify-center gap-3'>
                <div className='text-sm text-gray-900 '>
                  <ToolTip text='edit'>
                    <Link to={`/project-donations/edit/${item.id}`}>
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

ProjectDonationsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object), // Assuming data is an array of objects
  refetchData: PropTypes.func.isRequired,
};

export default ProjectDonationsTable;
