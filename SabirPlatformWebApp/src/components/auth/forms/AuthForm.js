/**
 * Created by sabir on 29.11.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from './LoginForm.js';
import SignupForm from './SignupForm.js';

class AuthForm extends React.Component {

    static defaultProps = {}

    static propTypes = {
        onLogin: PropTypes.func,
        onSignUp: PropTypes.func
    }

    state = {
        mode: 'login'
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onLogin = (data) => {
        this.props.onLogin(data);
    }

    onSignUp = (data) => {
        this.props.onSignUp(data);
    }

    render() {

        return (
            <div className={'auth_form'} >

                <div className={'form_placeholder'} >
                    {this.state.mode != 'login' ? null :
                        <LoginForm onSubmit={this.onLogin} />
                    }

                    {this.state.mode != 'signup' ? null :
                        <SignupForm onSubmit={this.onSignUp} />
                    }
                </div>

                <div className={'switcher_placeholder'} >

                    {this.state.mode == 'login' ?
                        <div className={' switcher '} >
                            Не зарегистрированы?
                            <span className={'switcher_link'} onClick={() => {this.setState({mode: 'signup'})}} >
                                Зарегистрироваться
                            </span>
                        </div> :
                        <div className={' switcher '} >
                            Уже есть аккаунт?
                            <span className={'switcher_link'} onClick={() => {this.setState({mode: 'login'})}} >
                                Войти
                            </span>
                        </div>
                    }

                </div>

            </div>
        )
    }

}

export default AuthForm