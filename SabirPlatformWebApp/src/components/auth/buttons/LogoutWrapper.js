/**
 * Created by sabir on 30.11.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/UsersActions.js'

class LogoutWrapper extends React.Component {

    static defaultProps = {}

    static propTypes = {
        logOut: PropTypes.func
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

    onClick = () => {
        console.log('LogoutWrapper: onClick');
        this.props.logOut();
    }

    render() {

        if (this.props.isLoggedIn == false){
            return null;
        }

        return (
            <div className={'logout_wrapper '} onClick={this.onClick} >

                {this.props.children}

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.usersMap.get(state.users.currentUserId),
        loading: state.users.loading,
        isLoggedIn: (state.users.currentUserId != undefined)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch(actions.logOut())
        }
    }
}

LogoutWrapper = connect(mapStateToProps, mapDispatchToProps)(LogoutWrapper)

export default LogoutWrapper