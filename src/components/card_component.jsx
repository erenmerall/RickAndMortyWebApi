import React, { Component } from 'react';
import "../CSS/episode_card.css"

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title || 'Default Title',
            content: props.content || 'Default Content',
            imageUrl: props.imageUrl || 'Default image',
        };
    }

    render() {
        return (
            <div className="col-md-4" >
                <div className="card card-1">
                    <h3>{this.state.title}</h3>
                    <p>{this.state.content}</p>
                    <img src={this.state.imageUrl} alt="" />
                </div>
            </div>
        );
    }

}

export default Card;