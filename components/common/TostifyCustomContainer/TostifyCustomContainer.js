import { toast } from 'react-toastify';
import { Row, Col } from 'react-bootstrap';

const erorr = '/static/images/tostify/Error.png';
const info = '/static/images/tostify/Info.png';
const success = '/static/images/tostify/Success.png';
const warning = '/static/images/tostify/Warning.png';

const TostifyCustomContainer = (type, heading, message) => {
  switch (type) {
    case 'warning':
      return toast.warning(
        <Row className={'toast__custom__container'}>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} className={'toast__icon'}>
            <img src={warning} className="tostify__icon" alt="" />
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
      );
    case 'error':
      return toast.error(
        <Row className={'toast__custom__container'}>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} className={'toast__icon'}>
            <img src={erorr} className="tostify__icon" alt="" />{' '}
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
      ); // look this line
    case 'success':
      return toast.success(
        <Row className={'toast__custom__container'}>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} className={'toast__icon'}>
            <img src={success} className="tostify__icon" alt="" />{' '}
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
      );
    case 'info':
      return toast.info(
        <Row className={'toast__custom__container'}>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} className={'toast__icon'}>
            <img src={info} className="tostify__icon" alt="" />{' '}
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
      );
    default:
      return toast(message);
  }
};

export default TostifyCustomContainer;
