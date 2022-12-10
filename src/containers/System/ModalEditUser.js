import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash'; //dung de xu lys mang

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        // let { currentUser } = this.props;
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            // check obj ko empty
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcod3e',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }

    toggle = () => {
        //ko dung hook nen viet nay tranh loi
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {
        //tao mask tranh chinh sua truc tiep vao data goc
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        console.log(copyState);
        this.setState({
            ...copyState,
        })
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            // console.log('check inside loop', this.state[arrInput[i]], arrInput[i]);
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('missing params: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput(); //true/fale
        console.log('valid check', isValid);
        if (isValid === true) {
            //call api
            this.props.editUser(this.state);// send data to parent -> call api
            // console.log('check send data api 1: ', this.state);
        }
    }

    render() {
        console.log('check props', this.props);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handleSaveUser() }}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

