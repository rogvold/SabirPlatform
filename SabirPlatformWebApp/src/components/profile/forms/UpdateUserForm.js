/**
 * Created by sabir on 14.10.16.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

class UpdateUserForm extends React.Component {

    static defaultProps = {
        firstName: '',
        lastName: '',
        birthdayTimestamp: undefined,
        gender: undefined,
        nickname: '',

        email: undefined,
        password: undefined,

        buttonName: 'Создать',
        showNickname: false,

        errorContent: undefined,

        showAuthFields: true,

        onSubmit: (data) => {
            console.log('UpdateUserForm: onSubmit: data = ', data);
        }
    }

    static propTypes = {}

    state = {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        birthdayTimestamp: this.props.birthdayTimestamp,
        gender: this.props.gender,
        email: this.props.email,
        password: this.props.password,
        nickname: this.props.nickname,
        birthdayString: moment(this.props.birthdayTimestamp).format('DD.MM.YYYY')
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getData = () =>{
        return {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthdayTimestamp: this.state.birthdayTimestamp,
            gender: this.state.gender,
            nickname: this.state.nickname,
            email: this.state.email,
            password: this.state.password
        }
    }

    canSubmit = () => {
        let data = this.getData();
        if (data.firstName == undefined || data.firstName.trim() == '' ||
            data.lastName == undefined || data.lastName.trim() == '' ||
            data.gender == undefined){
            return false;
        }
        return true;
    }

    onSubmit = () => {
        var data = this.getData();
        this.props.onSubmit(data);
    }

    render = () => {
        var canSubmit = this.canSubmit();
        let {gender, lastName, firstName, nickname, email, password} = this.state;

        return (
            <div className={'update_user_form'} >

                <div className={'ui form'} >

                    <div className={'field'} >
                        <label>Имя</label>
                        <input value={firstName} placeholder={'Имя'}  onChange={(evt) => {this.setState({firstName: evt.target.value, changed: true})}} />
                    </div>

                    <div className={'field'} >
                        <label>Фамилия</label>
                        <input value={lastName} placeholder={'Фамилия'}  onChange={(evt) => {this.setState({lastName: evt.target.value, changed: true})}} />
                    </div>

                    <div className={'field'} >
                        <label>Пол</label>
                        <div className={'ui fluid buttons'} >
                            <div className={' ui button ' + (gender == 'male' ? ' active  ' : ' basic grey ')} onClick={this.setState.bind(this, {changed: true, gender: 'male'})} >
                                Мужской
                            </div>
                            <div className={' ui button ' + (gender == 'female' ? ' active  ' : ' basic grey ')} onClick={this.setState.bind(this, {changed: true, gender: 'female'})} >
                                Женский
                            </div>
                        </div>
                    </div>

                    {this.props.showNickname == false ? null :
                        <div className={'field'} >
                            <label>Отображаемое имя</label>
                            <input value={nickname} placeholder={'Отображаемое имя'} onChange={(evt) => {this.setState({nickname: evt.target.value, changed: true})}} />
                        </div>
                    }

                    {this.props.showAuthFields == false ? null :
                        <div className={'field'} >
                            <label>Email</label>
                            <input value={email} placeholder={'Email'} onChange={(evt) => {this.setState({email: evt.target.value, changed: true})}} />
                        </div>
                    }

                    {this.props.showAuthFields == false ? null :
                        <div className={'field'}>
                            <label>Пароль</label>
                            <input value={password} placeholder={'Пароль'} onChange={(evt) => {this.setState({password: evt.target.value, changed: true})}} />
                        </div>
                    }

                    {this.props.errorContent == undefined ? null :
                        <div className={'field'} >
                            <div className={'ui red message'} >
                                {this.props.errorContent}
                            </div>
                        </div>
                    }

                    <div className={'field'} >
                        <div className={'submit_button_placeholder'} >
                            <button className={'ui primary fluid button'} disabled={!canSubmit} onClick={this.onSubmit} >
                                {this.props.buttonName}
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        );
    }

}

export default UpdateUserForm