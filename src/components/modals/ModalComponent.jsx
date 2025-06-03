import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalComponent = (props) => {
    return (
        <>

            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    {props.titleModal}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.contentModal}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="warning" onClick={props.handleConfirm}>Confirm</Button>
                </Modal.Footer>
            </Modal>

        </>
    )

}


export default ModalComponent