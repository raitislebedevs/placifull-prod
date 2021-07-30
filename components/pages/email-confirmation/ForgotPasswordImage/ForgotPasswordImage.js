import { Col } from 'react-bootstrap'

const background = '/static/images/background/ForgetPasswordBackground.jpg';

const ForgotPasswordImage = (props) => {
  let { t } = props;

  return (
    <Col className="image-container" xs={12} sm={12} md={12} lg={8} xl={8}>
      <div className="image" style={{ backgroundImage: `url(${background})` }}></div>
    </Col>
  );
};

export default ForgotPasswordImage;
