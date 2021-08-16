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
