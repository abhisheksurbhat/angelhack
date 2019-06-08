import React from 'react';


class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="d-flex flex-wrap">
        <h1 className="w-100">Farmers Marketplace</h1>
        <div className="w-100 mt-5 d-flex justify-content-center">
          <ul className="nav">
            <li className="nav-item w-50">
              <button className="btn btn-danger"
                onClick={(e) => this.props.selectTab(e)}
                value="Buyers">Buyers</button>
            </li>
            <li className="nav-item w-50" onClick={this.props.selectTab}>
              <button className="btn btn-danger ml-2"
                onClick={(e) => this.props.selectTab(e)}
                value="Sellers">Sellers</button>
            </li>
          </ul>
        </div> 
      </div>
    );
  }
}

export default Header;