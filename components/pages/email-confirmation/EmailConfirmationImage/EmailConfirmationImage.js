import { Col } from 'react-bootstrap';

const background = '/static/images/background/EmailConfirmed.png';

const EmailConfirmationImage = (props) => {
  let { t } = props;

  return (
    <Col className="image-container" xs={12} sm={12} md={12} lg={8} xl={8}>
      <div className="image">
        <img
          src={background}
          className="email__confirmed__background"
          alt="confirmedEmail"
        />
      </div>
    </Col>
  );
};

export default EmailConfirmationImage;
