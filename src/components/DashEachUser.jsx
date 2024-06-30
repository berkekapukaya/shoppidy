import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import {useState} from "react";
import axios from "axios";


const DashEachUser = ({onDelete, fetchUsers, user}) => {

    const [isEditing, setIsEditing] = useState(false);

    const URL = 'https://mynode-mb4z.onrender.com';

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
    }

    const saveChanges = async (userId, updatedUser) => {
        try {

            const {_id, __v, password, createdAt, updatedAt, ...rest} = updatedUser;

            const token = localStorage.getItem('token');

            await axios.put(`${URL}/api/users/auth/${userId}`,
                rest,
                {
                    headers: {
                        'x-auth-token': token,
                    }
                }
            );
            // After successful update, fetch updated list of products
            fetchUsers();
            // Exit edit mode
            toggleEditMode();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };


    const Editing = () => {

        const [updatedUser, setUpdatedUser] = useState({
            name: "",
            email: "",
            isAdmin: user.isAdmin,
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;

            if(name === "isAdmin"){
                setUpdatedUser(prevState => ({
                    ...prevState,
                    isAdmin: !updatedUser.isAdmin,
                }));
                console.log(updatedUser.isAdmin)
            }else{
                setUpdatedUser(prevState => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        };

        return (
            <div className="dash-user">
                <div className="name">
                    <input
                        className="dash-user-input"
                        type="text"
                        placeholder={user.name}
                        onChange={handleInputChange}
                        value={updatedUser.name}
                        name="name"
                    />
                </div>
                <div className="email">
                    <input
                        className="dash-user-input"
                        type="text"
                        placeholder={user.email}
                        value={updatedUser.email}
                        onChange={handleInputChange}
                        name="email"
                    />
                </div>
                <div>
                    <Checkbox label="Admin" checked={updatedUser.isAdmin} onChange={handleInputChange} name="isAdmin"/>
                    <label htmlFor="isAdmin">Yönetici</label>
                </div>
                <button onClick={() => saveChanges(user._id, updatedUser)} className="dash-users-btn">Kaydet</button>
                <button onClick={toggleEditMode} id="dash-user-edit" className="dash-users-btn">İptal</button>
            </div>
        )
    }

    const EditCanceled = () => {

        return (
            <div className="dash-user">
                <div className="name">
                    <h3>{user.name}</h3>
                </div>

                <div className="email">
                    <p>{user.email}</p>
                </div>
                <div>
                    <Checkbox label="AdminDisabled" disabled checked={user.isAdmin}/>
                    <label htmlFor="isAdmin">Yönetici</label>
                </div>
                <button onClick={() => onDelete(user._id)} className="dash-users-btn">Sil</button>
                <button onClick={toggleEditMode} id="dash-user-edit" className="dash-users-btn">Düzenle</button>
            </div>
        )
    }

    return (
        <>
            {isEditing ? <Editing /> : <EditCanceled />}
        </>

    )
}

export default DashEachUser;