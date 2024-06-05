import { useForm } from 'react-hook-form';
import CustomInputField from '../../customInputField/CustomInputField';
import CustomButton from '../../button/CustomButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddData } from '../../../../hooks/useAddData/useAddData';
import { useEditData } from '../../../../hooks/useEdit/useEdit';

const DonationForm = ({ defaultData, donorsData, initiativesData }) => {
  console.log(defaultData, 'this is fiasdfhajfhaskk');
  const { register, handleSubmit } = useForm({
    defaultValues: {
      donorId: defaultData?.donorId?.name || '',
      initiativeId: defaultData?.initiativeId || '',
      donationAmt: defaultData?.donationAmt || '',
      donateDate: defaultData?.donateDate || '',
    },
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    try {
      if (defaultData) {
        // Editing existing data
        await editData(data, 'donations', defaultData._id);
        toast.success('Data updated successfully!');
      } else {
        // Adding new data
        await addData(data, 'donations');
        toast.success('Data added successfully!');
      }
      navigate('/donations');
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${defaultData ? 'update' : 'add'} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 gap-5 mb-3">
        {' '}
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            donor Name:
          </label>
          <select
            name="donorId"
            id="donorId"
            // name="category"
            {...register('donorId')}
            className={`mt-2 capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500`}
          >
            <option value="">select Donor</option>
            {donorsData?.map((item, index) => (
              <option key={index} value={item._id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="initiative"
            className="capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Initiatives Name:
          </label>
          <select
            name="initiativeId"
            id="initiative"
            {...register('initiativeId')}
            className={`mt-2 capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500`}
          >
            <option value="">select Initiatives</option>
            {initiativesData?.map((item, index) => (
              <option key={index} value={item._id}>
                {item?.title}
              </option>
            ))}
          </select>
        </div>
      </div>{' '}
      <div className="grid sm:grid-cols-2 gap-5">
        <CustomInputField
          label="Donation Amount:"
          type="number"
          name="donationAmt"
          {...register('donationAmt')}
        />
        <CustomInputField
          label="Donation Date:"
          type="date"
          name="donateDate"
          {...register('donateDate')}
        />{' '}
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

export default DonationForm;
