/**
 * Created by sabir on 01.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

class Dialog extends React.Component {

    static defaultProps = {
        level: 100
    }

    static propTypes = {
        level: PropTypes.number,
        onClose: PropTypes.func
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

    onClose = () => {
        this.props.onClose();
    }

    render() {
        var st = Object.assign({}, {zIndex: this.props.level});

        return (
            <div className={'dialog'} >
                <div className={'dialog_overlay'} style={st} ></div>
                <div className={'main_panel'} style={Object.assign({}, st, {zIndex: this.props.level + 1})} >
                    <div className={'dialog_content_placeholder'} >
                        <div className={'dialog_content'} >
                            <div className={'inner_content'} >

                                {this.props.children}

                                <div className={'close_button_placeholder'} onClick={this.onClose} >
                                    <i className={'icon remove'} ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default Dialog