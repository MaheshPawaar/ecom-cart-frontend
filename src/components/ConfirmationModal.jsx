import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const ConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  title,
  body,
  confirmText,
  cancelText,
  confirmVariant,
  cancelVariant
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant={cancelVariant} onClick={onHide}>
          {cancelText || 'Cancel'}
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm}>
          {confirmText || 'Confirm'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmVariant: PropTypes.string,
  cancelVariant: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmVariant: 'primary',
  cancelVariant: 'secondary'
};

export default ConfirmationModal;
