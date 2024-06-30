import "../css/DashUsers.css"
import axios from "axios";
import {useEffect, useState} from "react";
import DashEachUser from "./DashEachUser";


const DashUsers = ({onClose}) => {

        const [userData, setUserData] = useState([]);

        const URL = 'https://mynode-mb4z.onrender.com';

        useEffect(() => {
            fetchUsers();
        }, [])

        const fetchUsers = async () => {
            await axios.get(`${URL}/api/users`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            })
                .then(res => {
                    setUserData(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }

    const onDelete = async (id) => {
        await axios.delete(
            `${URL}/api/users/auth/${id}`,
            {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            }
        )
            .then(res => {
                console.log(res)
                fetchUsers();
            })
            .catch(err => {
                console.log(err)
            })
    }

        return(
            <div className="dash-users-overlay" onClick={onClose}>
                <div className="dash-users-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Kullanıcılar</h2>
                    <div className="dash-user-container">
                        {userData.slice(1).map((user) => (
                            <DashEachUser onDelete={onDelete} fetchUsers={fetchUsers} key={user._id} user={user}/>
                        ))}
                    </div>
                </div>
            </div>
        )
}

export default DashUsers;