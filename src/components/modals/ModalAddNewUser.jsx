import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modal.scss"
import { useEffect, useState } from 'react';
import {getGroupAxios} from '../../services/groupService'
import { toast } from 'react-toastify';
import {createAddNewUser,fetchEditUser} from '../../services/userService'

const ModalAddNewUser = (props) => {

    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [group, setGroup] = useState('')
    const [gender, setGender] = useState('male')

    const [getGroup, setGetGroup] = useState({})

    const checkIsValid = {
        isUserName: true,
        isEmail: true,
        isPassword: true,
        isPhone: true,
        isName: true,
        isAddress: true,
        isGroup: true,
        IsGender:true
    }
    const [objCheckValid, setObjCheckValid] = useState(checkIsValid)

    const handleGetGroup = async() => {
        const response = await getGroupAxios();
        if (response && response.EC === 0) {
            setGetGroup(response.DT)
        } else {
            console.log('group fail')
        }
    }

    useEffect(() => {
        handleGetGroup()

        //check edit
        if (props.action === 'EDIT' && props.data) {
            setUserId(props.data.id)
            setUserName(props.data.userName || '');
            setEmail(props.data.email || '');
            setPhone(props.data.phone || '');
            setName(props.data.name || '');
            setPassword('')
            setAddress(props.data.address || '');
            setGroup(props.data.groupId || '');
            setGender(props.data.gender || 'male');
        }
        //check create
        if (props.action === 'CREATE') {
            setUserName('');
            setEmail('');
            setPhone('');
            setName('');
            setAddress('');
            setGroup('');
            setGender('male');
        }
    }, [props.action, props.data])

    // check valid
    const handleCheckValid = () => {
        setObjCheckValid(checkIsValid)

        if (!email) {
            toast.error('Please enter your email')
            setObjCheckValid({...checkIsValid, isEmail: false})
            return
        }
        let re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            toast.error('Please enter your email')
            setObjCheckValid({...checkIsValid, isEmail: false})
            return
        }
        if (!userName) {
            toast.error('Please enter your username')
            setObjCheckValid({...checkIsValid, isUserName: false})
            return
        }
        if (!password && props.action == 'CREATE') {
            toast.error('Please enter your password')
            setObjCheckValid({...checkIsValid, isPassword: false})
            return
        }
        if (password && password.length < 6  && props.action == 'CREATE') {
            toast.error('Password must be at least 6 characters long')
            setObjCheckValid({...checkIsValid, isPassword: false})
            return
        }
        if (!phone) {
            toast.error('Please enter your phone')
            setObjCheckValid({...checkIsValid, isPhone: false})
            return
        }
        if (!phone.match(/^0\d{9}$/)) {
            toast.error('Phone number must start with 0 and be exactly 10 digits long')
            setObjCheckValid({...checkIsValid, isPhone: false})
            return
        }
        if(!group) {
            toast.error('Please select a role for the user.')
            setObjCheckValid({...checkIsValid, isGroup: false})
            return
        }
        if (!name) {
            toast.error('Please enter your name')
            setObjCheckValid({...checkIsValid, isName:false})
            return
        }
        if (name && name.length < 2) {
            toast.error('Please your name must be at least 2 characters long')
            setObjCheckValid({...checkIsValid, isName:false})
            return
        }
        return true
    }

    const handleCreateUser = async () => {
        const check = handleCheckValid()
        if (check) {
            const resUser = await createAddNewUser(userName, password, email, phone, name, address, gender, group);
            if (resUser && resUser.EC === 0) {
                toast.success(resUser.EM)
                setUserName('')
                setEmail('')
                setPassword('')
                setPhone('')
                setName('')
                setGroup('')
                setAddress('')
                props.handleClose()
            } else {
                toast.error(resUser.EM)
            }
        }
    }

    const handleEditUser = async ()=> {
        const check = handleCheckValid()

        if (check) {
            const resEdit = await fetchEditUser(userId, name, address, gender, group);
            if (resEdit && resEdit.EC === 0) {
                toast.success(resEdit.EM)
                props.handleClose()
            } else {
                toast.error(resEdit.EM)
            }
        }

    }
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
                    <h3>{props.action == 'CREATE' ? "Create add new user" : "Edit a user"}</h3>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Email <span className="red">*</span> </label>
                            <input type="email" name='email' readOnly={props.action === 'EDIT'} value={email} onChange={e => setEmail(e.target.value)} className={objCheckValid.isEmail ? 'form-control' : 'form-control is-invalid'}/>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">UserName <span className="red">*</span> </label>
                            <input type="text" value={userName} readOnly={props.action === 'EDIT'} onChange={e => setUserName(e.target.value)} className={objCheckValid.isUserName ? 'form-control' : 'form-control is-invalid'}/>
                        </div>
                        {
                            props.action === 'CREATE' && (
                                <div className="col-12 col-sm-6 form-group">
                                    <label htmlFor="">Password <span className="red">*</span> </label>
                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className={objCheckValid.isPassword ? 'form-control' : 'form-control is-invalid'}/>
                                </div>
                            )
                        }
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Phone <span className="red">*</span> </label>
                            <input type="text" value={phone} readOnly={props.action === 'EDIT'} onChange={e => setPhone(e.target.value)} className={objCheckValid.isPhone ? 'form-control' : 'form-control is-invalid'}/>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Name <span className="red">*</span> </label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className={objCheckValid.isName ? 'form-control' : 'form-control is-invalid'}/>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Address </label>
                            <input type="text" value={address} onChange={e => setAddress(e.target.value)} className='form-control'/>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Group (<span className="red">*</span>) </label>
                            <select 
                                name='groupId' aria-label="Default select example"
                                value={group} onChange={e => setGroup(e.target.value)} 
                                className={objCheckValid.isGroup ? 'form-select' : 'form-select is-invalid'}
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
                <Button variant="primary" onClick={props.action === 'CREATE' ?handleCreateUser : handleEditUser}>
                    {props.action === 'CREATE' ? 'Save' : 'Update'}
                </Button>
                </Modal.Footer>
            </Modal>
        
        </>
    )
}

export default ModalAddNewUser