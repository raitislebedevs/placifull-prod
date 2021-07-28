import { toast } from 'react-toastify';

const erorr = '/static/images/tostify/Error.png';
const info = '/static/images/tostify/Info.png';
const success = '/static/images/tostify/Success.png';
const warning = '/static/images/tostify/Warning.png';

const TostifyCustomContainer = (type, message, ...rest) => {
  switch (type) {
    case 'warning':
      return toast.warning(
        <div className={'toast__custom__container'}>
          <img src={warning} className="tostify__icon" alt="" />
          <div className={'message__field'}>
            <div className="heading">Warning</div>
            <div className="text">{message}</div>
          </div>
        </div>
      );
    case 'error':
      return toast.error(
        <div className={'toast__custom__container'}>
          <img src={erorr} className="tostify__icon" alt="" />{' '}
          <div className={'message__field'}>
            <div className="heading">Error</div>
            <div className="text">{message}</div>
          </div>
        </div>
      ); // look this line
    case 'success':
      return toast.success(
        <div className={'toast__custom__container'}>
          <img src={success} className="tostify__icon" alt="" />{' '}
          <div className={'message__field'}>
            <div className="heading">Success</div>
            <div className="text">{message}</div>
          </div>
        </div>
      );
    case 'info':
      return toast.info(
        <div className={'toast__custom__container'}>
          <img src={info} className="tostify__icon" alt="" />{' '}
          <div className={'message__field'}>
            <div className="heading">Info</div>
            <div className="text">{message}</div>
          </div>
        </div>
      );
    default:
      return toast(message);
  }
};

export default TostifyCustomContainer;
