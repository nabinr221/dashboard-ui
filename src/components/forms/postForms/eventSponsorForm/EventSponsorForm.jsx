import { useForm } from "react-hook-form";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import CustomLink from "../../customLink/CustomLink";
import PropTypes from "prop-types";
import { useFetchData } from "../../../../hooks/useFetchData/useFetchData";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSponsorSchema } from "../../../../zodSchema/eventSponsorSchema/eventSponsorSchema";

const EventSponsorForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      sponsorId: defaultData?.sponsorId || "",
      eventId: defaultData?.eventId || "",
    },
    resolver: zodResolver(eventSponsorSchema),
  });

  const navigate = useNavigate();
  const { data: sponsors, isLoading: isProductCatLoading } = useFetchData({
    endpoint: "sponsors",
  });
  const { data: events, isLoading: isColorsLoading } = useFetchData({
    endpoint: "events",
  });
  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();
  //   const category = ["event", "coordinator", "member"];

  if (isProductCatLoading || isColorsLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    try {
      if (defaultData) {
        // Editing existing data
        await editData(data, "event-sponsors", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(data, "event-sponsors");
        toast.success("Data added successfully!");
      }
      navigate("/event-sponsors");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-2 gap-5 mb-2'>
        <div className='w-full'>
          <label
            htmlFor='memberId'
            className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            sponsor
          </label>

          <select
            id='sponsorId'
            name='sponsorId'
            {...register("sponsorId")}
            className={`capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500 `}
          >
            <option value=''> select Members </option>
            {sponsors?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          {errors?.memberId?.message && (
            <span className='text-red-500 text-base'>
              {errors?.memberId?.message}
            </span>
          )}
        </div>
        <div className='w-full'>
          <label
            htmlFor='eventId'
            className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            events
          </label>

          <select
            id='eventId'
            name='eventId'
            {...register("eventId")}
            className={`capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500 `}
          >
            <option value=''> select events </option>
            {events?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.title}
              </option>
            ))}
          </select>

          {errors?.eventId?.message && (
            <span className='text-red-500 text-base'>
              {errors?.eventId?.message}
            </span>
          )}
        </div>
      </div>

      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/event-sponsors'
          btnTitle='Back'
          className='w-full text-center '
        />
        <CustomButton type='submit' disabled={isAdding || isEditing}>
          {isAdding || isEditing ? "Processing..." : "Submit"}
        </CustomButton>
      </div>
      {(addError || editError) && (
        <p className='text-red-500 mt-2'>{addError || editError}</p>
      )}
    </form>
  );
};

EventSponsorForm.propTypes = {
  defaultData: PropTypes.shape({
    sponsorId: PropTypes.string,
    eventId: PropTypes.string,

    id: PropTypes.string,
  }),
};

export default EventSponsorForm;
