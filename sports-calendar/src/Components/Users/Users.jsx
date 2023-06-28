import { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import UserService from '../../Services/UserService';
import RoleService from '../../Services/RoleService';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const getRoles = () => {
            try {
                RoleService.getRoles()
                    .then(function (response) {
                        const mappedRoles = response.data.map(role => ({
                            id: role.id,
                            access: role.access,
                        }));
                        setRoles(mappedRoles);
                        console.log(mappedRoles);
                        console.log(response);
                    });
            } catch (error) {
                console.error('Greška prilikom dohvata rola:', error);
            }
        };

        getRoles();
    }, []);

    useEffect(() => {
        const getUsers = () => {
            try {
                UserService.getUsers()
                    .then(function (response) {
                        const mappedUsers = response.data.data.map(user => {
                            const userRole = roles.find(role => role.id === user.roleId);
                            const role = userRole ? userRole.access : "empty";

                            return {
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                role: role,
                                username: user.username,
                                isActive: user.isActive ? "Active" : "Inactive",
                            };
                        });
                        setUsers(mappedUsers);
                        console.log(mappedUsers);
                        console.log(response);
                        console.log(roles);
                    });
            } catch (error) {
                console.error('Greška prilikom dohvata rola:', error);
            }
        };

        if (roles.length > 0) {
            getUsers();
        }
    }, [roles]);

    const rows = [];

    users.forEach((user) => {
        rows.push(
            <tr key={user.id}>
                <th>
                    {user.firstName}
                </th>
                <th>
                    {user.lastName}
                </th>
                <th>
                    {user.email}
                </th>
                <th>
                    {user.role}
                </th>
                <th>
                    {user.username}
                </th>
                <th>
                    {user.isActive}
                </th>
            </tr>
        )
    });

    return (
        <div className='table-container'>
            <Table hover>
                <thead>
                    <tr>
                        <th>
                            First Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Access
                        </th>
                        <th>
                            Username
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    )
}

export default Users;