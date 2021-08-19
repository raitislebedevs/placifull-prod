import { Col } from 'react-bootstrap';

const background =
  'https://placifull-static.s3.eu-central-1.amazonaws.com/ForgetPasswordBackground.webp';

const ForgotPasswordImage = (props) => {
  let { t } = props;

  return (
    <Col className="image-container" xs={12} sm={12} md={12} lg={8} xl={8}>
      <div
        className="image"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
    </Col>
  );
};

export default ForgotPasswordImage;
