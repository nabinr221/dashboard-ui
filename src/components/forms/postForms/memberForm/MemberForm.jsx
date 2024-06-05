import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import CustomLink from "../../customLink/CustomLink";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import MemberSchema from "../../../../zodSchema/memberSchema/MemberSchema.js";

const MemberForm = ({ defaultData }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultData?.name || "",
      description: defaultData?.description || "",
      email: defaultData?.email || "",
      facebook: defaultData?.facebook || "",
      linkedin: defaultData?.linkedin || "",
      phone: defaultData?.phone || "",
      image: defaultData?.image || "",
    },
    resolver: zodResolver(MemberSchema),
  });

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data?.name);
    formData.append("description", data?.description);
    formData.append("email", data?.email);
    formData.append("phone", data?.phone);
    formData.append("facebook", data?.facebook);
    formData.append("linkedin", data?.linkedin);
    formData.append("image", data?.image[0]);

    try {
      if (defaultData) {
        await editData(formData, "members", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        await addData(formData, "members");
        toast.success("Data added successfully!");
      }
      navigate("/members");
    } catch (error) {
      console.error("Error while adding data:", error);
      toast.error("Failed to add data");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='Member name:'
        type='text'
        name='name'
        error={errors?.name?.message}
        {...register("name")}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <CustomInputField
          label='Email:'
          type='email'
          name='email'
          error={errors?.email?.message}
          {...register("email")}
        />
        <CustomInputField
          label='Phone number:'
          type='number'
          name='phone'
          error={errors?.phone?.message}
          {...register("phone")}
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        <CustomInputField
          label='Facebook:'
          type='text'
          name='facebook'
          error={errors?.facebook?.message}
          {...register("facebook")}
        />
        <CustomInputField
          label='LinkedIn:'
          type='text'
          name='linkedin'
          error={errors?.linkedin?.message}
          {...register("linkedin")}
        />
        <div className='flex gap-2'>
          {" "}
          <CustomInputField
            label='Featured Image:'
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
                alt=''
              />
            </div>
          )}
        </div>
      </div>
      {/* <div className='grid grid-cols-2 gap-5'> */}
      <CustomInputField
        label='Description:'
        type='text-area'
        name='description'
        error={errors?.description?.message}
        {...register("description")}
      />

      {/* </div> */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
        <CustomLink
          path='/members'
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

MemberForm.propTypes = {
  defaultData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    facebook: PropTypes.string,
    linkedin: PropTypes.string,
    phone: PropTypes.string,
    image: PropTypes.string,
    report: PropTypes.string,
  }),
};

export default MemberForm;
