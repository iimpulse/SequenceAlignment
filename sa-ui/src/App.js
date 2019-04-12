import React, { Component } from 'react';
import Search from './searchbox/search';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{}
        };
    }

    handleResponse(val) {
        this.setState({data: val.aligned});
    }

    render() {
        let aligned = this.state.data;
        let containerAlignment, containerGrid, alignmentb, rows, alignmenta;
        const styles = {
            "clear": "both"
        };
        if(aligned.hasOwnProperty('alignment_a')){
              alignmentb = aligned.seq1.split('');
              alignmentb.unshift(' ');
              alignmentb.unshift(' ');

              alignmenta = aligned.seq2.split('');
              rows = aligned.matrix.map((row, i) => {
                  if(i === 0){
                      row.unshift(' ');
                  } else {
                      row.unshift(alignmenta[i-1]);
                  }

                  return row;
              });

              let generateGrid = function() {
                  let rowLen = rows.length - 1;
                  return rows.map((obj, i) => {
                      if(i === 0){
                          let colorCell = 1;
                          return <tr>
                              {obj.map((item, i) => {
                                  if(i === colorCell){
                                      return <td className="highlight">{item}</td>
                                  }
                                  return <td>{item}</td>
                              })}
                          </tr>
                      } else if(i === rowLen){
                          let colorCell = obj.length - 1;
                          return <tr>
                              {obj.map((item, i) => {
                                  if(i === colorCell){
                                      return <td className="highlight">{item}</td>
                                  }
                                  return <td>{item}</td>
                              })}
                          </tr>
                      } else {
                          let colorCell = aligned.path[i].sort();
                          return <tr>
                              {obj.map((item, i) => {
                                  if(i === colorCell[0] + 1){
                                      colorCell.shift();
                                      return <td className="highlight">{item}</td>
                                  }
                                  return <td>{item}</td>
                              })
                              }
                          </tr>

                      }

                  })

              };

                containerGrid =
                <table cellPadding="10" className="pure-table">
                    <tbody>
                    <tr>
                        {alignmentb.map((object, i) => { return <th>{object}</th>})}
                    </tr>
                    {
                        generateGrid()
                    }
                    </tbody>
                </table>;

                containerAlignment =
                        <div className="output">
                                <div className="alignment-section">
                                    <h3 className="section-header">Optimal Alignment</h3>
                                    <div className="section">
                                        <h4 className="aligned">{aligned.alignment_a}</h4>
                                        <h4 className="aligned">{aligned.alignment_b}</h4>
                                    </div>
                                </div>
                            <div className="grid-section">
                                <h3 className="section-header">Scoring Grid</h3>
                                <div className="section">
                                    {containerGrid}
                                </div>
                            </div>
                            <div style={styles}></div>
                            </div>
                        }

        return (
                <React.Fragment>
                    <header className="app-header">
                        <h4 className="header-text">Directed Study</h4>
                    </header>
                        <div className="introduction">
                            <h2 className="title">Needleman–Wunsch Pairwise Sequence Alignment</h2>
                            <p>Compare two sequences by entering them below and hitting compare!</p>
                        </div>
                        <Search data={this.handleResponse.bind(this)}/>
                        {containerAlignment}
                    <footer className="app-footer">
                      <div className="left">Michael Gargano</div>
                      <div className="right">Jared Auclair</div>
                    </footer>
                </React.Fragment>
            );
    }
}

export default App;
