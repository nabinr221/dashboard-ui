import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import CustomLink from "../../customLink/CustomLink";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import SelectField from "../../selectField/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";

import EventSchema from "../../../../zodSchema/eventSchema/eventSchema";

const EventForm = ({ defaultData }) => {
  const navigate = useNavigate();

  console.log(defaultData, "thios is asdfsa");
  const dateString = defaultData?.date ? defaultData?.date : "";
  const [datePart] = dateString.split("T");
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultData?.title || "",
      description: defaultData?.description || "",
      address: defaultData?.address || "",
      location: defaultData?.location || "",
      date: datePart || "",
      status: defaultData?.status || "",
      report: defaultData?.report || "",
      image: defaultData?.image || "",
    },
    resolver: zodResolver(EventSchema),
  });

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data.image, data.report, "this is file data");
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("location", data?.location);
    formData.append("date", data?.date);
    formData.append("status", data?.status);
    if (data.report && data.report.length > 0) {
      formData.append("report", data.report[0]);
    }
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      if (defaultData) {
        await editData(formData, "events", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        await addData(formData, "events");
        toast.success("Data added successfully!");
      }
      navigate("/events");
    } catch (error) {
      console.error("Error adding data:", error);
      toast.error("Failed to add data");
    }
  };

  const status = ["past", "upcoming"];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='title:'
        type='text'
        name='title'
        error={errors?.title?.message}
        {...register("title")}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <CustomInputField
          label='address:'
          type='text'
          name='address'
          error={errors?.address?.message}
          {...register("address")}
        />
        <CustomInputField
          label='Venue:'
          type='text'
          name='location'
          error={errors?.location?.message}
          {...register("location")}
        />

        <SelectField
          label='Status:'
          options={status}
          name='status'
          error={errors?.status?.message}
          {...register("status")}
        />
        <CustomInputField
          label='Event Date:'
          type='date'
          name='date'
          error={errors?.date?.message}
          {...register("date")}
        />
      </div>

      <CustomInputField
        label='description:'
        type='text-area'
        name='description'
        error={errors?.description?.message}
        {...register("description")}
      />

      <div className='grid grid-cols-2 gap-5'>
        <CustomInputField
          label='Image:'
          type='file'
          name='image'
          control={control}
          error={errors?.image?.message}
          onChange={(e) => setValue("image", e.target.files)}
        />
        <CustomInputField
          label='Report:'
          type='file'
          name='report'
          control={control}
          error={errors?.report?.message}
          onChange={(e) => setValue("report", e.target.files)}
        />
        <div className='grid grid-cols-2 gap-5'>
          {defaultData?.image && (
            <div className='w-40 mb-5'>
              <img
                className='w-full h-full object-cover'
                src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                  defaultData?.image
                }`}
                alt=''
              />
            </div>
          )}
          {defaultData?.report && (
            <div className='w-full mb-5 mt-5 '>
              <Link
                className=' text-neutral-50 bg-yellow-600  py-2  px-5'
                to={`${import.meta.env.VITE_APP_BASE_URL}/uploads/documents/${
                  defaultData?.report
                }`}
              >
                Pdf Files
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className='grid   grid-cols-1 md:grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/abouts'
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

EventForm.propTypes = {
  defaultData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    address: PropTypes.string,
    location: PropTypes.location,
    image: PropTypes.string,
    report: PropTypes.string,
    status: PropTypes.status,
    id: PropTypes.string,
  }),
};

export default EventForm;
