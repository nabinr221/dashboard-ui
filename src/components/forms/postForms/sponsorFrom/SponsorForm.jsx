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
import sponsorSchema from "../../../../zodSchema/sponsorSchema/sponsorSchema";

const SponsorForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultData?.name || "",
      logo: defaultData?.logo || "",
    },
    resolver: zodResolver(sponsorSchema),
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data?.name);
    formData.append("logo", data?.logo[0]);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, "sponsors", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(formData, "sponsors");
        toast.success("Data added successfully!");
      }
      navigate("/sponsors");
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
        error={errors?.name?.message}
        {...register("name")}
      />

      <div className='flex items-center gap-10'>
        <CustomInputField
          label='logo:'
          type='file'
          name='logo'
          error={errors?.logo?.message}
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
              alt='Images'
            />
          </div>
        )}
      </div>
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/sponsors'
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

SponsorForm.propTypes = {
  defaultData: PropTypes.shape({
    name: PropTypes.string,
    logo: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default SponsorForm;
