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
import SelectField from "../../selectField/SelectField";
import { ProductSchema } from "../../../../zodSchema/productSchema/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const OverviewForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: defaultData?.content || "",
      progress: defaultData?.progress || "",
      projectId: defaultData?.projectId || "",
    },
    // resolver: zodResolver(ProductSchema),
  });

  const navigate = useNavigate();
  const { data } = useFetchData({
    endpoint: "projects",
  });
  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const progress = ["25", "50", "75", "100"];
  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (defaultData) {
        // Editing existing data
        await editData(data, "overviews", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        const extradata = await addData(data, "overviews");
        console.log(extradata.data.message, "thasd");
        toast.success(extradata.data.message);
      }
      navigate("/overviews");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-2 gap-5 mb-2'>
        <SelectField
          label='progress:'
          name='progress'
          control={control}
          options={progress}
          {...register("progress")}
          error={errors?.progress?.message}
        />

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
      </div>

      <CustomInputField
        label='content:'
        type='text-area'
        name='content'
        error={errors?.content?.message}
        {...register("content")}
      />
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/overviews'
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

OverviewForm.propTypes = {
  defaultData: PropTypes.shape({
    progress: PropTypes.string,
    projectId: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default OverviewForm;
