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
import { ColorSchema } from "../../../../zodSchema/productSchema/ProductSchema";
import SelectField from "../../selectField/SelectField";

const SizeForm = ({ defaultData }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultData?.name || "",
    },
    resolver: zodResolver(ColorSchema),
  });

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    try {
      if (defaultData) {
        await editData(data, "sizes", defaultData.id);
        toast.success("Data updated successfully!");
        navigate("/sizes");
      } else {
        const res = await addData(data, "sizes");
        if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
          toast.success(`Data '${res.data.data.name}' added successfully!`);
          navigate("/sizes");
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
      {/* <CustomInputField
        label='Size:'
        type='text'
        name='size'
        error={errors?.size?.message}
        {...register("size")}
      /> */}
      {/* XS S M L XL XXL XXXL */}
      <SelectField
        label='Size:'
        type='text'
        name='size'
        options={["XS", "S", "M", "L", "XL", "XXL", "XXX"]}
        error={errors?.size?.message}
        {...register("size")}
      />
      <div className='grid   grid-cols-1 md:grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/sizes'
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

SizeForm.propTypes = {
  defaultData: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};
export default SizeForm;
