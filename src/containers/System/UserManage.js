import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUser } from '../../services/userService';
import './UserManage.scss'
import ModalUser from './ModalUser';
class UserManage extends Component {
    // khoi tao state
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        let response = await getAllUser('All')
        if (response && response.errCode === "0") {
            this.setState({
                arrUsers: response.users,
            }, () => {
                console.log('check state user sau khi ham chay xong: ', this.state.arrUsers);

            })
            console.log('check state user 1: ', this.state.arrUsers);
        }
    }

    handleAddNewUsesr = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState(
            {
                isOpenModalUser: !this.state.isOpenModalUser,
            }
        )
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-containerr">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                >
                </ModalUser>
                <div className="title text-center">Manage</div>
                <div className="mx-1">
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUsesr()}>
                        <i className='fas fa-plus'></i> Add new User</button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table id="customers">
                        {/* tbdody  */}
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {/* Toán tử && sẽ kiểm tra toán hạng đầu tiên.
 Nếu kết quả là truthy thì toán hạng sẽ được 
 tính toán và kết quả trả về là giá trị của toán hạng thứ hai. 
 Tuy nhiên nếu giá trị của toán hạng đầu tiên là falsy thì toán 
 hạng thứ hai không bao giờ được tính toán, kết quả trả về là giá 
 trị falsy của toán hạng đầu. */}
                            {arrUsers && arrUsers.map((item, index) => {
                                console.log('check map: ', item, index);
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete'><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
