import parse from "html-react-parser";
import { formateDate } from "../../utility/dateFormate/formateDate";
import CustomLink from "../forms/customLink/CustomLink";

const AboutMeDetailContainer = ({ data, refetchData }) => {
  console.log(data, ": thjis is form data");
  return (
    <div className='bg-white p-2 px-5 space-y-5'>
      <h1 className='text-xl font-semibold my-5'>About Detail Page</h1>
      <div className=' px-3 space-y-5'>
        {data?.title && (
          <div className='w-full   '>
            <h1 className='text-xl font-semibold'>Tatle: </h1>
            <h1 className='text-xl capitalize mt-2 ms-2'>{data?.title}</h1>
          </div>
        )}
        <div className='border-b-2'></div>
        {data?.description && (
          <div>
            <h1 className='text-xl font-semibold'>Description:</h1>
            <p className='mt-2 ms-2'>{parse(data?.description)}</p>
          </div>
        )}
        <div className='border-b-2'></div>
        {data?.establishedDate && (
          <div>
            <h1 className='text-xl font-semibold'>Established Date:</h1>
            <p className='mt-2 ms-2'>{formateDate(data?.establishedDate)}</p>
          </div>
        )}
        <div className='border-b-2'></div>
        <div>
          <h1 className='text-xl font-semibold'>Impact:</h1>
          <p className='mt-2 ms-2'>{data?.impacted}</p>
        </div>
        <div className='border-b-2'></div>
        {data?.porjects && (
          <div>
            <h1 className='text-xl font-semibold'>porjects:</h1>
            <p className='mt-2 ms-2'>{data?.porjects}</p>
          </div>
        )}
      </div>
      <CustomLink path='/abouts' btnTitle='Go Back' />
    </div>
  );
};

export default AboutMeDetailContainer;
