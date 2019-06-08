import React from 'react';
import Header from './components/header';
import BuyerContent from './components/buyer-content';
import SellerContent from './components/seller-content';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  handleSelect = (e) => {
    this.setState({selected: e.target.value});
  }

  render() {
    return (
    <div className="App">
      <Header data={this.state.data} selectTab={this.handleSelect}/>
      {this.state.selected === 'Buyers' ? 
        <BuyerContent />
        : this.state.selected === 'Sellers' ?
          <SellerContent /> : null
      }
      
    </div>
  );
  }
}

export default App;
