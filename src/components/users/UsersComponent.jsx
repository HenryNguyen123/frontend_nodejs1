import { useEffect, useState } from 'react';
import './users.scss'
import {fetchAllUsers} from '../../services/userService'
import ReactPaginate from 'react-paginate';
import { deleteUser } from '../../services/userService';
import { toast } from 'react-toastify';
import ModalComponent from '../modals/ModalComponent';
import ModalAddNewUser from '../modals/ModalAddNewUser';
// import {getGroupAxios} from '../../services/groupService'

const UsersComponent = () => {
    
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurentLimit] = useState(2)
    const [totlaPage, setTotalPage] = useState(0);
    const [dataUser, setDataUser] = useState()

    const [isModal, setIsModal] = useState(false)
    const [isModalAddNewUser, setIsModalAddNewUser] = useState(false)
    
    useEffect(() => {
        setCurentLimit(2)
        fetchUsers()

    }, [currentPage])

    const fetchUsers = async()=> {
        const response = await fetchAllUsers(currentPage, currentLimit)

        if (response && response.data && response.data.EC ===0) {
            setListUser(response.data.DT.users)
            // console.log(response.data.DT)

            setTotalPage(response.data.DT.totalPages)
        } else {
            console.log('get data user faill')
        }
    }

    const handleRefesh = () => {
        window.location.reload()
    }

    // pagination
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1)
    };

    // function modal delete user 
    const handleDeleteUser = async (data) => {
        setIsModal(!isModal)
        setDataUser(data)
    }
    const handleClose = ()=> {
        setIsModal(false)
        setDataUser({})
    }
    const titleModal = 'Delete User'
    const contentModal= `Do you want to delete ${dataUser ? dataUser.name : ''}?`
    const handleConfirm = async() => {
        if (dataUser) {
            const response = await deleteUser(dataUser)
            if (response && response.data.EC === 0 ) {
                toast.success(response.data.EM)
                fetchUsers()
                setIsModal(false)
                return
            } else {
                toast.error(response.data.EM)
            }
        }
        toast.error('Delete user unsuccessfuly')

    }

    // function modal add new user
    const handleAddNewUser = () => {
        setIsModalAddNewUser(true)
    }
    const handleCloseModalAddNewUser = () => {
        setIsModalAddNewUser(false)
    }
    const handleConfirmAddNewUser = () => {



        setIsModalAddNewUser(false)
    }


        // const [getGroup, setGetGroup] = useState({})
    
        // const handleGetGroup = async() => {
        //     const response = await getGroupAxios();
        //     console.log(response)
        //     if (response && response.length > 0) {
        //         setGetGroup(response)
        //         console.log('group >>> ', getGroup)
        //     } else {
        //         console.log('fail group')
        //     }
        // }
    
        // useEffect(() => {
        // }, [])
    return(
        <>
            <div className="container">
                <div className="mamage-user-container">
                    <div className="user-header">
                        <div className="title">
                            <h1>Table Users</h1>
                        </div>
                        <div className="actions">
                            <button className='btn btn-success' onClick={handleRefesh}>Refesh</button>
                            <button className='btn btn-primary' onClick={handleAddNewUser}>Add New User</button>
                        </div>
                        <div className="user-body">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUser && listUser.length > 0 ? (
                                        listUser.map((item, index) => (
                                            <tr key={item.id || index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.userName}</td>
                                                <td>{item.Group?.name || 'N/A'}</td>
                                                <td>
                                                    <button type="button" className='btn btn-warning mx-3'>
                                                        Edit
                                                    </button>
                                                    <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(item)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">No Users Found</td>
                                        </tr>
                                    )}

                                </tbody>
                                </table>
                        </div>
                    </div>
                    
                    {
                        totlaPage > 1 &&
                            <div className="user-footer">
                                <div className="pagination  justify-content-center">
                                    <ReactPaginate
                                        nextLabel="next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={2}
                                        pageCount={totlaPage}
                                        previousLabel="< previous"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination"
                                        activeClassName="active"
                                        renderOnZeroPageCount={null}
                                    />

                                </div>
                            </div>
                    }
                </div>
            </div>
            {/* modal delete user */}
            <ModalComponent     
                show={isModal} 
                handleClose={handleClose} 
                titleModal={titleModal} 
                contentModal={contentModal} 
                handleConfirm={handleConfirm}
            />

            {/* modal add new user */}
            <ModalAddNewUser 
                show={isModalAddNewUser} 
                title={'Create new a user'}
                handleClose={handleCloseModalAddNewUser} 
                handleConfirm={handleConfirmAddNewUser}
            />


        </>
    )
}

export default UsersComponent;