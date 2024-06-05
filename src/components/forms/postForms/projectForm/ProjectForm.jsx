import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import CustomLink from "../../customLink/CustomLink";
import SelectField from "../../selectField/SelectField";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import { ProductSchema } from "../../../../zodSchema/productSchema/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema } from "../../../../zodSchema/projectSchema/projectSchema";

const ProjectForm = ({ defaultData }) => {
  const dateString = defaultData?.startingDate ? defaultData?.startingDate : "";
  const [startingDate] = dateString.split("T");
  const dateStringEnd = defaultData?.endDate ? defaultData?.endDate : "";
  const [endDate] = dateStringEnd.split("T");

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
      startingDate: startingDate || "",
      endDate: endDate || "",
      budget: defaultData?.budget || "",
      image: defaultData?.image || "",
      proposal: defaultData?.proposal || "",
      status: defaultData?.status || "",
    },
    resolver: zodResolver(ProjectSchema),
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const status = ["upcoming", "ongoing", "completed"];

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();

    console.log(data, ": this is form data");

    formData.append("title", data?.title);
    formData.append("image", data?.image[0]);
    formData.append("proposal", data?.proposal[0]);
    formData.append("startingDate", data?.startingDate);
    formData.append("description", data?.description);
    formData.append("endDate", data?.endDate);
    formData.append("status", data?.status);
    formData.append("budget", data?.budget);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, "projects", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(formData, "projects");
        toast.success("Data added successfully!");
      }
      navigate("/projects");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='title:'
        type='text'
        name='title'
        error={errors?.title?.message}
        {...register("title")}
      />
      <div className='grid grid-cols-3 gap-5 '>
        <SelectField
          options={status}
          {...register("status")}
          error={errors?.status?.message}
          label='status:'
        />
        <CustomInputField
          label='start Date:'
          type='date'
          name='startingDate'
          error={errors?.startingDate?.message}
          {...register("startingDate")}
        />
        <CustomInputField
          label='end Date:'
          type='date'
          name='endDate'
          error={errors?.endDate?.message}
          {...register("endDate")}
        />
      </div>
      <CustomInputField
        label='description:'
        type='text-area'
        name='description'
        error={errors?.description?.message}
        {...register("description")}
      />
      <CustomInputField
        label='project Budget:'
        type='number'
        name='budget'
        error={errors?.budget?.message}
        {...register("budget")}
      />

      <div className='flex items-center gap-10'>
        <CustomInputField
          label=' Image:'
          type='file'
          name='image'
          error={errors?.image?.message}
          control={control}
          onChange={(e) => setValue("image", e.target.files)}
        />
        <CustomInputField
          label='proposal:'
          type='file'
          name='proposal'
          error={errors?.proposal?.message}
          control={control}
          onChange={(e) => setValue("proposal", e.target.files)}
        />
      </div>
      <div className='grid grid-cols-2 gap-5 items-center'>
        {" "}
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
        {defaultData?.proposal && (
          <div className='w-fit mb-5'>
            <Link
              to={`${import.meta.env.VITE_APP_BASE_URL}/uploads/documents/${
                defaultData?.proposal
              }`}
              target='_blank'
            >
              <div className='bg-yellow-600  text-xl text-center  text-white p-2 '>
                Pdf Files
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/projects'
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

ProjectForm.propTypes = {
  defaultData: PropTypes.shape({
    title: PropTypes.string,
    startingDate: PropTypes.number,
    description: PropTypes.string,
    endDate: PropTypes.string,
    status: PropTypes.string,
    proposal: PropTypes.string,
    image: PropTypes.string,
    budget: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default ProjectForm;
