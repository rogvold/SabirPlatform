/**
 * Created by sabir on 08.02.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../redux/actions/FileUploadActions'

import CoolPreloader from '../preloader/CoolPreloader'

class UploadImagePanel extends React.Component {

    static defaultProps = {
        onImageUploaded: (url) => {

        }
    }

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

    onChange = (evt) => {
        let file = evt.target.value;
        let {onImageUploaded} = this.props;
        this.props.uploadImage(evt.target.files[0]).then((a) => {
            let {image} = a;
            let imageUrl = image.mini_url;
            onImageUploaded(imageUrl);
        }, () => {
            alert('Ошибка при загрузки фотографии. Попробуйте снова.');
        });
    }


    render = () => {

        return (
            <div className={'upload_image_panel'} >

                <div className={'info_text'} >
                    Выберите картинку - фотографию на компьютере
                </div>

                <input type="file" onChange={this.onChange} />

                {this.props.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}

const mapStateToProps = (state) => {
   return {
       loading: state.upload.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       uploadImage: (file) => {
           return dispatch(actions.uploadImage(file))
       }
   }
}

UploadImagePanel = connect(mapStateToProps, mapDispatchToProps)(UploadImagePanel)

export default UploadImagePanel