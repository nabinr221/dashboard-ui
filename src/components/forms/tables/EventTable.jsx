import { useState } from "react";
import { Link } from "react-router-dom";
import TableContainer from "../../container/TableContainer";
import ToolTip from "../tooltip/ToolTip";
import Modal from "../../models/Model";
// import { formateDate } from "../../../utility/dateFormate/formateDate.js";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";

import useDataDeletion from "../../../hooks/useDataDeletion/usedDataDeletion";
import { formateDate } from "../../../utility/dateFormate/formateDate";

const EventTable = ({ data, refetchData }) => {
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/events`;
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
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>s.n.</span>
            </th>

            <th
              scope='col'
              className=' capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>Image</span>
            </th>

            <th
              scope='col'
              className='w-[15rem] capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
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
              <span>Event Date</span>
            </th>
            <th
              scope='col'
              className='capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>address</span>
            </th>
            <th
              scope='col'
              className='capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>Venue</span>
            </th>
            {/* <th
              scope='col'
              className='capitalize px-4 py-3.5 text-left text-sm font-bold text-gray-700'
            >
              <span>report</span>
            </th> */}
            <th
              scope='col'
              className='capitalize px-4 py-3.5  text-sm font-bold text-gray-700'
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {data?.map((event, index) => (
            <tr key={index}>
              <td className='whitespace-nowrap px-5 py-4'>
                <div className='text-sm font-bold text-gray-900 '>
                  {index + 1}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='flex items-center pl-4 '>
                  <div className='h-20 w-20  flex-shrink-0'>
                    <Link to={`/events/details/${event?.id}`}>
                      <img
                        className='h-full w-full object-contain object-center'
                        src={`${
                          import.meta.env.VITE_APP_BASE_URL
                        }/uploads/images/${event?.image}`}
                        alt=''
                      />
                    </Link>
                  </div>
                </div>
              </td>

              <td className='whitespace-wrap px-5 py-4'>
                <div className='capitalize font-semibold line-clamp-1 md:line-clamp-3 text-sm w-[100%] text-gray-900 browser-css'>
                  <Link to={`/events/details/${event?.id}`}>{event?.title}</Link>
                </div>
              </td>
              <td className='whitespace-wrap px-5 py-4'>
                <div className='text-sm w-[100%] text-gray-900 line-clamp-4 browser-css'>
                  {event?.description}
                </div>
              </td>
              <td className='whitespace-wrap px-5 py-4'>
                <div className='text-sm w-[100%] text-gray-900 line-clamp-4 browser-css'>
                  {formateDate(event?.date)}
                </div>
              </td>
              <td className='whitespace-wrap px-5 py-4'>
                <div className='text-sm w-[100%] text-gray-900 line-clamp-4 browser-css'>
                  {event?.address}
                </div>
              </td>
              <td className='whitespace-wrap px-5 py-4'>
                <div className='text-sm w-[100%] text-gray-900 line-clamp-4 browser-css'>
                  {event?.location}
                </div>
              </td>

              <td className='whitespace-wrap px-12 py-5 flex items-center justify-center gap-3'>
                <div className='text-sm text-gray-900 '>
                  <ToolTip text='edit'>
                    <Link to={`/events/edit/${event.id}`}>
                      <span className='flex items-center gap-2 rounded-full bg-blue-500 p-2 text-white'>
                        <Pencil className='h-4 w-4  ' aria-hidden='true' />
                      </span>
                    </Link>
                  </ToolTip>
                </div>
                <div className='text-sm text-gray-700'>
                  <ToolTip text='delete'>
                    <span
                      onClick={() => openModal(event.id)}
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

export default EventTable;
