import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import RTE from "../../editor/RTE";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import CustomLink from "../../customLink/CustomLink";
import { useEditData } from "../../../../hooks/useEdit/useEdit";

const AboutmeForm = ({ defaultData }) => {
  const navigate = useNavigate();
  let formattedDate = "";
  if (defaultData?.establishedDate instanceof Date) {
    formattedDate = defaultData?.establishedDate.toLocaleDateString("en-US");
  }
  const { handleSubmit, register, control, getValues } = useForm({
    defaultValues: {
      title: defaultData?.title || "",
      description: defaultData?.description || "",
      establishedDate: formattedDate || "",
      impacted: defaultData?.impacted || "",
    },
  });

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    try {
      if (defaultData) {
        console.log("this isupdate");
        // Editing existing data
        await editData(data, "abouts", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(data, "abouts");
        toast.success("Data added successfully!");
      }
      navigate("/abouts");
    } catch (error) {
      console.error("Error adding About Me:", error);
      toast.error("Failed to add About Me");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='title:'
        type='text'
        name='title'
        {...register("title")}
      />
      <RTE
        label='About me :'
        name='description'
        control={control}
        defaultValue={getValues("description")}
      />
      <div className='grid grid-cols-2 gap-5'>
        <CustomInputField
          label='established Date:'
          type='date'
          name='establishedDate'
          {...register("establishedDate")}
        />
        <CustomInputField
          label='impact:'
          type='Number'
          name='impacted'
          {...register("impacted")}
        />
      </div>
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/abouts'
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

AboutmeForm.propTypes = {
  defaultData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    establishedDate: PropTypes.instanceOf(Date),
    impacted: PropTypes.number,
    id: PropTypes.string,
  }),
};

export default AboutmeForm;
