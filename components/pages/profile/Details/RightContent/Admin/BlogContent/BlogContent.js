import { AiOutlineUser } from 'react-icons/ai';
import { FiMessageCircle } from 'react-icons/fi';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { SelectInputSubmit } from 'components/common';
import { BlogService } from 'services';
import { useDropzone } from 'react-dropzone';
import { FaRegTimesCircle } from 'react-icons/fa';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import RichText from 'components/common/RichText';

const BlogContent = (props) => {
  const { t, user, dispatch } = props;
  const [inputValues, setInputValues] = useState({
    author: ' ',
    blogInformation: '',
    blogType: '',
  });

  const [files, setFiles] = useState([]);
  const [pureText, setPureText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const blogOptions = [
    {
      value: '',
      label: 'Blog Type',
      id: 'blogType',
    },
    {
      value: 'realEstate',
      label: 'Real Estate',
      id: 'blogType',
    },
    {
      value: 'transport',
      label: 'Transport',
      id: 'blogType',
    },
    {
      value: 'job',
      label: 'Jobs',
      id: 'blogType',
    },
    {
      value: 'other',
      label: 'Other',
      id: 'blogType',
    },
  ];

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const insertNewBlogPost = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (!inputValues?.header) {
      setIsSubmitting(false);
      return;
    }
    if (!inputValues?.blogInformation) {
      setIsSubmitting(false);
      return;
    }
    if (!inputValues?.blogType) {
      setIsSubmitting(false);
      return;
    }
    if (!inputValues?.author) {
      setIsSubmitting(false);
      return;
    }
    try {
      let payload = {
        header: inputValues.header,
        blogInformation: inputValues.blogInformation,
        blogInformationText: pureText,
        blogType: inputValues.blogType,
        author: inputValues.author,
        insertDate: new Date(),
        blogInformationText: pureText,
        popularity: {
          views: 1,
          rating: 5,
          voteCount: 0,
        },
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(payload));
      if (inputValues?.gallery) {
        inputValues?.gallery.forEach((file) => {
          formData.append(`files.gallery`, file);
        });
      }

      await BlogService.CREATE(formData);

      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
      console.log(e);
    }
  };

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
    handleOnChange({ target: { value: files, id: 'gallery' } });
  }, [files]);

  return (
    <div className="right-content__profile">
      <div className="card-body">
        <h5 className="text-md-left">Blog Entry input</h5>
        <Form>
          <Row className="mt-4">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group>
                <div className="profile__input">
                  <AiOutlineUser className="input__icon" size="20px" />
                  <Form.Control
                    name="header"
                    id="header"
                    type="text"
                    onChange={handleOnChange}
                    className="input__text"
                    maxLength={'33'}
                    placeholder={'Blog Post Header'}
                  />
                </div>
              </Form.Group>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <Form.Group>
                <SelectInputSubmit
                  id={'blogType'}
                  clearIds={[]}
                  maxLength={10}
                  onChange={handleOnChange}
                  isSearchable={true}
                  options={blogOptions}
                  placeholder={'Blog Type'}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Form.Group>
                <div className="profile__input">
                  <AiOutlineUser className="input__icon" size="20px" />
                  <Form.Control
                    name="author"
                    id="author"
                    type="text"
                    onChange={handleOnChange}
                    className="input__text"
                    maxLength={'33'}
                    placeholder={'Author'}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group>
                <div className="profile__input form-control-container">
                  <FiMessageCircle className="input__icon" size="20px" />
                  <RichText
                    name="blogInformation"
                    rows={17}
                    id="blogInformation"
                    type="text"
                    as="textarea"
                    setPureText={setPureText}
                    handleOnChange={handleOnChange}
                    maxLength={'5000'}
                    className="form-control input__text"
                    initialValue={'Blog information'}
                  />
                  <>
                    <div className={'max__length__counter'}>
                      {5000 - inputValues.blogInformation?.length}
                    </div>
                  </>
                </div>
              </Form.Group>
            </Col>
            <Col lg={12}>
              <div {...getRootProps({ className: 'section__dropzone' })}>
                <input {...getInputProps()} />
                <div className="dropzone__icon">
                  <RiUploadCloud2Fill className="item__icon" />
                </div>
                <div className="dropzone__text">{'Click or Drag and drop'}</div>
              </div>
            </Col>

            <section className="container">
              <aside className="dropzone-thumbnail-container">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="dropzone-thumbnail-container__thumb"
                  >
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
                        alt="preview icons"
                      />
                    </div>
                  </div>
                ))}
              </aside>
            </section>
          </Row>
          <Row className="mt-4">
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="mt-2 blog__button"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={insertNewBlogPost}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                    />{' '}
                    {'Saving New Blog Post'}
                  </>
                ) : (
                  'Insert New Blog Post'
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default BlogContent;
