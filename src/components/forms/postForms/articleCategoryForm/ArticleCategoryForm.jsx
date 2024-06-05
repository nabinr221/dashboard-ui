import { useForm, Controller } from 'react-hook-form';
import CustomInputField from '../../customInputField/CustomInputField';
import CustomButton from '../../button/CustomButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddData } from '../../../../hooks/useAddData/useAddData';
import { useEditData } from '../../../../hooks/useEdit/useEdit';

const ArticleCategoryForm = ({ defaultData }) => {
  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      categoryName: defaultData?.categoryName || '',
    },
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    try {
      if (defaultData) {
        await editData(data, 'article/categories', defaultData._id);
        toast.success('Data updated successfully!');
      } else {
        await addData(data, 'article/categories');
        toast.success('Data added successfully!');
      }
      navigate('/article-categories');
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

export default ArticleCategoryForm;
