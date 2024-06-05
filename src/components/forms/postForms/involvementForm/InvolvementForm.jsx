import { useForm, Controller, useFieldArray } from "react-hook-form";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import RTE from "../../editor/RTE";
import { useEffect } from "react";

const InvolvementForm = ({ defaultData }) => {
  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      title: defaultData?.title || "",
      position: defaultData?.position || "",
      organization: defaultData?.organization || "",
      content: defaultData?.content || "",
      keyResponsibility: defaultData?.keyResponsibility || "",
      category: defaultData?.category || "",
      image: defaultData?.image || "",
      subImages: defaultData?.subImages || "",
      logo: defaultData?.logo || "",
      startingDate: defaultData?.startingDate || "",
      endDate: defaultData?.endDate || "",
    },
  });
  useEffect(() => {
    // Set default values for date fields if defaultData is provided
    if (defaultData) {
      const startingDate = defaultData.startingDate
        ? defaultData?.startingDate.split("T")[0] // Extract yyyy-MM-dd part
        : "";
      const endDate = defaultData.endDate
        ? defaultData?.endDate.split("T")[0] // Extract yyyy-MM-dd part
        : "";
      setValue("startingDate", startingDate);
      setValue("endDate", endDate);
    }
  }, [defaultData, setValue]);

  const navigate = useNavigate();
  const category = [
    {
      id: "1",
      category: "commuunity development",
      details: "commuunityDevelopment",
    },
    {
      id: "2",
      category: "language Logstic",
      details: "languageLogstic",
    },
    {
      id: "3",
      category: "teaching",
      details: "teaching",
    },
  ];

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data.title, "thisi ss titlke");

    formData.append("title", data?.title);
    formData.append("position", data?.position);
    formData.append("organization", data?.organization);
    formData.append("category", data?.category);
    formData.append("content", data?.content);
    formData.append("keyResponsibility", data?.keyResponsibility);
    formData.append("image", data?.image[0]);

    // Ensure subImages is treated as an array
    if (Array.isArray(data?.subImages)) {
      data.subImages.forEach((file) => formData.append("subImages", file));
    } else if (data?.subImages) {
      // If subImages is not an array, treat it as a single file
      formData.append("subImages", data.subImages);
    }

    // formData.append("subImages", data?.subImages[0]);
    formData.append("logo", data?.logo[0]);
    formData.append("startingDate", data?.startingDate);
    formData.append("endDate", data?.endDate);
    try {
      if (defaultData) {
        await editData(formData, "involvements", defaultData._id);
        toast.success("Data updated successfully!");
      } else {
        await addData(formData, "involvements");
        toast.success("Data added successfully!");
      }
      navigate("/involvements");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='title:'
        type='text'
        name='title'
        {...register("title")}
      />
      <CustomInputField
        label='Position:'
        type='text'
        name='position'
        {...register("position")}
      />
      <CustomInputField
        label='Organization:'
        type='text'
        name='organization'
        {...register("organization")}
      />

      <div className='grid sm:grid-cols-3 gap-3 items-center'>
        <div className='w-full h-full mb-3'>
          <label
            htmlFor='category'
            className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Category Name:
          </label>
          <select
            id='category'
            name='category'
            {...register("category")}
            className={`mt-2 capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500`}
          >
            <option value=''>select category</option>
            {category?.map((item, index) => (
              <option key={index} value={item?.details}>
                {item?.category}
              </option>
            ))}
          </select>
        </div>

        <CustomInputField
          label='starting Date:'
          type='date'
          name='startingDate'
          defaultValue={defaultData?.startingDate || ""}
          {...register("startingDate")}
        />
        <CustomInputField
          label='end Date:'
          type='date'
          name='endDate'
          {...register("endDate")}
          defaultValue={defaultData?.endDate || ""}
        />
      </div>

      <div className='grid sm:grid-cols-3 gap-3'>
        <CustomInputField
          label='Featured Image:'
          type='file'
          name='image'
          control={control}
          onChange={(e) => setValue("image", e.target.files)}
        />
        <CustomInputField
          label='Sub Images:'
          type='file'
          name='subImages'
          control={control}
          onChange={(e) => {
            const files = Array.from(e.target.files);
            setValue("subImages", files); // Set value as an array of files
          }}
          multiple // Allow multiple file selection
        />
        <CustomInputField
          label='logo:'
          type='file'
          name='logo'
          control={control}
          onChange={(e) => setValue("logo", e.target.files)}
        />
      </div>

      <RTE
        label='Key Resposndibility:'
        name='keyResponsibility'
        control={control}
        defaultValue={getValues("keyResponsibility")}
      />

      <CustomInputField
        label='content:'
        type='text-area'
        name='content'
        {...register("content")}
      />

      <CustomButton type='submit' disabled={isAdding || isEditing}>
        {isAdding || isEditing ? "Processing..." : "Submit"}
      </CustomButton>
      {(addError || editError) && (
        <p className='text-red-500 mt-2'>{addError || editError}</p>
      )}
    </form>
  );
};

export default InvolvementForm;
