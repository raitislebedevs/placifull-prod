import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichText = (props) => {
  const { t, value, initialValue, onChange, id } = props;
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
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
          height: 300,
          menubar: false,
          branding: false,
          plugins: [],
          toolbar:
            'undo redo | ' +
            'bold italic backcolor forecolor strikethrough fontsizeselect | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat ',
          content_style:
            'body { font-family:sans-serif,Helvetica,Arial; font-size:14px }',
        }}
      />
    </>
  );
};

export default RichText;
