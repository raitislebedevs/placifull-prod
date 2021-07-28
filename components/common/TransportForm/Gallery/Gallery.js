import { useState, useEffect } from 'react';
import { SectionHeading, CustomFormControl } from 'components/common';
import { useDropzone } from 'react-dropzone';
import { Row, Col, Form } from 'react-bootstrap';
import { FaRegTimesCircle } from 'react-icons/fa';
import { RiUploadCloud2Fill } from 'react-icons/ri';

const Gallery = (props) => {
  const { t, inputValues, handleOnChange } = props;
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
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
          {t('transport-submit:form.gallery.heading')}
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
              {t('transport-submit:form.gallery.click-drop')}
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
                  <img src={file.preview} className="inner__image" />
                </div>
              </div>
            ))}
          </aside>
        </section>

        <Col lg={12} md={12} sm={6}>
          <Form.Group>
            <CustomFormControl
              onChange={handleOnChange}
              value={inputValues.transportVideoLink}
              id="transportVideoLink"
              type="text"
              style={{ resize: 'none' }}
              label={t('transport-submit:form.gallery.video-url')}
              autoComplete="current-text"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Gallery;
