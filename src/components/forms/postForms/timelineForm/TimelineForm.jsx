import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomInputField from '../../customInputField/CustomInputField';
import CustomButton from '../../button/CustomButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddData } from '../../../../hooks/useAddData/useAddData';
import { useEditData } from '../../../../hooks/useEdit/useEdit';

const TimelineForm = ({ defaultData }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: defaultData?.title || '',
      description: defaultData?.description || '',
      image: defaultData?.image || '',
      startingDate: defaultData?.startingDate || '',
      endDate: defaultData?.endDate || '',
    },
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('startingDate', data.startingDate);
    formData.append('endDate', data.endDate);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, 'timelines', defaultData._id);
        toast.success('Data updated successfully!');
      } else {
        // Adding new data
        await addData(formData, 'timelines');
        toast.success('Data added successfully!');
      }
      navigate('/timelines');
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
        label="Description:"
        type="text-area"
        name="description"
        {...register('description')}
      />
      <div className="flex gap-5 items-center">
        <CustomInputField
          label="Starting Date:"
          type="date"
          name="startingDate"
          {...register('startingDate')}
        />
        <CustomInputField
          label="Ending Date:"
          type="date"
          name="endDate"
          {...register('endDate')}
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

export default TimelineForm;
