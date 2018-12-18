import React, { Component } from 'react';
import axios from 'axios'
import './indexStyle.css'

class ThirdPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productData: {
        createdAt: "",
        productComments: [],
        productDescription: "",
        productImageUrl: "",
        productName: "",
        productPrice: [{
          currentPrice: '',
          createdAt: new Date()
        }],
        productUrl: "",
        _id: ""
      }
    }
  }
  componentWillMount() {
    axios.get(`http://localhost:3000/product/${this.props.productId}`)
      .then(productData => {
        console.log('dapet gg sih', productData)
        this.setState({
          productData: productData.data
        })
      })
      .catch(e => {
        console.error(e)
      })
  }
  render() {
    return (
      <div>
        {this.state.productData === "" ?
          (<p>Please input url from page 1 or select product from page 2</p>)
          :
          (
            <div>
              <img
                src={this.state.productData.productImageUrl}
                alt="product"
                className="page3ImgStyle"
              />
              <h2>{this.state.productData.productName}</h2>
              <h3>{this.state.productData.productPrice[this.state.productData.productPrice.length - 1].currentPrice}</h3>
              <h4>Tentang Produk Ini</h4>
              <div className="page3Description">
                <p>{this.state.productData.productDescription}</p>
              </div>
              <p>History Harga</p>
              <table className="customers">
                <tr>
                  <th>Harga Barang</th>
                  <th>Waktu Update</th>
                </tr>
                {this.state.productData.productPrice.map((row, i) =>
                  <tr key={i}>
                    <td>{row.currentPrice}</td>
                    <td>{JSON.stringify(new Date(row.createdAt))}</td>
                  </tr>
                )}
              </table>
            </div>
          )
        }
      </div>
    );
  }
}


export default ThirdPage;
