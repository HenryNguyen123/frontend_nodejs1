import './role.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';

const RolesComponent = () => {
    const [listChild, setListChild] = useState({
        child : {url:'', description:''}
    })

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChild)
        _listChilds[key][name] = value
        setListChild(_listChilds)

    }

    const handleAddNew = () => {
        let _listChilds = _.cloneDeep(listChild)
        _listChilds[`child-${uuidv4()}`] = {
            url: '',
            description:''
        }
        setListChild(_listChilds)
    }

    const handleDelete = (key) => {
        let _listChilds = _.cloneDeep(listChild)
        delete _listChilds[key]
        setListChild(_listChilds)
    }
    return(
        <>
            <div className="role-container">
                <div className="container">
                    <div className="mt-3"> 
                        <div className="role-title">
                            <h4>Add new role</h4>
                        </div>
                        <div className="row col-12 role-parent">
                            {
                                Object.entries(listChild).map(([key, value], index)=> {
                                    return(
                                            <div className="row role-fisrt-child" key={key}>
                                                <div className="col-5 form-group">
                                                    <label htmlFor="">Url:</label>
                                                    <input type="text" className='form-control' value={value.url} onChange={(e) => handleOnchangeInput('url', e.target.value, key)}/>
                                                </div>
                                                <div className="col-5 form-group">
                                                    <label htmlFor="">Description:</label>
                                                    <input type="text"  className='form-control' value={value.description} onChange={e => handleOnchangeInput('description', e.target.value, key)}/>
                                                </div>
                                                <div className="col-2 mt-4">
                                                    <button className='btn  btn-primary' onClick={handleAddNew}><FontAwesomeIcon icon={faCirclePlus} /></button>
                                                    {index >=1 && <button className='btn  btn-warning' onClick={() => handleDelete(key)}><FontAwesomeIcon icon={faTrash} /></button>}
                                                </div>
                                            </div>
                                    )
                                })
                            }
                            <div className='mt-2'>
                                <button className='btn btn-warning'>SAVE</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default RolesComponent