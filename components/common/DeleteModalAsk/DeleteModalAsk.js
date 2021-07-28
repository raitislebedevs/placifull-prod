import { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const DeleteModalAsk = (props) => {
  const {
    isShowDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    bodyText,
    headerText,
    submitText,
    cancelText,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await handleDelete();
    setIsLoading(false);
  };

  return (
    <Modal
      show={isShowDeleteModal}
      onHide={handleCloseDeleteModal}
      size="md"
      backdrop="static"
      centered
      className="delete-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyText}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => handleCloseDeleteModal()}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSubmit()}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" />{' '}
              {submitText}
            </>
          ) : (
            submitText
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModalAsk;
