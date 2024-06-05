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

const TeamMemberForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultData?.name || "",
      description: defaultData?.description || "",
      image: defaultData?.image || "",
    },
    // resolver: zodResolver(ProductSchema),
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    console.log(data, "thh sdfj");
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("description", data?.description);
    if (data?.image && data?.image[0]) {
      formData.append("image", data?.image[0]);
    }

    console.log(formData, "this is form data");
    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, "team-members", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        const extradata = await addData(formData, "team-members");
        console.log(extradata.data.message, "thasd");
        toast.success(extradata.data.message);
      }
      navigate("/team-members");
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
      <CustomInputField
        label='description:'
        type='text-area'
        name='description'
        error={errors?.description?.message}
        {...register("description")}
      />

      <CustomInputField
        label=' Image:'
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
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/team-members'
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

TeamMemberForm.propTypes = {
  defaultData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default TeamMemberForm;
