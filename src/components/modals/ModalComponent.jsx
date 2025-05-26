import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalComponent = (props) => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button> */}

            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
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
                <Button variant="primary" onClick={props.handleConfirm}>Confirm</Button>
                </Modal.Footer>
            </Modal>

        </>
    )

}


export default ModalComponent