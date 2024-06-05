import { useForm, Controller } from "react-hook-form";
import CustomInputField from "../../customInputField/CustomInputField";
import CustomButton from "../../button/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddData } from "../../../../hooks/useAddData/useAddData";
import { useEditData } from "../../../../hooks/useEdit/useEdit";
import SelectField from "../../selectField/SelectField";

const InitiativeForm = ({ defaultData }) => {
  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      title: defaultData?.title || "",
      category: defaultData?.category || "",
      establishedDate: defaultData?.establishedDate || "",
      status: defaultData?.status || "",
      description: defaultData?.description || "",
      logo: defaultData?.logo || "",
      image: defaultData?.image || "",

      socialMedia: {
        facebook: defaultData?.socialMedia?.facebook || "",
        email: defaultData?.socialMedia?.email || "",
        linkedin: defaultData?.socialMedia?.linkedin || "",
        website: defaultData?.socialMedia?.website || "",
      },

      projectOverview: {
        description: defaultData?.projectOverview?.description || "",
        startingDate: defaultData?.projectOverview?.startingDate || "",
        endDate: defaultData?.projectOverview?.endDate || "",
        projectBudget: defaultData?.projectOverview?.projectBudget || "",

        // donationReceived: defaultData?.projectOverview?.donationReceived || "",
        // projectReport: defaultData?.projectOverview?.projectReport || "",
        // overviewImage: defaultData?.projectOverview?.overviewImage || "",
      },
      projectOutcomes: {
        outcomeImage: defaultData?.outcomeImage,
        description: defaultData?.projectOutcomes?.description,
      },
      involvement: {
        involvementImage: defaultData?.involvementImage,
        description: defaultData?.involvement?.description,
      },
      objectives: {
        objectivesImage: defaultData?.objectivesImage,
        description: defaultData?.objectives?.description,
      },
      targetAudience: {
        audienceImage: defaultData?.audienceImage,
        description: defaultData?.targetAudience?.description,
      },
    },
  });

  const navigate = useNavigate();

  const { addData, isLoading: isAdding, error: addError } = useAddData();
  const { editData, isLoading: isEditing, error: editError } = useEditData();

  const onSubmit = async (data) => {
    console.log(data, "this is data file");
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("status", data?.status);
    formData.append("establishedDate", data?.establishedDate);

    formData.append("image", data?.image?.[0] || null);
    formData.append("logo", data?.logo?.[0] || null);
    formData.append("overviewImage", data?.overviewImage?.[0] || null);
    formData.append("outcomeImage", data?.outcomeImage?.[0] || null);
    formData.append("involvementImage", data?.involvementImage?.[0] || null);
    formData.append("objectivesImage", data?.objectivesImage?.[0] || null);
    formData.append("audienceImage", data?.audienceImage?.[0] || null);

    // Append socialMedia data to FormData
    formData.append("socialMedia[facebook]", data.socialMedia.facebook);
    formData.append("socialMedia[email]", data.socialMedia.email);
    formData.append("socialMedia[linkedin]", data.socialMedia.linkedin);
    formData.append("socialMedia[website]", data.socialMedia.website);

    // Append project Overview data to FormData
    formData.append(
      "projectOverview[description]",
      data.projectOverview.description
    );
    formData.append(
      "projectOverview[startingDate]",
      data.projectOverview.startingDate
    );
    formData.append("projectOverview[endDate]", data.projectOverview.endDate);
    formData.append(
      "projectOverview[projectBudget]",
      data.projectOverview.projectBudget
    );

    // Append project Outcome data to FormData
    formData.append(
      "projectOutcomes[description]",
      data.projectOutcomes.description
    );

    // Append project Overview data to FormData
    formData.append("involvement[description]", data.involvement.description);

    // Append project Overview data to FormData
    formData.append(
      "objectives[description]",
      data.projectOutcomes.description
    );

    formData.append(
      "targetAudience[description]",
      data.targetAudience.description
    );

    try {
      if (defaultData) {
        await editData(formData, "initiatives", defaultData._id);
        toast.success("Data updated successfully!");
      } else {
        await addData(formData, "initiatives");
        toast.success("Data added successfully!");
      }
      navigate("/initiatives");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${defaultData ? "update" : "add"} data`);
    }
  };
  const category = ["organizational", "project", "other"];
  const status = ["upcoming", "ongoing", "completed"];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInputField
        label='Title:'
        type='text'
        name='title'
        {...register("title")}
      />

      <div className='flex items-center gap-5'>
        <SelectField
          label='Status'
          name='status'
          options={status}
          {...register("status")}
        />
        <div className='w-full'>
          <label
            htmlFor='category'
            className='capitalize inline-block mb-1 pl-1 text-sm font-semibold'
          >
            category
          </label>
          <select
            id='category'
            name='category'
            {...register("category")}
            className={`capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500 `}
          >
            <option value='' disabled>
              select category
            </option>
            {category?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex items-center gap-10 mt-2'>
        <CustomInputField
          label='date:'
          type='date'
          name='establishedDate'
          {...register("establishedDate")}
        />
        <CustomInputField
          label='image:'
          type='file'
          name='image'
          control={control}
          onChange={(e) => setValue("image", e.target.files)}
        />
        <CustomInputField
          label='logo:'
          type='file'
          name='logo'
          control={control}
          onChange={(e) => setValue("logo", e.target.files)}
        />

        {defaultData?.logo && (
          <div className='w-40 mb-5'>
            <img
              className='w-full h-full object-cover'
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                defaultData?.logo
              }`}
              alt=''
            />
          </div>
        )}
      </div>

      <CustomInputField
        label='description:'
        type='text-area'
        name='description'
        {...register("description")}
      />

      <div className='grid grid-cols-4 gap-2'>
        {["facebook", "email", "linkedin", "website"].map(
          (socialMedia, index) => (
            <Controller
              key={index}
              name={`socialMedia.${socialMedia}`}
              control={control}
              defaultValue={getValues(`socialMedia?.[${socialMedia}]`) || ""}
              render={({ field }) => (
                <CustomInputField label={socialMedia} type='text' {...field} />
              )}
            />
          )
        )}
      </div>
      <div>
        <p className='border-b-2 font-bold mt-5 mb-2 p-1'>
          Initiative Overview
        </p>

        <CustomInputField
          label='Description:'
          type='text-area'
          name='projectOverview.description'
          {...register("projectOverview.description")}
        />
        <div className='grid grid-cols-2 gap-2'>
          <CustomInputField
            label='starting Date:'
            type='date'
            name='projectOverview.startingDate'
            {...register("projectOverview.startingDate")}
          />
          <CustomInputField
            label='end Date:'
            type='date'
            name='projectOverview.endDate'
            {...register("projectOverview.endDate")}
          />
        </div>

        {/* <div className='grid grid-cols-2 gap-2'> */}
        <CustomInputField
          label='project Budget:'
          type='number'
          name='projectOverview.projectBudget'
          {...register("projectOverview.projectBudget")}
        />

        {/* </div> */}
        <div className='grid grid-cols-2 gap-2'>
          <CustomInputField
            label='OverView Image:'
            type='file'
            name='overviewImage'
            control={control}
            onChange={(e) => setValue("overviewImage", e.target.files)}
          />
          {/* <CustomInputField
            label='project Report:'
            type='file'
            name='logo'
            control={control}
            onChange={(e) => setValue("logo", e.target.files)}
          /> */}

          {/* {defaultData?.logo && (
            <div className='w-40 mb-5'>
              <img
                className='w-full h-full object-cover'
                src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                  defaultData?.logo
                }`}
                alt=''
              />
            </div>
          )} */}
        </div>
      </div>
      <div>
        <p className='border-b-2 font-bold mt-5 mb-2 p-1 capitalize'>
          project Outcomes
        </p>

        <CustomInputField
          label='Description:'
          type='text-area'
          name='projectOutcomes.description'
          {...register("projectOutcomes.description")}
        />
        <CustomInputField
          label='Outcomes Image:'
          type='file'
          name='outcomeImage'
          control={control}
          onChange={(e) => setValue("outcomeImage", e.target.files)}
        />
        {/* 
        {defaultData?.logo && (
          <div className='w-40 mb-5'>
            <img
              className='w-full h-full object-cover'
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                defaultData?.logo
              }`}
              alt=''
            />
          </div>
        )} */}
      </div>
      <div>
        <p className='border-b-2 font-bold mt-5 mb-2 p-1 capitalize'>
          project involvement
        </p>

        <CustomInputField
          label='Description:'
          type='text-area'
          name='involvement.description'
          {...register("involvement.description")}
        />
        <CustomInputField
          label='involvement Image:'
          type='file'
          name='involvementImage'
          control={control}
          onChange={(e) => setValue("involvementImage", e.target.files)}
        />
        {/* 
        {defaultData?.logo && (
          <div className='w-40 mb-5'>
            <img
              className='w-full h-full object-cover'
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                defaultData?.logo
              }`}
              alt=''
            />
          </div>
        )} */}
      </div>

      <div>
        <p className='border-b-2 font-bold mt-5 mb-2 p-1 capitalize'>
          project objectives
        </p>

        <CustomInputField
          label='Description:'
          type='text-area'
          name='objectives.description'
          {...register("objectives.description")}
        />
        <CustomInputField
          label='Objective Image:'
          type='file'
          name='objectivesImage'
          control={control}
          onChange={(e) => setValue("objectivesImage", e.target.files)}
        />
        {/* 
        {defaultData?.logo && (
          <div className='w-40 mb-5'>
            <img
              className='w-full h-full object-cover'
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                defaultData?.logo
              }`}
              alt=''
            />
          </div>
        )} */}
      </div>
      <div>
        <p className='border-b-2 font-bold mt-5 mb-2 p-1 capitalize'>
          project target Audience
        </p>

        <CustomInputField
          label='Description:'
          type='text-area'
          name='targetAudience.description'
          {...register("targetAudience.description")}
        />
        <CustomInputField
          label='target Audience Image:'
          type='file'
          name='audienceImage'
          control={control}
          onChange={(e) => setValue("audienceImage", e.target.files)}
        />
        {/* 
        {defaultData?.logo && (
          <div className='w-40 mb-5'>
            <img
              className='w-full h-full object-cover'
              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                defaultData?.logo
              }`}
              alt=''
            />
          </div>
        )} */}
      </div>
      <CustomButton type='submit' disabled={isAdding || isEditing}>
        {isAdding || isEditing ? "Processing..." : "Submit"}
      </CustomButton>
      {(addError || editError) && (
        <p className='text-red-500 mt-2'>{addError || editError}</p>
      )}
    </form>
  );
};

export default InitiativeForm;
