/**
 * Created by sabir on 29.11.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import validator from 'validator';

class SignupForm extends React.Component {

    static defaultProps = {
        firstNameEnabled: true,
        lastNameEnabled: true,

        onSubmit (data){
            console.log('default onSubmit occured: data = ', data);
        }
    }

    static propTypes = {
        onSubmit: PropTypes.func
    }

    state = {
        email: '',
        password: '',
        passwordConfirmation: '',
        firstName: '',
        lastName: ''
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getData = () => {
        var d = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
        return d;
    }

    canSubmit = () => {
        var d = this.getData();
        var email = this.state.email;
        if (validator.isEmail(email) == false){
            return false;
        }
        var {password, passwordConfirmation} = this.state;
        if (password == undefined || password.trim() == '' || password != passwordConfirmation){
            return false;
        }

        if (this.props.firstNameEnabled == true && d.firstName == undefined || d.firstName.trim() == ''){
            return false;
        }
        if (this.props.lastNameEnabled == true && d.lastName == undefined || d.lastName.trim() == ''){
            return false;
        }
        return true;
    }

    onSubmit = () => {
        this.props.onSubmit(this.getData());
    }

    render() {
        let canSubmit = this.canSubmit();

        return (
            <div className={'signup_form ui form'} >

                {this.props.firstNameEnabled == false ? null :
                    <div className={'field'} >
                        <label>Имя</label>
                        <input value={this.state.firstName} placeholder={'Ваше имя'}
                               onChange={(e) => {this.setState({firstName: e.target.value})}}
                            />
                    </div>
                }

                {this.props.lastNameEnabled == false ? null :
                    <div className={'field'} >
                        <label>Фамилия</label>
                        <input value={this.state.lastName} placeholder={'Ваша фамилия'}
                               onChange={(e) => {this.setState({lastName: e.target.value})}}
                            />
                    </div>
                }

                <div className={'field'} >
                    <label>Email</label>
                    <input value={this.state.email} placeholder={'Email'}
                            onChange={(e) => {this.setState({email: e.target.value})}}
                        />
                </div>

                <div className={'field'} >
                    <label>Пароль</label>
                    <input value={this.state.password} placeholder={'Пароль'} type={'password'}
                           onChange={(e) => {this.setState({password: e.target.value})}}
                        />
                </div>

                <div className={'field'} >
                    <label>Пароль еще раз</label>
                    <input value={this.state.passwordConfirmation} placeholder={'Пароль'} type={'password'}
                           onChange={(e) => {this.setState({passwordConfirmation: e.target.value})}}
                        />
                </div>

                <div className={'submit_button_placeholder'} >
                    <button className={'ui button fluid'} onClick={this.onSubmit} disabled={!canSubmit} >
                        Зарегистрироваться
                    </button>
                </div>

            </div>
        )
    }

}

export default SignupForm