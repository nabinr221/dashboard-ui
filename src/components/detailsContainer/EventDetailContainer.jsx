import parse from "html-react-parser";
import CustomLink from "../forms/customLink/CustomLink";
import { formateDate } from "../../utility/dateFormate/formateDate";
import { Link } from "react-router-dom";

const EvetnDetailContainer = ({ data, refetchData }) => {
  console.log(data, ": thjis is form data");
  return (
    <div className='bg-white p-2 px-5 space-y-5'>
      <h1 className='text-xl font-semibold my-5'>About Detail Page</h1>
      <div className=' px-3 space-y-5'>
        <div className='grid grid-clos-1 sm:grid-cols-2 items-center'>
          {data?.image && (
            <div className='w-[100%]  sm:w-[15rem]  '>
              <img
                className='w-full h-full object-cover'
                src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                  data?.image
                }`}
                alt=''
              />
            </div>
          )}
          {data?.report && (
            <div className='w-fit h-fit px-10 py-2 bg-orange-400 text-white font-semibold transition-all duration-300 hover:bg-orange-600 '>
              <Link
                target='_blank'
                to={`${import.meta.env.VITE_APP_BASE_URL}/uploads/documents/${
                  data?.report
                }`}
              >
                Reports
              </Link>
            </div>
          )}
        </div>
        {data?.title && (
          <>
            <div className='w-full   '>
              <h1 className='text-xl font-semibold'>Tatle: </h1>
              <h1 className='text-xl capitalize mt-2 ms-2'>{data?.title}</h1>
            </div>
            <div className='border-b-2'></div>
          </>
        )}
        {data?.description && (
          <>
            <div>
              <h1 className='text-xl font-semibold'>Description:</h1>
              <p className='mt-2 ms-2'>{data?.description}</p>
            </div>
            <div className='border-b-2'></div>
          </>
        )}
        <>
          <div className='grid grid-cols-1  space-y-5 sm:grid-cols-3'>
            {data?.date && (
              <div>
                <h1 className='text-xl font-semibold capitalize'>Date:</h1>
                <p className='mt-2 ms-2'>{formateDate(data?.date)}</p>
              </div>
            )}
            <div>
              <h1 className='text-xl font-semibold capitalize'>address:</h1>
              <p className='mt-2 ms-2'>{data?.address}</p>
            </div>
            <div>
              <h1 className='text-xl font-semibold capitalize'>venue:</h1>
              <p className='mt-2 ms-2'>{data?.location}</p>
            </div>
          </div>
          <div className='border-b-2'></div>
        </>

        {data?.status && (
          <>
            <div>
              <h1 className='text-xl font-semibold capitalize'>status:</h1>
              <p className='mt-2 ms-2 capitalize'>{data?.status}</p>
            </div>
            <div className='border-b-2'></div>
          </>
        )}
        {data?.member.length > 0 && (
          <>
            <div>
              <h1 className='text-xl font-semibold capitalize'>
                News Apperance:
              </h1>

              <div className='flex flex-wrap  gap-2'>
                {data?.member?.map((item, index) => (
                  <p className='mt-2 ms-2 capitalize border-2 p-2' key={index}>
                    <span>{index + 1}:</span> {item.name}
                  </p>
                ))}
              </div>
            </div>
            <div className='border-b-2'></div>
          </>
        )}
        {data?.newsApperance.length > 0 && (
          <>
            <div>
              <h1 className='text-xl font-semibold capitalize'>
                News Apperance:
              </h1>

              <div className='flex flex-wrap  gap-2'>
                {data?.newsApperance?.map((item, index) => (
                  <p
                    className='w-fit mt-2 ms-2 capitalize border-2 p-2'
                    key={index}
                  >
                    <span className='me-2'>{index + 1})</span>
                    {item.title}
                  </p>
                ))}
              </div>
            </div>
            <div className='border-b-2'></div>
          </>
        )}
        {data?.glimpse.length > 0 && (
          <>
            <h1 className='text-xl font-semibold capitalize'>Glimpse:</h1>
            <div className='flex flex-wrap gap-3'>
              {data?.glimpse?.map((item, index) => (
                <div className='w-full sm:w-40' key={index}>
                  <img
                    className='w-full h-full object-cover'
                    src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                      data?.image
                    }`}
                    alt=''
                  />
                </div>
              ))}
            </div>
            <div className='border-b-2'></div>
          </>
        )}
        {data?.sponsor.length > 0 && (
          <>
            <h1 className='text-xl font-semibold capitalize'>Glimpse:</h1>
            <div className='flex flex-wrap'>
              {data?.sponsor?.map((item, index) => (
                <div className='w-40' key={index}>
                  <img
                    className='w-full h-full object-cover'
                    src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                      data?.logo
                    }`}
                    alt=''
                  />
                </div>
              ))}
            </div>
            <div className='border-b-2'></div>
          </>
        )}
        {data?.sponsor.length > 0 && (
          <>
            <h1 className='text-xl font-semibold capitalize'>Glimpse:</h1>
            <div className='flex flex-wrap'>
              {data?.sponsor?.map((item, index) => (
                <div className='w-40' key={index}>
                  <img
                    className='w-full h-full object-cover'
                    src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                      data?.logo
                    }`}
                    alt=''
                  />
                </div>
              ))}
            </div>
            <div className='border-b-2'></div>
          </>
        )}
      </div>
      <CustomLink path='/abouts' btnTitle='Go Back' />
    </div>
  );
};

export default EvetnDetailContainer;
