import { useForm } from "react-hook-form";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import CustomLink from "../../customLink/CustomLink";
import PropTypes from "prop-types";
import { useFetchData } from "../../../../hooks/useFetchData/useFetchData";
import SelectField from "../../selectField/SelectField";
import { ProductSchema } from "../../../../zodSchema/productSchema/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductForm = ({ defaultData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultData?.name || "",
      price: defaultData?.price || "",
      description: defaultData?.description || "",
      productCategoryId: defaultData?.productCategoryId || "",
      colorId: defaultData?.colorId || "",
      size: defaultData?.size || "",
      thumbnail: defaultData?.thumbnail || "",
    },
    resolver: zodResolver(ProductSchema),
  });

  const navigate = useNavigate();
  const { data: productCat, isLoading: isProductCatLoading } = useFetchData({
    endpoint: "product-categories",
  });
  const { data: colorsData, isLoading: isColorsLoading } = useFetchData({
    endpoint: "colors",
  });
  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  if (isProductCatLoading || isColorsLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    console.log(data, ": thjis is form data");
    formData.append("name", data?.name);
    formData.append("thumbnail", data?.thumbnail[0]);
    formData.append("price", data?.price);
    formData.append("description", data?.description);
    formData.append("productCategoryId", data?.productCategoryId);
    formData.append("colorId", data?.colorId);
    formData.append("size", data?.size);

    try {
      if (defaultData) {
        // Editing existing data
        await editData(formData, "products", defaultData.id);
        toast.success("Data updated successfully!");
      } else {
        // Adding new data
        await addData(formData, "products");
        toast.success("Data added successfully!");
      }
      navigate("/products");
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
      <div className='grid grid-cols-3 gap-5 mb-2'>
        <div className='w-full'>
          <label
            htmlFor='proudctCategoryId'
            className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Product Category
          </label>

          <select
            id='proudctCategoryId'
            name='productCategoryId'
            {...register("productCategoryId")}
            className={`capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500 `}
          >
            <option value=''> select Product Category </option>
            {productCat?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          {errors?.productCategoryId?.message && (
            <span className='text-red-500 text-base'>
              {errors?.productCategoryId?.message}
            </span>
          )}
        </div>
        <div className='w-full'>
          <label
            htmlFor='colorId'
            className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Colors
          </label>

          <select
            id='colorId'
            name='colorId'
            {...register("colorId")}
            className={`capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500 `}
          >
            <option value=''> select Colors </option>
            {colorsData?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          {errors?.colorId?.message && (
            <span className='text-red-500 text-base'>
              {errors?.colorId?.message}
            </span>
          )}
        </div>
        <SelectField options={sizes} {...register("size")} label='sizes:' />
      </div>
      <CustomInputField
        label='price:'
        type='number'
        name='price'
        error={errors?.price?.message}
        {...register("price")}
      />
      <CustomInputField
        label='description:'
        type='text-area'
        name='description'
        error={errors?.description?.message}
        {...register("description")}
      />

      <div className='flex items-center gap-10'>
        <CustomInputField
          label='thumnail Image:'
          type='file'
          name='thumbnail'
          error={errors?.thumbnail?.message}
          control={control}
          onChange={(e) => setValue("thumbnail", e.target.files)}
        />
        {defaultData?.thumbnail && (
          <div className='w-40 mb-5'>
            <img
              className='w-full h-full object-cover'
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/images/${
                defaultData?.thumbnail
              }`}
              alt='Images'
            />
          </div>
        )}
      </div>
      <div className='grid grid-cols-2  gap-5 mt-5'>
        <CustomLink
          path='/settings'
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

ProductForm.propTypes = {
  defaultData: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    productCategoryId: PropTypes.string,
    colorId: PropTypes.string,
    size: PropTypes.string,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default ProductForm;
