import React, { Component } from 'react';
import "./search.css";
import axios from 'axios';

class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            aligned:{},
            seq1: '',
            seq2: ''
        };

        this.buttonClick = this.buttonClick.bind(this);
        this.updateSeq1 = this.updateSeq1.bind(this);
        this.updateSeq2 = this.updateSeq2.bind(this);
    }

    buttonClick() {
        axios.get("http://localhost:5000/align?seq1=" + this.state.seq1 + "&seq2=" + this.state.seq2)
            .then(response => this.props.data({aligned:response.data}));
    }

    updateSeq1(event) {
        this.setState({seq1 : event.target.value});
    }

    updateSeq2(event) {
        this.setState({seq2 : event.target.value});
    }

    render() {
        return (
            <React.Fragment>
               <div className="search-container">
                   <div className="offset-lg-4 col-lg-4">
                        <input type="text" onChange={this.updateSeq1} name="sequence1" className="seq1"/>
                   </div>
                   <span className="fas fa-retweet center compare-icon">&nbsp;</span>
                   <div className="offset-lg-4 col-lg-4">
                       <input type="text" onChange={this.updateSeq2} name="sequence1" className="seq2"/>
                   </div>
                   <button className="btn compare-btn" onClick={this.buttonClick}>Compare</button>
               </div>
            </React.Fragment>
        );
    }
}

export default Search;