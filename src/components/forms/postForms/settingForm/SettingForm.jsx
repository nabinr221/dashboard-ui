import { useForm } from "react-hook-form";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import CustomLink from "../../customLink/CustomLink";
import PropTypes from "prop-types";

const SettingForm = ({ defaultData }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      name: defaultData?.name || "",
      address: defaultData?.address || "",
      email: defaultData?.email || "",
      facebook: defaultData?.facebook || "",
      linkedin: defaultData?.linkedin || "",
      phone: defaultData?.phone || "",
      logo: defaultData?.logo || "",
    },
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();
    // Check if a new image is selected and it's different from the default data
    console.log(data, "thi si sasdfas");

    formData.append("name", data?.name);
    formData.append("address", data?.address);
    formData.append("email", data?.email);
    formData.append("facebook", data?.facebook);
    formData.append("logo", data?.logo[0]);
    formData.append("linkedin", data?.linkedin);
    formData.append("phone", data?.phone);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, "settings", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(formData, "settings");
        toast.success("Data added successfully!");
      }
      navigate("/settings");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='name:'
        type='text'
        name='name'
        {...register("name")}
      />
      <CustomInputField
        label='address:'
        type='text'
        name='address'
        {...register("address")}
      />
      <div className='grid grid-cols-4 gap-10'>
        <CustomInputField
          label='email:'
          type='email'
          name='email'
          {...register("email")}
        />
        <CustomInputField
          label='facebook:'
          type='text'
          name='facebook'
          {...register("facebook")}
        />
        <CustomInputField
          label='linkedin:'
          type='text'
          name='linkedin'
          {...register("linkedin")}
        />

        <CustomInputField
          label='phone:'
          type='phone'
          name='phone'
          {...register("phone")}
        />
      </div>

      <div className='flex items-center gap-10'>
        <CustomInputField
          label='Logo:'
          type='file'
          name='logo'
          control={control}
          onChange={(e) => setValue("logo", e.target.files)}
        />
        {defaultData?.logo && (
          <div className='w-40 mb-5'>
            <img
              className='w-full h-full object-cover'
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                defaultData?.logo
              }`}
              alt=''
            />
          </div>
        )}
      </div>
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/settings'
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

SettingForm.propTypes = {
  defaultData: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    facebook: PropTypes.string,
    linkedin: PropTypes.string,
    phone: PropTypes.string,
    logo: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default SettingForm;
