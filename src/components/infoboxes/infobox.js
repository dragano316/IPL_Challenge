import React,{Component} from 'react';
import './infobox.css';

class Infobox extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            title: this.props.title,
            text: this.props.text
        }


    }

    UNSAFE_componentWillReceiveProps(){
        this.setState({
            data: this.props.data,
            title: this.props.title,
            text: this.props.text
        });
    }


    render(){
        return(
            <div className='infobox'>
                <div className='infobox_title'>
                    <p>{this.props.title}</p>
                </div>
                <div className='infobox_text'>
                    <p>{this.props.text}</p>
                </div>
                <div className='infobox_data'>
                    {this.props.data}
                </div>
            </div>
        )
    }
}

export default Infobox;