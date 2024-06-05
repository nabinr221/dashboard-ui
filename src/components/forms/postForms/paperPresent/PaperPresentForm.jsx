import { useForm, Controller } from 'react-hook-form';
import CustomInputField from '../../customInputField/CustomInputField';
import CustomButton from '../../button/CustomButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddData } from '../../../../hooks/useAddData/useAddData';
import { useEditData } from '../../../../hooks/useEdit/useEdit';

const PaperPresentForm = ({ defaultData }) => {
  console.log(defaultData, 'this is defaultData');
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: defaultData?.title || '',
      description: defaultData?.description || '',
      organization: defaultData?.organization || '',
      subject: defaultData?.subject || '',
      pdf: defaultData?.pdf || '',
      date: defaultData?.date || '',
    },
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data, 'this is image file');

    formData.append('title', data?.title);
    formData.append('description', data?.description);
    formData.append('organization', data?.organization);
    formData.append('subject', data?.subject);
    formData.append('pdf', data?.pdf[0]);
    formData.append('date', data?.date);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, 'paper/presents', defaultData._id);
        toast.success('Data updated successfully!');
      } else {
        // Adding new data
        await addData(formData, 'paper/presents');
        toast.success('Data added successfully!');
      }
      navigate('/paper-presents');
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${defaultData ? 'update' : 'add'} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label="Title:"
        type="text"
        name="title"
        {...register('title')}
      />
      <CustomInputField
        label="organization:"
        type="text"
        name="organization"
        {...register('organization')}
      />
      <CustomInputField
        label="subject:"
        type="text"
        name="subject"
        {...register('subject')}
      />
      <div className="flex gap-3 items-center">
        <CustomInputField
          label=" Date"
          type="date"
          name="date"
          {...register('date')}
        />

        <CustomInputField
          label="upload pdf files:"
          type="file"
          name="image"
          accept=".pdf, .doc, .docx"
          control={control}
          onChange={(e) => setValue('pdf', e.target.files)}
        />
      </div>
      <CustomInputField
        label="description:"
        type="text-area"
        name="description"
        {...register('description')}
      />

      <CustomButton type="submit" disabled={isAdding || isEditing}>
        {isAdding || isEditing ? 'Processing...' : 'Submit'}
      </CustomButton>
      {(addError || editError) && (
        <p className="text-red-500 mt-2">{addError || editError}</p>
      )}
    </form>
  );
};

export default PaperPresentForm;
