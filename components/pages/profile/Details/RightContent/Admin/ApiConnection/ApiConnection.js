import { AiOutlineUser } from 'react-icons/ai';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { SelectInputSubmit } from 'components/common';
import { BlogService } from 'services';
import { useDropzone } from 'react-dropzone';
import { FaRegTimesCircle, FaHeading } from 'react-icons/fa';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import RichText from 'components/common/RichText';

const ApiConnection = (props) => {
  const { t, user, dispatch } = props;
  const [inputValues, setInputValues] = useState({
    author: ' ',
    blogInformation: '',
    blogType: '',
    photograph: '',
  });

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const blogOptions = [
    {
      value: '',
      label: 'Listing Type',
      id: 'listingType',
    },
    {
      value: 'realEstate',
      label: 'Real Estate',
      id: 'listingType',
    },
    {
      value: 'transport',
      label: 'Transport',
      id: 'listingType',
    },
    {
      value: 'job',
      label: 'Jobs',
      id: 'listingType',
    },
  ];

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.json|.xml|.csv',
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

  const insertListing = (e) => {
    console.log(e);
  };

  useEffect(() => {
    handleOnChange({ target: { value: files, id: 'gallery' } });
  }, [files]);

  return (
    <div className="right-content__profile">
      <div className="card-body">
        <h5 className="text-md-left">Api Development</h5>
        <Form>
          <Row className="mt-4">
            <Col lg={6} md={6} sm={12}>
              <Form.Group>
                <SelectInputSubmit
                  id={'listingType'}
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
                    placeholder={'Notes'}
                  />
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
                onClick={insertListing}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                    />{' '}
                    {'Saving New Listing'}
                  </>
                ) : (
                  'Insert New Listing'
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ApiConnection;
