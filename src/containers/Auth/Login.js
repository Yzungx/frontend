import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl'; //dung cho redux
import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';



class Login extends Component {
    constructor(props) {
        super(props);
        //if login dc truyen props -> dc ke thua
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    //func
    handleChangeUsername = (event) => {
        this.setState(
            {
                username: event.target.value,
            }
        )
        // console.log(event.target.value);
    }

    handleChangePassword = (event) => {
        this.setState(
            {
                password: event.target.value,
            }
        )
        // console.log(event.target.value);
    }

    handleLogin = async () => {
        this.setState({
            //set lai errmess
            errMessage: '',
        })
        // console.log('username: ', this.state.username, 'pass: ', this.state.password);
        // console.log('all state: ', this.state);
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);//api login backend
            console.log('data api --------');
            console.log(data);
            if (data && data.errCode !== 0) { // data == alway {...} vi return nhieu tham so && errcode #0(=0 ~login success) => errcode ~ true == 0
                this.setState({
                    errMessage: data.message, //set lai stae hien thi
                })
            }
            console.log('errcode-------------');
            console.log(data.errCode);
            console.log('condition success');
            console.log(data && data.errCode);
            if (data && data.errCode === '0') {
                // todo 
                console.log('111111');
                this.props.userLoginSuccess(data.user)
                console.log('Login success');
            }
        } catch (e) {
            // console.log(e);
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState(
            {
                isShowPassword: !this.state.isShowPassword,
            }
        )
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>UserName</label>
                            <input type='text'
                                className='form-control'
                                value={this.state.username}
                                onChange={(event) => this.handleChangeUsername(event)}
                                placeholder='Enter your username'>
                            </input>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>PassWord:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    onChange={(event) => this.handleChangePassword(event)}
                                    placeholder='Enter your password'>
                                </input>
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye-slash' : 'far fa-eye'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className='text-center'>Or login with</span>
                        </div>
                        <div>
                            <div className="col-12 social-login">
                                <i className='fab fa-google-plus-g google'></i>
                                <i className='fab fa-facebook-f facebook'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//redux
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};
// redux, inject  vaos
const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
