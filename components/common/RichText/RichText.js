import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichText = (props) => {
  const { t, value, initialValue, handleOnChange, id, setPureText } = props;
  const editorRef = useRef(null);
  const onChange = () => {
    if (editorRef.current) {
      let richText = editorRef.current.getContent();
      var pureText = editorRef.current
        .getContent({ format: 'text' })
        .replace(/\r?\n|\r/g, '');

      setPureText(pureText);
      handleOnChange({ target: { value: richText, id } });
    }
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey="jwgx0g1bfwyf0dr8n85l6tbxbeqp20gj03guip3t517bym73"
        initialValue={initialValue}
        value={value}
        onChange={onChange}
        init={{
          selector: id,
          icons: 'thin',
          branding: false,
          plugins:
            'print preview importcss fullscreen hr pagebreak advlist lists checklist help ',

          menubar: false,
          toolbar:
            'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist   | forecolor backcolor  removeformat | fullscreen  preview print ',
          height: 300,
          mobile: {
            menubar: false,
            plugins:
              'print preview importcss fullscreen hr pagebreak advlist lists checklist help ',
            toolbar:
              'bold italic underline | forecolor backcolor  removeformat | numlist',
          },
          //checklist to add later
          //bullist needs to sort out styling.
        }}
      />
    </>
  );
};

export default RichText;
