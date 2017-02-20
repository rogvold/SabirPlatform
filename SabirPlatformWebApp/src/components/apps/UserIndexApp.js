/**
 * Created by sabir on 19.02.17.
 */

import React, {PropTypes} from 'react';


import { connect } from 'react-redux';


import LeftSidebarTemplate from '../template/LeftSidebarTemplate'


class UserIndexApp extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        currentUser: PropTypes.object.isRequired
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }


    getContent = () => {
        var user = this.props.currentUser;
        if (user == undefined){
            return null;
        }

        return (
            <div className={'user_index_app_content'} >

                user index app

            </div>
        )
    }

    render(){

        return (
            <LeftSidebarTemplate content={this.getContent()} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.usersMap.get(state.users.currentUserId),
    }
}


UserIndexApp = connect(mapStateToProps, null)(UserIndexApp)

export default UserIndexApp