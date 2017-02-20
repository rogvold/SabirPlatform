/**
 * Created by sabir on 19.01.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LogoutWrapper from '../auth/buttons/LogoutWrapper'

class LeftSidebar extends React.Component {

    static defaultProps = {
        active: 'home'
    }

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

    getLinksContent = () => {
        let links = [{
            name: 'home',
            url: '/',
            displayName: 'Главная',
            icon: 'icon heartbeat'
        },
        //     {
        //     name: 'users',
        //     url: '/users',
        //     displayName: 'Пациенты',
        //     icon: 'icon child'
        // },
        //     {
        //     name: 'devices',
        //     url: '/devices',
        //     displayName: 'Устройства',
        //     icon: 'icon connectdevelop'
        // }

         {
            name: 'settings',
            url: '/settings',
            displayName: 'Настройки',
            icon: 'icon settings'
        }];

        let {active} = this.props;
        console.log('rendering LeftSidebar: active = ' + active);

        return links.map((link, k) => {
            let isActive = (link.name == active);
            let onClick = () => {window.location.href = '/#' + link.url};
            return (
                <div className={'link ' + ((isActive == true) ? ' selected' : '')} key={k} onClick={onClick} >
                    <i className={link.icon} ></i> {link.displayName}
                </div>
            )
        })
    }

    render = () => {

        return (
            <div className={'sidebar'} >

                <div className={'links_placeholder'} >
                    <div className={'links'} >
                        {this.getLinksContent()}


                        <div className={'link logout_link'} >
                            <LogoutWrapper>
                                <i className={'icon sign out'} ></i> Выход
                            </LogoutWrapper>
                        </div>

                    </div>
                </div>

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//LeftSidebar = connect(mapStateToProps, mapDispatchToProps)(LeftSidebar)

export default LeftSidebar