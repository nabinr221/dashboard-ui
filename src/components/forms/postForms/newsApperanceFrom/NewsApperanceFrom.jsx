import PropTypes from "prop-types";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import CustomLink from "../../customLink/CustomLink";
import newsApperanceSchema from "../../../../zodSchema/newsApperanceSchema/newsApperanceSchema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import { useFetchData } from "../../../../hooks/useFetchData/useFetchData";
import { zodResolver } from "@hookform/resolvers/zod";

const NewsApperanceForm = ({ defaultData }) => {
  let formattedDate = "";
  if (defaultData?.publishedDate instanceof Date) {
    formattedDate = defaultData?.publishedDate.toLocaleDateString("en-US");
  }
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultData?.title || "",
      eventId: defaultData?.eventId || "",
      description: defaultData?.description || "",
      image: defaultData?.image || "",
      publishedDate: formattedDate || "",
      mediaName: defaultData?.mediaName || "",
      logo: defaultData?.logo || "",
    },
    resolver: zodResolver(newsApperanceSchema),
  });

  const navigate = useNavigate();
  //   const { data: members, isLoading: isProductCatLoading } = useFetchData({
  //     endpoint: "members",
  //   });
  const { data: events, isLoading } = useFetchData({
    endpoint: "events",
  });
  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();
  //   const category = ["event", "coordinator", "member"];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    console.log(data, "this is data");
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);

    formData.append("publishedDate", data?.publishedDate);
    formData.append("mediaName", data?.mediaName);
    formData.append("eventId", data?.eventId);
    // Append image and mediaLogo only if they exist in form data
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    if (data.mediaLogo && data.mediaLogo[0]) {
      formData.append("mediaLogo", data.mediaLogo[0]);
    }

    try {
      if (defaultData) {
        // Editing existing data
        await editData(data, "news-apperances", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(data, "news-apperances");
        toast.success("Data added successfully!");
      }
      navigate("/news-apperances");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='Title'
        type='text'
        name='title'
        {...register("title")}
        error={errors?.title?.message}
      />
      <CustomInputField
        label='media name'
        type='text'
        name='mediaName'
        {...register("mediaName")}
        error={errors?.mediaName?.message}
      />
      <div className='grid  grid-cols-1 md:grid-cols-2 gap-5 mb-2'>
        <CustomInputField
          label='Published Date'
          type='date'
          name='publishedDate'
          {...register("publishedDate")}
          error={errors?.publishedDate?.message}
        />

        <div className='w-full'>
          <label
            htmlFor='eventId'
            className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            events
          </label>

          <select
            id='eventId'
            name='eventId'
            {...register("eventId")}
            className={`capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500 `}
          >
            <option value=''> select events </option>
            {events?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.title}
              </option>
            ))}
          </select>

          {errors?.eventId?.message && (
            <span className='text-red-500 text-base'>
              {errors?.eventId?.message}
            </span>
          )}
        </div>
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
          label='media Logo:'
          type='file'
          name='mediaLogo'
          control={control}
          error={errors?.mediaLogo?.message}
          onChange={(e) => setValue("mediaLogo", e.target.files)}
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
          {defaultData?.mediaLogo && (
            <div className='w-full mb-5 mt-5 '>
              <Link
                className=' text-neutral-50 bg-yellow-600  py-2  px-5'
                to={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                  defaultData?.mediaLogo
                }`}
              >
                Pdf Files
              </Link>
            </div>
          )}
    
      </div>
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/news-apperances'
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

// NewsApperanceForm.propTypes = {
//   defaultData: PropTypes.shape({
//     memberId: PropTypes.string,
//     eventId: PropTypes.string,
//     position: PropTypes.string,
//     category: PropTypes.string,
//     id: PropTypes.string,
//   }),
// };

export default NewsApperanceForm;
