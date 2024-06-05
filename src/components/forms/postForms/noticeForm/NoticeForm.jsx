import { useForm } from "react-hook-form";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import CustomLink from "../../customLink/CustomLink";
import PropTypes from "prop-types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  advertisementSchema,
  noticeSchema,
} from "../../../../zodSchema/homeSchema/homeSchema.js";

const NoticeForm = ({ defaultData }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: defaultData?.image || "",
    },
    resolver: zodResolver(noticeSchema),
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    console.log(data, "this is image file");

    const formData = new FormData();
    formData.append("image", data?.image[0]);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, "notices", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(formData, "notices");
        toast.success("Data added successfully!");
      }
      navigate("/notices");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-center gap-10'>
        <CustomInputField
          label='Notice Image:'
          type='file'
          name='image'
          error={errors?.image?.message}
          control={control}
          onChange={(e) => setValue("image", e.target.files)}
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
      </div>
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/notices'
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

NoticeForm.propTypes = {
  defaultData: PropTypes.shape({
    image: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default NoticeForm;
