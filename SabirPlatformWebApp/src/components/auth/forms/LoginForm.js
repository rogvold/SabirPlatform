/**
 * Created by sabir on 29.11.16.
 */


import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import validator from 'validator';

class LoginForm extends React.Component {

     static defaultProps = {
        onSubmit (data){
            console.log('default onSubmit occured: data = ', data);
        }
     }

     static propTypes = {
        onSubmit: PropTypes.func
     }

     state = {
        email: '',
         password: ''
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount(){

     }

     componentWillReceiveProps(){

     }

    getData = () => {
        return {
            email: this.state.email,
            password: this.state.password
        }
    }

    onSubmit = () => {
        this.props.onSubmit(this.getData());
    }

    canSubmit () {
        let data = this.getData();
        if (validator.isEmail(data.email) == false || data.password == undefined || data.password.trim() == ''){
            return false;
        }
        return true;
    }

     render(){
         let canSubmit = this.canSubmit();

         return (
             <div className={'login_form ui form'} >

                 <div className={'field'} >
                    <label>
                        Email
                    </label>
                     <input value={this.state.email}
                            placeholder={'Email'}
                            onChange={(evt) => {this.setState({email: evt.target.value})}} />
                 </div>

                 <div className={'field'} >
                     <label>
                         Пароль
                     </label>
                     <input value={this.state.password}
                            placeholder={'Password'} type={'password'}
                            onChange={(evt) => {this.setState({password: evt.target.value})}} />
                 </div>

                 <div className={'submit_button_placeholder'} >
                    <button className={'ui button fluid'} onClick={this.onSubmit} disabled={!canSubmit} >
                        Вход
                    </button>
                 </div>

             </div>
         )
     }
}

export default LoginForm