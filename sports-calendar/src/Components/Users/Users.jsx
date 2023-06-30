import { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import UserService from '../../Services/UserService';
import RoleService from '../../Services/RoleService';
import ReactPaginate from 'react-paginate';
import '../../Style/Users.css';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

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
                    });
            } catch (error) {
                console.error('Greška prilikom dohvata rola:', error);
            }
        };

        getRoles();
    }, []);

    const getUsers = () => {
        try {
            UserService.getUsers((pageNumber + 1), 10)
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
                    setPagination({
                        currentPage: response.data.currentPage,
                        hasNext: response.data.hasNext,
                        hasPrevious: response.data.hasPrevious,
                        pageSize: response.data.pageSize,
                        totalCount: response.data.totalCount,
                        totalPages: response.data.totalPages,
                    });
                    console.log(response.data)
                });
        } catch (error) {
            console.error('Greška prilikom dohvata rola:', error);
        }
    };

    useEffect(() => {
        if (roles.length > 0) {
            getUsers();
        }
    }, [roles]);

    const handleClick = (event) => {
        console.log(event.selected)
        setPageNumber(event.selected + 1)
    }

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
                <Button color="primary">Edit</Button>
                <Button color='warning'>Delete</Button>
            </tr>
        )
    });

    return (
        <div className='table-container' style={{ marginTop: '50px' }}>
            <h3 style={{ marginLeft: '30px' }}>Users: </h3>
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
            <ReactPaginate
                breakLabel=""
                nextLabel={"next >"}
                onPageChange={handleClick}
                pageRangeDisplayed={pagination.pageSize}
                pageCount={pagination.totalPages}
                previousLabel={"< previous"}
                renderOnZeroPageCount={null}
                containerClassName={"pagination-container"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                activeClassName={"active"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
            />
        </div>
    )
}

export default Users;