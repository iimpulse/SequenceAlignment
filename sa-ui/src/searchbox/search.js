import React, { Component } from 'react';
import "./search.css"

class Search extends Component {
    render() {
        return (
            <React.Fragment>
               <div className="search-container">
                   <div className="offset-lg-4 col-lg-4">
                        <input type="text" name="sequence1" className="seq1" />
                   </div>
                   <span className="fas fa-retweet center compare-icon"></span>
                   <div className="offset-lg-4 col-lg-4">
                       <input type="text" name="sequence1" className="seq2" />
                   </div>
                   <button className="btn compare-btn">Compare</button>
               </div>
            </React.Fragment>
        );
    }
}

export default Search;