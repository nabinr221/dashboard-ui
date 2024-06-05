import { useForm } from "react-hook-form";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import CustomLink from "../../customLink/CustomLink";
import PropTypes from "prop-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductCatSchema } from "../../../../zodSchema/productSchema/ProductSchema.js";

const ProductCatForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultData?.name || "",
    },
    resolver: zodResolver(ProductCatSchema),
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    try {
      if (defaultData) {
        await editData(data, "product-categories", defaultData.id);
        toast.success("Data updated successfully!");
        navigate("/product-categories");
      } else {
        const res = await addData(data, "product-categories");
        if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
          toast.success(`Data '${res.data.data.name}' added successfully!`);
          navigate("/product-categories");
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
        label='name:'
        type='text'
        name='name'
        error={errors?.name?.message}
        {...register("name")}
      />

      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/product-categories'
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

ProductCatForm.propTypes = {
  defaultData: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default ProductCatForm;
