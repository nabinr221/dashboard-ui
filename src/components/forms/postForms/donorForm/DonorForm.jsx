import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import CustomLink from "../../customLink/CustomLink";
import { zodResolver } from "@hookform/resolvers/zod";
import DonorSchema from "../../../../zodSchema/donorSchema/donorSchema";

const DonorForm = ({ defaultData }) => {
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
      category: defaultData?.category || "",
      image: defaultData?.image || null,
      email: defaultData?.email || "",
      facebook: defaultData?.facebook || "",
      linkedin: defaultData?.linkedin || "",
    },
    resolver: zodResolver(DonorSchema),
  });

  const categorData = [
    {
      id: "1",
      category: "individual",
    },
    {
      id: "2",
      category: "institution",
    },
  ];
  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data?.image && data?.image[0] && data?.image[0].size > 0) {
      formData.append("image", data?.image[0]);
    }

    formData.append("name", data?.name);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("facebook", data?.facebook);
    formData.append("email", data?.email);
    formData.append("linkedin", data?.linkedin);

    try {
      if (defaultData) {
        await editData(formData, "donors", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        await addData(formData, "donors");
        toast.success("Data added successfully!");
      }
      navigate("/donors");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='Donor Name:'
        type='text'
        name='name'
        {...register("name")}
        error={errors?.name?.message}
      />
      <div className='grid grid-cols-3 gap-3'>
        <CustomInputField
          label='email:'
          type='email'
          name='email'
          error={errors?.email?.message}
          {...register("email")}
        />
        <CustomInputField
          label='facebook:'
          type='facebook'
          name='facebook'
          error={errors?.facebook?.message}
          {...register("facebook")}
        />
        <CustomInputField
          label='linkedin:'
          type='linkedin'
          name='linkedin'
          error={errors?.linkedin?.message}
          {...register("linkedin")}
        />
      </div>

      <div className='grid grid-cols-2 gap-3 items-center'>
        <div className='w-full h-full'>
          <label
            htmlFor='category'
            className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Category Name:
          </label>
          <select
            id='category'
            name='category'
            {...register("category")}
            className={`mt-2 capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500`}
          >
            <option value=''>select category</option>
            {categorData?.map((item, index) => (
              <option key={index} value={item?.category}>
                {item?.category}
              </option>
            ))}
          </select>

          <p className='text-red-500 mt-2'>{errors?.category?.message}</p>
        </div>
        <div className='flex items-center gap-10'>
          <CustomInputField
            label='Featured Image:'
            type='file'
            name='image'
            control={control}
            onChange={(e) => setValue("image", e.target.files)}
            error={errors?.image?.message}
          />
        </div>
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

      <CustomInputField
        label='Description:'
        type='text-area'
        name='description'
        {...register("description")}
        error={errors?.description?.message}
      />

      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/donors'
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

DonorForm.propTypes = {
  defaultData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    facebook: PropTypes.string,
    email: PropTypes.string,
    linkedin: PropTypes.string,
  }),
};

export default DonorForm;
