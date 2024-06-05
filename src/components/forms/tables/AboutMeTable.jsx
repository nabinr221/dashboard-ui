import TableContainer from "../../container/TableContainer";
import ToolTip from "../tooltip/ToolTip";
import { Pencil, Trash2 } from "lucide-react";
import Modal from "../../models/Model";
import { toast } from "react-toastify";
import useDataDeletion from "../../../hooks/useDataDeletion/usedDataDeletion";
import { useState } from "react";
import { Link } from "react-router-dom";

const AboutMeTable = ({ data, refetchData }) => {
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/abouts`;
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
      <table className=' w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50 '>
          <tr>
            <th
              scope='col'
              className='capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>s.n.</span>
            </th>

            <th
              scope='col'
              className='w-[20rem] capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>Title</span>
            </th>
            <th
              scope='col'
              className='capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>Description</span>
            </th>

            <th
              scope='col'
              className='capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>Establish Date</span>
            </th>
            <th
              scope='col'
              className='capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>Project</span>
            </th>
            <th
              scope='col'
              className='capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>Impact</span>
            </th>
            <th
              scope='col'
              className='capitalize px-4 py-3.5  text-sm font-bold text-gray-700'
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {data?.map((about, index) => (
            <tr key={index}>
              <td className='whitespace-nowrap px-5 py-4'>
                <div className='text-sm font-bold text-gray-900 '>
                  {index + 1}
                </div>
              </td>

              <td className='whitespace-wrap px-5 py-4'>
                <div className='capitalize font-semibold line-clamp-1 md:line-clamp-3 text-sm w-[100%] text-gray-900 browser-css'>
                  <Link to={`/abouts/details/${about?.id}`}>
                    {about?.title}
                  </Link>
                </div>
              </td>
              <td className='whitespace-wrap px-5 py-4'>
                <div className='text-sm w-[100%] text-gray-900 line-clamp-4 browser-css'>
                  {about?.description}
                </div>
              </td>
              <td className='whitespace-wrap px-5 py-4'>
                <div className='text-sm w-[100%] text-gray-900 line-clamp-4 browser-css'>
                  {about?.establishedDate}
                </div>
              </td>
              <td className='whitespace-wrap px-5 py-4'>
                <div className='text-sm w-[100%] text-gray-900 line-clamp-4 browser-css'>
                  {about?.project}
                </div>
              </td>
              <td className='whitespace-wrap px-5 py-4'>
                <div className='text-sm w-[100%] text-gray-900 line-clamp-4 browser-css'>
                  {about?.impacted}
                </div>
              </td>

              <td className='whitespace-wrap px-12 py-5 flex items-center justify-center gap-3'>
                <div className='text-sm text-gray-900 '>
                  <ToolTip text='edit'>
                    <Link to={`/abouts/edit/${about.id}`}>
                      <span className='flex items-center gap-2 rounded-full bg-blue-500 p-2 text-white'>
                        <Pencil className='h-4 w-4  ' aria-hidden='true' />
                      </span>
                    </Link>
                  </ToolTip>
                </div>
                <div className='text-sm text-gray-700'>
                  <ToolTip text='delete'>
                    <span
                      onClick={() => openModal(about.id)}
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

export default AboutMeTable;
