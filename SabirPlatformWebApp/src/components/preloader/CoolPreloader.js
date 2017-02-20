/**
 * Created by sabir on 19.02.17.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

class CoolPreloader extends React.Component {

    static defaultProps = {
        text: 'Загрузка...'
    }

    static propTypes = {
        text: PropTypes.string
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

    render() {

        return (
            <div className={'ui inverted dimmer active' }>
                {this.props.text == undefined ? null :
                    <div className="ui indeterminate text loader">{this.props.text}</div>
                }
            </div>
        )
    }

}

export default CoolPreloader