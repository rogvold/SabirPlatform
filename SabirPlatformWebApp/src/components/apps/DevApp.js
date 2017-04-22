/**
 * Created by sabir on 21.02.17.
 */

import React, {PropTypes} from 'react';

import { connect } from 'react-redux';

import LeftSidebarTemplate from '../template/LeftSidebarTemplate'

import EditProfilePanel from '../profile/panels/EditProfilePanel'

import Infinite from 'react-infinite'

class DevApp extends React.Component {

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

                this is a Dev App

            </div>
        )
    }

    render(){

        return (
            <LeftSidebarTemplate content={this.getContent()} active={'dev'} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.usersMap.get(state.users.currentUserId),
    }
}


DevApp = connect(mapStateToProps, null)(DevApp)

export default DevApp