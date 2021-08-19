import { toast } from 'react-toastify';
import { Row, Col } from 'react-bootstrap';

const erorr =
  'https://placifull-static.s3.eu-central-1.amazonaws.com/Error.webp';
const info = 'https://placifull-static.s3.eu-central-1.amazonaws.com/Info.webp';
const success =
  'https://placifull-static.s3.eu-central-1.amazonaws.com/Success.webp';
const warning =
  'https://placifull-static.s3.eu-central-1.amazonaws.com/Warning.webp';

const Container = (props) => <div>{props.children}</div>;

const TostifyCustomContainer = (type, heading, message) => {
  switch (type) {
    case 'warning':
      return toast.warning(
        <Container>
          <Row className={'toast__custom__container'}>
            <Col xs={2} sm={2} md={2} lg={2} xl={2} className={'toast__icon'}>
              <img src={warning} className="tostify__icon" alt="Warning" />
            </Col>
            <Col
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={10}
              className={'message__field'}
            >
              <div className="heading">{heading}</div>
              <div className="text">{message}</div>
            </Col>
          </Row>
        </Container>
      );
    case 'error':
      return toast.error(
        <Container>
          <Row className={'toast__custom__container'}>
            <Col xs={2} sm={2} md={2} lg={2} xl={2} className={'toast__icon'}>
              <img src={erorr} className="tostify__icon" alt="Erorr" />{' '}
            </Col>
            <Col
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={10}
              className={'message__field'}
            >
              {' '}
              <div className="heading">{heading}</div>
              <div className="text">{message}</div>
            </Col>
          </Row>
        </Container>
      ); // look this line
    case 'success':
      return toast.success(
        <Container>
          <Row className={'toast__custom__container'}>
            <Col xs={2} sm={2} md={2} lg={2} xl={2} className={'toast__icon'}>
              <img src={success} className="tostify__icon" alt="Success" />{' '}
            </Col>
            <Col
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={10}
              className={'message__field'}
            >
              <div className="heading">{heading}</div>
              <div className="text">{message}</div>
            </Col>
          </Row>
        </Container>
      );
    case 'info':
      return toast.info(
        <Container>
          <Row className={'toast__custom__container'}>
            <Col xs={2} sm={2} md={2} lg={2} xl={2} className={'toast__icon'}>
              <img src={info} className="tostify__icon" alt="Info" />{' '}
            </Col>
            <Col
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={10}
              className={'message__field'}
            >
              <div className="heading">{heading}</div>
              <div className="text">{message}</div>
            </Col>
          </Row>
        </Container>
      );
    default:
      return toast(message);
  }
};

export default TostifyCustomContainer;
