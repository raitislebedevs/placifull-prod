import { Modal, Spinner } from 'react-bootstrap';

const SpinnerModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      backdrop="static"
      centered
      className="spiner__modal"
    >
      <Modal.Body>
        <Spinner
          as="span"
          animation="border"
          size="xl"
          role="status"
          variant="danger"
        />
      </Modal.Body>
    </Modal>
  );
};

export default SpinnerModal;
