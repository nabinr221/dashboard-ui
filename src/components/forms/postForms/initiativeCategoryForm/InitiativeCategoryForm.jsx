import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomInputField from '../../customInputField/CustomInputField';
import CustomButton from '../../button/CustomButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddData } from '../../../../hooks/useAddData/useAddData';
import RTE from '../../editor/RTE';
import { useEditData } from '../../../../hooks/useEdit/useEdit';

const InitiativeCategoryForm = ({ defaultData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      categoryName: defaultData?.categoryName || '',
    },
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    // console.log(data, 'this is image file');
    // const formData = new FormData();
    // formData.append('categoryName', data.categoryName);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(data, 'initiative/categories', defaultData._id);
        toast.success('Data updated successfully!');
      } else {
        // Adding new data
        await addData(data, 'initiative/categories');
        toast.success('Data added successfully!');
      }
      navigate('/initiative-categories');
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${defaultData ? 'update' : 'add'} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label="category name:"
        type="text"
        name="categoryName"
        {...register('categoryName', { required: true })}
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

export default InitiativeCategoryForm;
