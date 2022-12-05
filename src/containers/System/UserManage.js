import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUser, createNewUserService } from '../../services/userService';
import './UserManage.scss'
import ModalUser from './ModalUser';
// import { reject } from 'lodash';
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
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUser('All')
        if (response && response.errCode === "0") {
            this.setState({
                arrUsers: response.users,
            })
        }
    }

    handleAddNewUser = () => {
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

    createNewUser = async (data) => {
        console.log('check in', data);
        try {
            //bug
            let response = await createNewUserService(data);

            if (response && response.errCode !== '0') {
                alert(response.errMessage)
                console.log('checklog done', response.errMessage);
            }
            else {
                await this.getAllUserFromReact();//update lai table sau do
                this.setState({
                    isOpenModalUser: false,
                })
            }
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-containerr">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser} //why parent -> child func ko truyen params
                // vi cha ko biet con truyen nhung param gi
                />
                <div className="title text-center">Manage</div>
                <div className="mx-1">
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}>
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
                                // console.log('check map: ', item, index);
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
