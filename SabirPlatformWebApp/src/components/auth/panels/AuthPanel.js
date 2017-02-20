/**
 * Created by sabir on 29.11.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthForm from '../forms/AuthForm.js'
import * as actions from '../../../redux/actions/UsersActions.js'

import CoolPreloader from '../../preloader/CoolPreloader.js'

class AuthPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {

    }

    state = {}

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
            <div className={'auth_panel'} >

                {this.props.isLoggedIn == false ? null :
                    <div>
                        Logged in as {this.props.currentUser.email}
                    </div>
                }

                <AuthForm onLogin={this.onLogin} onSignUp={this.onSignUp} />

                {this.props.loading == false ? null :
                    <CoolPreloader />
                }

                {this.props.error == undefined ? null :
                    <div className={'error_placeholder ui red message'} >
                        {this.props.error.message}
                    </div>
                }

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.users.loading,
        error: state.users.error,
        isLoggedIn: (state.users.currentUserId != undefined),
        currentUser: state.users.usersMap.get(state.users.currentUserId),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (data) => {
            dispatch(actions.logIn(data))
        },
        onSignUp: (data) => {
            dispatch(actions.signUp(data))
        }
    }
}

AuthPanel = connect(mapStateToProps, mapDispatchToProps)(AuthPanel)

export default AuthPanel