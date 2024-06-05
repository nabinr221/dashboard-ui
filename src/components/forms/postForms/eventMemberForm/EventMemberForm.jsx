import { useForm } from "react-hook-form";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import CustomLink from "../../customLink/CustomLink";
import PropTypes from "prop-types";
import { useFetchData } from "../../../../hooks/useFetchData/useFetchData";
import SelectField from "../../selectField/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventMemberSchema } from "../../../../zodSchema/eventMemberSchema/eventMemberSchema";

const EventMemberForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      memberId: defaultData?.memberId || "",
      eventId: defaultData?.eventId || "",
      position: defaultData?.position || "",
      category: defaultData?.category || "",
    },
    resolver: zodResolver(eventMemberSchema),
  });

  const navigate = useNavigate();
  const { data: members, isLoading: isProductCatLoading } = useFetchData({
    endpoint: "members",
  });
  const { data: events, isLoading: isColorsLoading } = useFetchData({
    endpoint: "events",
  });
  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();
  const category = ["event", "coordinator", "member"];

  if (isProductCatLoading || isColorsLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    console.log(data, "this is data");
    // const formData = new FormData();
    // console.log(data, ": thjis is form data");
    // formData.append("position", data?.position);
    // formData.append("category", data?.category);
    // formData.append("memberId", data?.memberId);
    // formData.append("eventId", data?.eventId);
    try {
      if (defaultData) {
        // Editing existing data
        await editData(data, "event-members", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(data, "event-members");
        toast.success("Data added successfully!");
      }
      navigate("/event-members");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-3 gap-5 mb-2'>
        <div className='w-full'>
          <label
            htmlFor='memberId'
            className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Member
          </label>

          <select
            id='memberId'
            name='memberId'
            {...register("memberId")}
            className={`capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500 `}
          >
            <option value=''> select Members </option>
            {members?.map((option) => (
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
        <SelectField
          options={category}
          {...register("category")}
          error={errors?.category?.message}
          label='category:'
        />
      </div>
      <CustomInputField
        label='position:'
        type='text'
        name='position'
        error={errors?.position?.message}
        {...register("position")}
      />
      {/* <CustomInputField
        label='category:'
        type='text'
        name='category'
        error={errors?.category?.message}
        {...register("category")}
      /> */}

      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/event-members'
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

EventMemberForm.propTypes = {
  defaultData: PropTypes.shape({
    memberId: PropTypes.string,
    eventId: PropTypes.string,
    position: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default EventMemberForm;
