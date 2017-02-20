/**
 * Created by sabir on 09.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as usersActions from '../../../redux/actions/UsersActions'

import UploadImageWrapper from '../../upload/UploadImageWrapper'

import UpdateUserForm from '../forms/UpdateUserForm'

import * as constants from '../../../constants/config'

import CoolPreloader from '../../preloader/CoolPreloader'

class EditProfilePanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getUser = () => {
        let {id, getUser} = this.props;
        let user = getUser(id);
        return user;
    }

    onAvatarUploaded = (url) => {
        console.log('onAvatarUploaded: url = ', url);
        let data = {
            id: this.props.id,
            avatar: url
        }
        return this.props.updateUser(data);
    }

    onUserInfoSubmit = (d) => {
        let data = Object.assign({}, d, {id: this.props.id});
        return this.props.updateUser(data);
    }

    render = () => {
        let user = this.getUser();
        if (user == undefined){
            return null;
        }
        let {loading} = this.props;
        let avatar = (user.avatar == undefined) ? constants.FACELESS_AVATAR : user.avatar;

        console.log('EditProfilePanel: render: user = ', user);

        return (
            <div className={'edit_profile_panel'} >

                <div className={'avatar_placeholder'} >
                    <img className={'avatar'} src={avatar} />
                    <div className={'edit_placeholder'}>
                            <span>
                                <UploadImageWrapper onImageUploaded={this.onAvatarUploaded} >
                                    <i className={'icon pencil'} ></i> редактировать
                                </UploadImageWrapper>
                            </span>
                    </div>
                </div>

                <UpdateUserForm firstName={user.firstName} buttonName={'Сохранить'}
                                showAuthFields={false}
                                lastName={user.lastName} onSubmit={this.onUserInfoSubmit}
                                gender={user.gender} />

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}

let getUser = (state, userId) => {
    let usersMap = state.users.usersMap;
    if (usersMap == undefined || userId == undefined){
        return undefined;
    }
    return usersMap.get(userId);
}

const mapStateToProps = (state) => {
   return {
       loading: state.users.loading,
       getUser: (userId) => {
           return getUser(state, userId);
       }
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       updateUser: (data) => {
           return dispatch(usersActions.updateUser(data))
       }
   }
}

EditProfilePanel = connect(mapStateToProps, mapDispatchToProps)(EditProfilePanel)

export default EditProfilePanel