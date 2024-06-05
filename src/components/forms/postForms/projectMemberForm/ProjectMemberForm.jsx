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
import SelectField from "../../selectField/SelectField";
import { ProjectMemberSchema } from "../../../../zodSchema/projectSchema/projectSchema";

const ProjectMemberForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectId: defaultData?.projectId || "",
      teamMemberId: defaultData?.teamMemberId || "",
      position: defaultData?.position || "",
      category: defaultData?.category || "",
    },
    resolver: zodResolver(ProjectMemberSchema),
  });

  const { data: teamMember } = useFetchData({ endpoint: "team-members" });
  const { data: projects } = useFetchData({ endpoint: "projects" });

  // console.log(data, "team members");
  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    console.log(data, "thh sdfj");

    console.log(data, "this is form data");
    try {
      if (defaultData) {
        // Editing existing data
        await editData(data, "project-members", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        const extradata = await addData(data, "project-members");
        console.log(extradata.data.message, "thasd");
        toast.success(extradata.data.message);
      }
      navigate("/project-members");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-2 gap-5'>
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
            {projects?.map((option) => (
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
        <div className='w-full'>
          <label
            htmlFor='projectId'
            className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            team Members
          </label>

          <select
            id='teamMemberId'
            name='teamMemberId'
            {...register("teamMemberId")}
            className={`capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500 `}
          >
            <option value=''> select projects </option>
            {teamMember?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          {errors?.projectId?.message && (
            <span className='text-red-500 text-base'>
              {errors?.projectId?.message}
            </span>
          )}
        </div>

        <CustomInputField
          label='position:'
          type='text'
          name='position'
          error={errors?.position?.message}
          {...register("position")}
        />

        <SelectField
          name='category'
          label='category'
          options={["teamLead", "member"]}
          // control={control}
          {...register("category")}
          error={errors?.category?.message}
        />
      </div>

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

ProjectMemberForm.propTypes = {
  defaultData: PropTypes.shape({
    projectId: PropTypes.string,
    teamMemberId: PropTypes.string,
    position: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default ProjectMemberForm;
