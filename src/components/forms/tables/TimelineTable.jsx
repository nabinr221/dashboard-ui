import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import ToolTip from '../tooltip/ToolTip';
import Modal from '../../models/Model';
import { toast } from 'react-toastify';
import useDataDeletion from '../../../hooks/useDataDeletion/usedDataDeletion';
import TableContainer from '../../container/TableContainer';
import { formatDate } from '../../../utility/dateFormate/formateDate';
import { Link } from 'react-router-dom';

const TimelineTable = ({ data, refetchData }) => {
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/timelines`;
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
      toast.success('Data deleted successfully!');
      refetchData();
      closeModal();
    });
  };

  return (
    <>
      <TableContainer>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 capitalize font-bold ">
            <tr>
              <th
                scope="col"
                className="px-4 py-3.5 text-left text-sm  text-gray-700"
              >
                <span>SN</span>
              </th>
              <th
                scope="col"
                className="px-12 py-3.5 text-left text-sm text-gray-700"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-12 py-3.5 text-left text-sm  text-gray-700"
              >
                Title
              </th>

              <th
                scope="col"
                className="px-4 py-3.5 text-left text-sm  text-gray-700"
              >
                description
              </th>

              <th
                scope="col"
                className="px-4 py-3.5 text-left text-sm text-gray-700"
              >
                Starting Date
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-left text-sm text-gray-700"
              >
                End Date
              </th>

              <th scope="col" className="relative px-4 py-3.5">
                <span className="">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.map((timeline, index) => (
              <tr key={index}>
                <td className="whitespace-wrap font-bold px-4 py-4 text-sm text-gray-700">
                  <div className="text-sm text-gray-700">{index + 1}</div>
                </td>
                <td className="whitespace-wrap px-4 py-4">
                  <div className="flex items-center justify-center">
                    <div className="h-16 w-16 flex-shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                          timeline?.image
                        }`}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="whitespace-wrap px-4 py-4">
                  <div className="text-sm font-medium text-black capitalize">
                    {timeline?.title}
                  </div>
                </td>
                <td className="whitespace-wrap px-4 py-4 text-sm text-gray-700 ">
                  <div className="text-sm line-clamp-3 overflow-hidden text-gray-700">
                    {timeline?.description}
                  </div>
                </td>

                <td className="whitespace-wrap px-4 py-4 text-sm text-gray-700">
                  <div className="text-sm text-gray-700">
                    {formatDate(timeline?.startingDate)}{' '}
                  </div>
                </td>
                <td className="whitespace-wrap px-4 py-4 text-sm text-gray-700">
                  <div className="text-sm text-gray-700">
                    {formatDate(timeline?.endDate)}
                  </div>
                </td>

                <td className="whitespace-wrap px-12 py-4 flex items-center justify-center gap-3">
                  <div className="text-sm text-gray-900 ">
                    <ToolTip text="edit">
                      <Link to={`/timelines/edit/${timeline?._id}`}>
                        <span className="flex items-center gap-2 rounded-full bg-blue-500 p-3 text-white">
                          <Pencil className="h-4 w-4  " aria-hidden="true" />
                        </span>
                      </Link>
                    </ToolTip>
                  </div>
                  <div className="text-sm text-gray-700">
                    <ToolTip text="delete">
                      <span
                        onClick={() => openModal(timeline?._id)}
                        className="flex items-center gap-2 rounded-full bg-orange-500 p-3 text-white"
                      >
                        <Trash2 className="h-4 w-4  " aria-hidden="true" />
                      </span>{' '}
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
            className=" p-4 w-fit bg-indigo-600  text-white font-bold text-sm "
          >
            Cancle
          </button>
          <button
            onClick={() => handleDelete(deleteItemId)}
            className=" p-4 w-fit bg-orange-600 text-white font-bold text-sm "
          >
            Delete
          </button>
        </Modal>
      </TableContainer>
    </>
  );
};

export default TimelineTable;
