import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setHandleShow } from '../store/slices/handleShow.slice';

const ModalAlert = () => {
    const dispatch = useDispatch()

    const show = useSelector(state => state.handleShow)
    const titleModal = useSelector(state => state.titleModal)

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered show={show}
            onHide={() => dispatch(setHandleShow(false))}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header
                closeButton
                style={{ boxShadow: "0 0 30px #00000095" }}
            >
                <Modal.Title>{titleModal}</Modal.Title>
            </Modal.Header>
        </Modal>
    );
};

export default ModalAlert;