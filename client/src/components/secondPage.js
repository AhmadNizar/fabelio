import React, { Component } from 'react';
import axios from 'axios'

class SecondPage extends Component {
  constructor() {
    super()
    this.state = {
      productsData: []
    }
  }
  componentWillMount() {
    axios.get('http://localhost:3000/product')
    .then(productsData => {
      console.log('dapet cuk', productsData)
      this.setState({
        productsData: productsData.data
      })
    })
    .catch(e => {
      console.error(e)
    })
  }
  render() {
    return (
      <div>
        <table className="customers">
          <tr>
            <th>No.</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Price</th>
            <th>Detail</th>
          </tr>
          {this.state.productsData.length > 0 &&
            this.state.productsData.map((row, i) => 
              <tr key={i}>
                <td>{i+1}</td>
                <td>
                  <img src={row.productImageUrl} alt="product"/>
                </td>
                <td>{row.productName}</td>
                <td>{row.productDescription}</td>
                <td>{row.productPrice[row.productPrice.length -1].currentPrice}</td>
                <td>
                  <button onClick={() => this.props.setDetailButton(row._id)}>Detail</button>
                </td>
              </tr>
            )
          }
        </table>
      </div>
    );
  }
}

export default SecondPage;
