import PropTypes from "prop-types";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import CustomLink from "../../customLink/CustomLink";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import { zodResolver } from "@hookform/resolvers/zod";
import { achievmentsSchema } from "../../../../zodSchema/homeSchema/homeSchema";

const AchievementForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultData?.title || "",
      description: defaultData?.description || "",
      image: defaultData?.image || "",
    },
    resolver: zodResolver(achievmentsSchema),
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data, "this is image file");

    formData.append("image", data?.image[0]);
    formData.append("title", data?.title);
    formData.append("description", data?.description);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, "achievements", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(formData, "achievements");
        toast.success("Data added successfully!");
      }
      navigate("/achievements");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='Title:'
        type='text'
        name='title'
        {...register("title")}
        error={errors?.title?.message}
      />
      <CustomInputField
        label='Description:'
        type='text'
        name='description'
        {...register("description")}
        error={errors?.description?.message}
      />

      <CustomInputField
        label=' Image:'
        type='file'
        name='image'
        control={control}
        onChange={(e) => setValue("image", e.target.files)}
        error={errors?.image?.message}
      />

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

      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/achievements'
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

// Define prop types
AchievementForm.propTypes = {
  defaultData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.oneOfType([
      PropTypes.string, // If image is a URL string
      PropTypes.instanceOf(File), // If image is a File object
    ]),
    // Add other prop types as needed
  }),
};

export default AchievementForm;
