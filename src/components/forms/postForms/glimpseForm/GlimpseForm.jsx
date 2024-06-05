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
import { zodResolver } from "@hookform/resolvers/zod";
import glimpseSchema from "../../../../zodSchema/glimpseSchema/GlimpseSchema";

const GlimpseForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: defaultData?.image || "",
      eventId: defaultData?.eventId || "",
    },
    resolver: zodResolver(glimpseSchema),
  });

  const navigate = useNavigate();

  const { data, isLoading } = useFetchData({
    endpoint: "events",
  });
  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    console.log(data, ": thjis is form data");
    formData.append("eventId", data?.eventId);
    formData.append("image", data?.image[0]);
    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, "glimpses", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(formData, "glimpses");
        toast.success("Data added successfully!");
      }
      navigate("/glimpses");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-2 gap-5 mb-2'>
        <CustomInputField
          label=' Image:'
          type='file'
          name='image'
          error={errors?.image?.message}
          control={control}
          onChange={(e) => setValue("image", e.target.files)}
        />
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
            <option value=''> select event </option>
            {data?.map((option) => (
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
        {defaultData?.image && (
          <div className='w-40 mb-5'>
            <img
              className='w-full h-full object-cover'
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                defaultData?.image
              }`}
              alt='Images'
            />
          </div>
        )}
      </div>
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/glimpses'
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

GlimpseForm.propTypes = {
  defaultData: PropTypes.shape({
    image: PropTypes.string,
    eventId: PropTypes.number,
    id: PropTypes.string,
  }),
};

export default GlimpseForm;
