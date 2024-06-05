import ToolTip from "../tooltip/ToolTip";
import PropTypes from "prop-types";
import { Trash2, Pencil, Mail, Facebook, Linkedin } from "lucide-react";
import TableContainer from "../../container/TableContainer";
import Modal from "../../models/Model";
import { toast } from "react-toastify";
import useDataDeletion from "../../../hooks/useDataDeletion/usedDataDeletion";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductTable = ({ data, refetchData }) => {
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/products`;

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
              className=' px-5 py-3.5 text-left text-sm  text-gray-700'
            >
              category
            </th>

            <th
              scope='col'
              className='px-2 py-3.5 text-left text-sm  text-gray-700'
            >
              price{" "}
            </th>
            <th
              scope='col'
              className=' px-2 py-3.5 text-left text-sm  text-gray-700'
            >
              colors{" "}
            </th>
            <th
              scope='col'
              className=' px-2 py-3.5 text-left text-sm  text-gray-700'
            >
              sizes{" "}
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
                      {item?.thumbnail ? (
                        <img
                          className='h-full w-full object-contain object-center'
                          src={`${
                            import.meta.env.VITE_APP_BASE_URL
                          }/uploads/images/${item?.thumbnail}`}
                          alt=''
                        />
                      ) : (
                        <img
                          className='h-full w-full object-contain object-center'
                          src='/no-image.png'
                          alt=''
                        />
                      )}
                    </Link>
                  </div>
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-semibold  capitalize line-clamp-3 overflow-hidden '>
                  <Link to={`/products/details/${item?.id}`}>{item?.name}</Link>
                </div>
              </td>

              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize line-clamp-3 overflow-hidden  '>
                  {item?.category.name}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize'>
                  {item?.price}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize line-clamp-3 overflow-hidden  '>
                  {item?.color.name}
                </div>
              </td>
              <td className='whitespace-wrap px-4 py-4'>
                <div className='text-sm font-medium text-black capitalize line-clamp-3 overflow-hidden  '>
                  {item?.size}
                </div>
              </td>

              <td className='whitespace-wrap px-12 w-full py-6 flex items-center justify-center gap-3'>
                <div className='text-sm text-gray-900 '>
                  <ToolTip text='edit'>
                    <Link to={`/products/edit/${item.id}`}>
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

ProductTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object), // Assuming data is an array of objects
  refetchData: PropTypes.func.isRequired,
};

export default ProductTable;
