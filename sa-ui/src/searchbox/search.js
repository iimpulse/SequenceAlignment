import React, { Component } from 'react';
import "./search.css";
import axios from 'axios';

class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            aligned:{},
            seq1: '',
            seq2: '',
            match: 1,
            mismatch: -1,
            gap: -1
        };

        this.buttonClick = this.buttonClick.bind(this);
        this.updateSeq1 = this.updateSeq1.bind(this);
        this.updateSeq2 = this.updateSeq2.bind(this);
        this.updateMatch = this.updateMatch.bind(this);
        this.updateMisMatch = this.updateMisMatch.bind(this);
        this.updateGap = this.updateGap.bind(this);
    }

    buttonClick() {
        axios.get("http://localhost:5000/align?seq1=" + this.state.seq1 + "&seq2=" + this.state.seq2
            + "&match=" + this.state.match + "&mismatch=" + this.state.mismatch + "&gap=" + this.state.gap)
            .then(response => this.props.data({aligned:response.data}));
    }

    updateSeq1(event) {
        this.setState({seq1 : event.target.value});
    }

    updateSeq2(event) {
        this.setState({seq2 : event.target.value});
    }

    updateMatch(event){
        this.setState({match : event.target.value});
    }

    updateMisMatch(event){
        this.setState({mismatch : event.target.value});
    }

    updateGap(event){
        this.setState({gap : event.target.value});
    }

    render() {
        return (
            <React.Fragment>
               <div className="search-container">
                   <div className="offset-lg-4 col-lg-4">
                        <input type="text" onChange={this.updateSeq1} name="sequence1" className="seq1"/>
                   </div>
                   <div className="center compare-icon">
                   <span className="select-label">Match</span>
                   <select onChange={this.updateMatch} className="select-box">
                       <option>0</option>
                       <option selected="selected">1</option>
                       <option>2</option>
                       <option>3</option>
                       <option>4</option>
                       <option>5</option>

                   </select>
                   <span className="select-label">Mismatch</span>
                   <select onChange={this.updateMisMatch} className="select-box">
                       <option selected="selected">-1</option>
                       <option>-2</option>
                       <option>-3</option>
                       <option>-4</option>
                       <option>-5</option>
                   </select>
                   <span className="select-label">Gap</span>
                   <select onChange={this.updateGap} className="select-box">
                       <option selected="selected">-1</option>
                       <option>-2</option>
                       <option>-3</option>
                       <option>-4</option>
                       <option>-5</option>
                   </select>
                   </div>
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