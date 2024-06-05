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

const ActivityForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: defaultData?.image || "",
      video: defaultData?.video || "",
      projectId: defaultData?.projectId || "",
    },
    // resolver: zodResolver(ProductSchema),
  });

  const navigate = useNavigate();
  const { data } = useFetchData({ endpoint: "projects" });
  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("image", data?.image[0]);
    formData.append("video", data?.video[0]);
    formData.append("projectId", data?.projectId);

    try {
      if (defaultData) {
        await editData(formData, "activities", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(formData, "activities");
        toast.success("Data added successfully!");
      }
      navigate("/activities");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full'>
        <label
          htmlFor='projectId'
          className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Projects
        </label>

        <select
          id='projectId'
          name='projectId'
          {...register("projectId")}
          className={`capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500 `}
        >
          <option value=''> select projects </option>
          {data?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
        {errors?.projectId?.message && (
          <span className='text-red-500 text-base'>
            {errors?.projectId?.message}
          </span>
        )}
      </div>

      <div className='grid grid-cols-2 gap-5'>
        <CustomInputField
          label=' Image:'
          type='file'
          name='image'
          error={errors?.image?.message}
          control={control}
          onChange={(e) => setValue("image", e.target.files)}
        />

        <CustomInputField
          label='video:'
          type='file'
          name='video'
          error={errors?.video?.message}
          control={control}
          onChange={(e) => setValue("video", e.target.files)}
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
        {defaultData?.video && (
          <div className='w-40 mb-5'>
            <video width='320' height='240' controls>
              <source
                src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/videos/${
                  defaultData?.video
                }`}
                type='video/mp4'
              />
              Your browser does not support the video tag.
            </video>
            {/* <img
              className='w-full h-full object-cover'
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                defaultData?.video
              }`}
              alt='Images'
            /> */}
          </div>
        )}
      </div>
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/activities'
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

ActivityForm.propTypes = {
  defaultData: PropTypes.shape({
    projectId: PropTypes.string,
    image: PropTypes.string,
    video: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default ActivityForm;
