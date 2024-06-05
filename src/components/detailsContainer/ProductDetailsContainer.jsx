import CustomLink from "../forms/customLink/CustomLink";
import { formateDate } from "../../utility/dateFormate/formateDate";
import { Link } from "react-router-dom";

const ProductDetailsContainer = ({ data, refetchData }) => {
  console.log(data, ": thjis is form data");
  return (
    <div className='bg-white p-2 px-5 space-y-5'>
      <h1 className='text-xl font-semibold my-5'>Prodcut Detail Page</h1>
      <div className=' px-3 space-y-5'>
        {data?.thumbnail && (
          <div className='w-[100%]  sm:w-[15rem]  '>
            <img
              className='w-full h-full object-cover'
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                data?.thumbnail
              }`}
              alt=''
            />
          </div>
        )}
        {data?.name && (
          <>
            <div className='w-full   '>
              <h1 className='text-xl font-semibold'>Tatle: </h1>
              <h1 className='text-xl capitalize mt-2 ms-2'>{data?.name}</h1>
            </div>
            <div className='border-b-2'></div>
          </>
        )}
        {data?.price && (
          <>
            <div>
              <h1 className='text-xl font-semibold capitalize'>price:</h1>
              <p className='mt-2 ms-2 font-semibold'>
                <span className='me-2 '>Rs:</span>
                {data?.price}
              </p>
            </div>
            <div className='border-b-2'></div>
          </>
        )}{" "}
        {data?.description && (
          <>
            <div>
              <h1 className='text-xl font-semibold'>Description:</h1>
              <p className='mt-2 ms-2'>{data?.description}</p>
            </div>
            <div className='border-b-2'></div>
          </>
        )}{" "}
        <div className='grid grid-cols-1  space-y-5 sm:grid-cols-3'>
          {data?.category && (
            <div>
              <h1 className='text-xl font-semibold capitalize'>category:</h1>
              <p className='mt-2 ms-2 capitalize'>{data?.category?.name}</p>
            </div>
          )}
          {data?.color && (
            <div>
              <h1 className='text-xl font-semibold capitalize'>color:</h1>
              <p className='mt-2 ms-2 capitalize'>{data?.color?.name}</p>
            </div>
          )}
          {data?.size && (
            <div>
              <h1 className='text-xl font-semibold capitalize'>address:</h1>
              <p className='mt-2 ms-2'>{data?.size}</p>
            </div>
          )}
        </div>
      </div>
      <CustomLink path='/products' btnTitle='Go Back' />
    </div>
  );
};

export default ProductDetailsContainer;
