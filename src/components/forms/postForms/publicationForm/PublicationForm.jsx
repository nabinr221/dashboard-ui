import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomInputField from '../../customInputField/CustomInputField';
import CustomButton from '../../button/CustomButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddData } from '../../../../hooks/useAddData/useAddData';
import { useEditData } from '../../../../hooks/useEdit/useEdit';

const PublicationForm = ({ defaultData }) => {
  console.log(defaultData, 'this is defaultData');
  const { register, handleSubmit, control, setValue, watch, getValues } =
    useForm({
      defaultValues: {
        bookTitle: defaultData?.bookTitle || '',
        publication: defaultData?.publication || '',
        summary: defaultData?.summary || '',
        authorMessage: defaultData?.authorMessage || '',
        isPurchased: defaultData?.isPurchased || '',
        image: defaultData?.image || '',
        publishedDate: defaultData?.publishedDate || '',
      },
    });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data, 'this is image file');

    // Check if a new image is selected and it's different from the default data

    formData.append('bookTitle', data?.bookTitle);
    formData.append('publication', data?.publication);
    formData.append('summary', data?.summary);
    formData.append('authorMessage', data?.authorMessage);
    formData.append('image', data?.image[0]);
    formData.append('isPurchased', data?.isPurchased);
    formData.append('publishedDate', data?.publishedDate);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, 'publications', defaultData._id);
        toast.success('Data updated successfully!');
      } else {
        // Adding new data
        await addData(formData, 'publications');
        toast.success('Data added successfully!');
      }
      navigate('/publications');
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${defaultData ? 'update' : 'add'} data`);
    }
  };

  const isPurchased = watch('isPurchased');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label="Book Title:"
        type="text"
        name="bookTitle"
        {...register('bookTitle')}
      />
      <CustomInputField
        label="publication:"
        type="text"
        name="publication"
        {...register('publication')}
      />
      <CustomInputField
        label="Summary:"
        type="text-area"
        name="summary"
        {...register('summary')}
      />
      <CustomInputField
        label="Author message:"
        type="text-area"
        name="authorMessage"
        {...register('authorMessage')}
      />

      <div className="w-[50%] my-5 flex gap-5 ">
        <Controller
          name="isPurchased"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CustomInputField
              className="text-indigo-600"
              label="Is Purchased"
              type="checkbox"
              checked={isPurchased}
              onChange={(e) => setValue('isPurchased', e.target.checked)}
              {...field}
            />
          )}
        />

        <CustomInputField
          label="Publication Date"
          type="date"
          name="publishedDate"
          {...register('publishedDate')}
        />
      </div>
      <div className="flex items-center gap-10">
        <CustomInputField
          label="Image:"
          type="file"
          name="image"
          control={control}
          onChange={(e) => setValue('image', e.target.files)}
        />
        {defaultData?.image && (
          <div className="w-40 mb-5">
            <img
              className="w-full h-full object-cover"
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                defaultData?.image
              }`}
              alt=""
            />
          </div>
        )}
      </div>
      <CustomButton type="submit" disabled={isAdding || isEditing}>
        {isAdding || isEditing ? 'Processing...' : 'Submit'}
      </CustomButton>
      {(addError || editError) && (
        <p className="text-red-500 mt-2">{addError || editError}</p>
      )}
    </form>
  );
};

export default PublicationForm;
