import { Col } from 'react-bootstrap';

const background =
  'https://placifull-static.s3.eu-central-1.amazonaws.com/LogInBackground.jpg';

const SigninImage = (props) => {
  let { t } = props;

  return (
    <Col className="image-container" xs={12} sm={12} md={12} lg={7} xl={8}>
      <div
        className="image"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
    </Col>
  );
};

export default SigninImage;
