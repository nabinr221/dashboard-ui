import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomInputField from '../../customInputField/CustomInputField';
import CustomButton from '../../button/CustomButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddData } from '../../../../hooks/useAddData/useAddData';
import RTE from '../../editor/RTE';
import { useEditData } from '../../../../hooks/useEdit/useEdit';

const ArticleForm = ({ defaultData, categorData }) => {
  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      title: defaultData?.title || '',
      category: defaultData?.category || '',
      description: defaultData?.description || '',
      image: defaultData?.image || null,
    },
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data?.image[0], 'this is image file');

    // Check if a new image is selected and it's different from the default data
    if (data?.image && data?.image[0] && data?.image[0].size > 0) {
      formData.append('image', data?.image[0]);
    }

    formData.append('title', data?.title);
    formData.append('description', data?.description);
    formData.append('category', data?.category);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, 'articles', defaultData._id);
        toast.success('Data updated successfully!');
      } else {
        // Adding new data
        await addData(formData, 'articles');
        toast.success('Data added successfully!');
      }
      navigate('/articles');
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
        {...register('title', { required: true })}
      />
      <div className="flex flex-col">
        <label
          htmlFor="category"
          className="capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Category Name:
        </label>
        <select
          name="category"
          id="category"
          // name="category"
          {...register('category')}
          className={`mt-2 capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500`}
        >
          <option value="">select category</option>
          {categorData?.map((item, index) => (
            <option key={index} value={item._id}>
              {item?.categoryName}
            </option>
          ))}
        </select>
      </div>{' '}
      <RTE
        label="Description:"
        name="description"
        control={control}
        {...register('description', { required: true })}
        defaultValue={getValues('description')}
      />
      <div className="flex items-center gap-10">
        <CustomInputField
          label="Featured Image:"
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

export default ArticleForm;
