import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import CustomLink from "../../customLink/CustomLink";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactInfoSchema } from "../../../../zodSchema/contactSchema/ContactSchema.js";

const ContactInfoForm = ({ defaultData }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultData?.name || "",
      title: defaultData?.title || "",
      address: defaultData?.address || "",
      phone: defaultData?.phone || "",
      email: defaultData?.email || "",
    },
    resolver: zodResolver(contactInfoSchema),
  });

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    try {
      if (defaultData) {
        await editData(data, "contacts-info", defaultData.id);
        toast.success("Data updated successfully!");
        navigate("/contacts-info");
      } else {
        const res = await addData(data, "contacts-info");
        if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
          toast.success(`Data '${res.data.data.name}' added successfully!`);
          navigate("/contacts-info");
        } else if (res.data.statusCode >= 400 && res.data.statusCode < 500) {
          toast.error(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='Full name:'
        type='text'
        name='name'
        error={errors?.name?.message}
        {...register("name")}
      />
      <CustomInputField
        label='title:'
        type='text'
        name='title'
        error={errors?.title?.message}
        {...register("title")}
      />

      <div className='grid grid-cols-3 gap-5'>
        <CustomInputField
          label='address:'
          type='text'
          name='address'
          error={errors?.address?.message}
          {...register("address")}
        />
        <CustomInputField
          label='phone number:'
          type='number'
          name='phone'
          error={errors?.phone?.message}
          {...register("phone")}
        />
        <CustomInputField
          label='email:'
          type='email'
          name='email'
          error={errors?.email?.message}
          {...register("email")}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
        <CustomLink
          path='/contacts-info'
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

ContactInfoForm.propTypes = {
  defaultData: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    id: PropTypes.string,
  }),
};
export default ContactInfoForm;
