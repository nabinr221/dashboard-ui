import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomInputField from '../../customInputField/CustomInputField';
import CustomButton from '../../button/CustomButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddData } from '../../../../hooks/useAddData/useAddData';
import RTE from '../../editor/RTE';
import { useEditData } from '../../../../hooks/useEdit/useEdit';

const AffiliationForm = ({ defaultData }) => {
  console.log(defaultData, 'this is defaultData');
  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      organization: defaultData?.organization || '',
      position: defaultData?.position || '',
      date: defaultData?.date || '',
      image: defaultData?.image || '',
    },
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data, 'this is image file');

    // Check if a new image is selected and it's different from the default data

    formData.append('image', data?.image[0]);
    formData.append('organization', data?.organization);
    formData.append('position', data?.position);
    formData.append('date', data?.date);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, 'affiliations', defaultData._id);
        toast.success('Data updated successfully!');
      } else {
        // Adding new data
        await addData(formData, 'affiliations');
        toast.success('Data added successfully!');
      }
      navigate('/affiliations');
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${defaultData ? 'update' : 'add'} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label="Organization:"
        type="text"
        name="organization"
        {...register('organization', { required: true })}
      />
      <CustomInputField
        label="position:"
        type="text"
        name="position"
        {...register('position', { required: true })}
      />
      <CustomInputField
        label="Date:"
        type="text"
        name="date"
        {...register('date', { required: true })}
      />

      <div className="flex items-center gap-10">
        <CustomInputField
          label="Logo:"
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

export default AffiliationForm;
