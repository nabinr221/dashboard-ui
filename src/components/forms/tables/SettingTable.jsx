import ToolTip from "../tooltip/ToolTip";
import { Trash2, Pencil, Mail, Facebook, Linkedin } from "lucide-react";
import TableContainer from "../../container/TableContainer";
import Modal from "../../models/Model";
import { toast } from "react-toastify";
import useDataDeletion from "../../../hooks/useDataDeletion/usedDataDeletion";
import { Link } from "react-router-dom";
import { useState } from "react";

const SettingTable = ({ data, refetchData }) => {
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/settings`;

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

            <th scope='col' className='px-4 py-3.5  text-sm  text-gray-700'>
              Logo
            </th>
            <th
              scope='col'
              className='w-[30%] px-5 py-3.5 text-left text-sm  text-gray-700'
            >
              Name
            </th>

            <th
              scope='col'
              className='w-[15%] px-5 py-3.5 text-left text-sm  text-gray-700'
            >
              address
            </th>
            <th
              scope='col'
              className=' px-5 py-3.5 text-left text-sm  text-gray-700'
            >
              phone
            </th>
            <th
              scope='col'
              className='w-fit px-2 py-3.5 text-left text-sm  text-gray-700'
            >
              social media
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
                <div className='flex items-center pl-4 '>
                  <div className='h-20 w-20  flex-shrink-0'>
                    <Link to={`/settings/details/${item?.id}`}>
                      <img
                        className='h-full w-full object-contain object-center'
                        src={`${
                          import.meta.env.VITE_APP_BASE_URL
                        }/uploads/images/${item?.logo}`}
                        alt=''
                      />
                    </Link>
                  </div>
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-semibold  capitalize line-clamp-3 overflow-hidden '>
                  <Link to={`/settings/details/${item?.id}`}>{item?.name}</Link>
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize'>
                  {item?.address}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize line-clamp-3 overflow-hidden  '>
                  {item?.phone}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black line-clamp-3 overflow-hidden  '>
                  <ul className='space-y-2'>
                    <li className='flex items-center gap-1'>
                      <span>
                        <Mail className='w-4 h-4' />
                      </span>
                      {item?.email}
                    </li>
                    <li className='flex items-center gap-1'>
                      <span>
                        <Facebook className='w-5 h-5 text-blue-900' />
                      </span>
                      {item?.facebook}
                    </li>
                    <li className='flex items-center gap-1'>
                      <span>
                        <Linkedin className='w-5 h-5 text-blue-900' />
                      </span>
                      {item?.linkedin}
                    </li>
                  </ul>
                </div>
              </td>

              <td className='whitespace-wrap px-12 w-full py-6 flex items-center justify-center gap-3'>
                <div className='text-sm text-gray-900 '>
                  <ToolTip text='edit'>
                    <Link to={`/settings/edit/${item.id}`}>
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

export default SettingTable;
