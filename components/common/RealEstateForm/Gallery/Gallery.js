import { useState, useEffect } from 'react';
import { SectionHeading, CustomFormControl } from 'components/common';
import { useDropzone } from 'react-dropzone';
import { Row, Col, Form } from 'react-bootstrap';
import { FaRegTimesCircle } from 'react-icons/fa';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { maxTotalSize } from 'constants/fileManipulation';

const Gallery = (props) => {
  const { t, inputValues, handleOnChange } = props;
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      var totalSize = acceptedFiles.reduce((a, b) => a + (b.size || 0), 0);
      if (totalSize > maxTotalSize) {
        TostifyCustomContainer(
          'warning',
          t('common:toast.messages.warning'),
          t('validation:size')
        );
        return;
      }

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleRemoveFile = (fileIndex) => {
    setFiles((prev) => [
      ...prev.slice(0, fileIndex),
      ...prev.slice(fileIndex + 1),
    ]);
  };

  useEffect(() => {
    handleOnChange({ target: { value: files, id: 'listingGallery' } });
  }, [files]);

  return (
    <div className="form__section">
      <SectionHeading>
        <>
          {t('real-estate-submit:form.gallery.real-estate')}
          <sup className={'mandatory__field'}>*</sup>
        </>
      </SectionHeading>
      <Row>
        <Col lg={12}>
          <div {...getRootProps({ className: 'section__dropzone' })}>
            <input {...getInputProps()} />
            <div className="dropzone__icon">
              <RiUploadCloud2Fill className="item__icon" />
            </div>
            <div className="dropzone__text">
              {t('real-estate-submit:form.gallery.click-drop')}
            </div>
          </div>
        </Col>

        <section className="container">
          <aside className="dropzone-thumbnail-container">
            {files.map((file, index) => (
              <div key={index} className="dropzone-thumbnail-container__thumb">
                <div className="thumb__inner">
                  <div
                    className="inner__remove"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <FaRegTimesCircle size={18} />
                  </div>
                  <img
                    src={file.preview}
                    className="inner__image"
                    alt="Preview File"
                  />
                </div>
              </div>
            ))}
          </aside>
        </section>

        <Col lg={12} className={'decorator__container'}>
          <Form.Group>
            <AiOutlineVideoCamera />
            <CustomFormControl
              onChange={handleOnChange}
              value={inputValues.videoLink}
              id="videoLink"
              valueLength={250 - inputValues['videoLink']?.length}
              maxLength={'250'}
              type="text"
              label={t('real-estate-submit:form.gallery.video-url')}
              autoComplete="current-text"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Gallery;
