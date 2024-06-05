import PropTypes from "prop-types"; // Import PropTypes

import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full mb-5'>
      {label && (
        <label className='capitalize inline-block mb-1 pl-1 font-semibold text-sm'>
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='rq7qkmgh9lqrljq613erd1nv5w81c01ur3omo9iq8td2pjo0'
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              width: "100%",
              height: 400,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks  fontfamily fontsize | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
// Define propTypes for the component
RTE.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
};
