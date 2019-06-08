import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class SellerContent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mt-5">
        <Card.Group>
          <Card fluid color='red' className="m-2" header='Option 1' />
          <Card fluid color='orange' className="m-2" header='Option 2' />
          <Card fluid color='yellow' className="m-2" header='Option 3' />
        </Card.Group>
      </div>	
    );
  }
}

export default SellerContent;