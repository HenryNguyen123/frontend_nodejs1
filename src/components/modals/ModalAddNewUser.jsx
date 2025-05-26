import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modal.scss"
import { useEffect, useState } from 'react';
import {getGroupAxios} from '../../services/groupService'
const ModalAddNewUser = (props) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [group, setGroup] = useState('')
    const [gender, setGender] = useState('male')

    const [getGroup, setGetGroup] = useState({})

    const handleGetGroup = async() => {
        const response = await getGroupAxios();
        console.log(response)
        if (response && response.data && response.data.EC === 0) {
            setGetGroup(response.data.DT)
        } else {
            console.log('group fail')
        }
    }

    useEffect(() => {
        handleGetGroup()
    }, [])
    return(
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
                centered
                className='modal-user'
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    <h3>{props.title}</h3>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>body</h1>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Email <spans className="red">*</spans> </label>
                            <input type="email" name='email' value={email} onChange={e => setEmail(e.target.value)} className='form-control'/>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">UserName <spans className="red">*</spans> </label>
                            <input type="text" value={userName} onChange={e => setUserName(e.target.value)}  className='form-control'/>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Password <spans className="red">*</spans> </label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)}  className='form-control'/>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Phone <spans className="red">*</spans> </label>
                            <input type="text" value={phone} onChange={e => setPhone(e.target.value)}  className='form-control'/>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Name <spans className="red">*</spans> </label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)}  className='form-control'/>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Address </label>
                            <input type="text" value={address} onChange={e => setAddress(e.target.value)}  className='form-control'/>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Group (<spans className="red">*</spans>) </label>
                            <select 
                                className="form-select" name='groupId' aria-label="Default select example"
                                value={group} onChange={e => setGroup(e.target.value)} 
                            >
                                <option defaultChecked>Open this select menu</option>
                                {
                                    getGroup && getGroup.length > 0 && (
                                        getGroup.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Gender</label>
                            <select 
                                className="form-select" name='sex' aria-label="Default select example"
                                value={gender} onChange={e => setGender(e.target.value)} 
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            
                        </div>
                    </div>
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

export default ModalAddNewUser