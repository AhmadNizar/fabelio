import React, { Component } from 'react';
import axios from 'axios'

class FistPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productUrl: ''
    }
  }
  scrappingPage() {
    // this.props.setInputButton(3)
    axios.post('http://localhost:3000/product', {
      url: this.state.productUrl 
    })
    .then(newProductData => {
      console.log(newProductData)
      this.props.setInputButton(newProductData.data._id)
    })
    .catch(e => {
      alert("Something wrong, please try again")
    })

  }
  render() {
    return (
      <div>
          <input type="text" name="productUrl" onChange={(e) => this.setState({productUrl: e.target.value})}/>
          <button onClick={() => this.scrappingPage()}>Input</button>
      </div>
    );
  }
}

export default FistPage;
