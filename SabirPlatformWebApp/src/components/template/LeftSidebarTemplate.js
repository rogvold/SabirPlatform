/**
 * Created by sabir on 19.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LeftSidebar from './LeftSidebar'

import * as constants from '../../constants/config'

class LeftSidebarTemplate extends React.Component {

    static defaultProps = {
        active: 'home',
        logo: constants.LOGO_URL,
        companyName: constants.COMPANY_NAME,
        showCloseButton: true
    }

    static propTypes = {
        loading: PropTypes.bool,
        currentUser: PropTypes.object,
        companyName: PropTypes.string,

        content: PropTypes.element
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

    getPageName = () => {
        let {active} = this.props;
        return {
            home: 'Главная ',
            users: 'Пациенты',
            settings: 'Настройки',
            devices: 'Устройства'
        }[active];
    }



    render = () => {
        let {active} = this.props;

        let user = this.props.currentUser;
        let isEmptyName = (user.firstName == undefined && user.lastName == undefined);
        let avatar = (user == undefined) ? undefined : user.avatar;
        avatar = (avatar == undefined) ? constants.FACELESS_AVATAR : avatar;

        return (
            <div className={'corporate_template'} >

                <div className={'left_sidebar'} >
                    <div className={'logo_placeholder'}  >
                        <img src={constants.LOGO_URL} className={'logo'} />
                    </div>
                    <div className={'sidebar_placeholder'} >
                        <LeftSidebar active={active} />
                    </div>
                </div>

                <div className={'main_area'} >

                    <div className={'header'} >

                        <div className={'header_inner'} >

                            <div className={'left_placeholder'} >

                                <div className={'current_page_name_placeholder'} >
                                    <div className={'current_page_name'} >
                                        {this.getPageName()}
                                    </div>
                                </div>

                            </div>

                            <div className={'right_placeholder'} >

                                <div className={'current_user_placeholder'} >

                                    <div className={'avatar_placeholder'} >
                                        <img src={avatar} className={'avatar'} />
                                    </div>

                                    <div className={'name_placeholder'} >
                                        {isEmptyName == true ?
                                            <span><i className={'icon user'} ></i> {user.email}</span> :
                                            <span> {user.firstName} {user.lastName}</span>
                                        }
                                    </div>
                                </div>


                            </div>

                        </div>


                    </div>

                    <div className={'content'} >
                        {this.props.content}
                    </div>

                </div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUserId == undefined ? undefined : state.users.usersMap.get(state.users.currentUserId),
        loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (data) => {
            dispatch(actions.logOut())
        }
    }
}

LeftSidebarTemplate = connect(mapStateToProps, mapDispatchToProps)(LeftSidebarTemplate)

export default LeftSidebarTemplate