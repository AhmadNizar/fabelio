import React, { Component } from 'react';
import './App.css';
import FirstPage from './components/firstPage'
import SecondPage from './components/secondPage'
import ThirdPage from './components/thirdPage'
import './components/indexStyle.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      activePage: 1,
      productId: '5c177114a299de761a83bb34'
    }
  }
  handleFirstPage(productId) {
    console.log('masuk kagak nih?');
    
    this.setState({
      activePage: 3,
      productId: productId
    })
  }
  handleSecondPage(productId) {
    this.setState({
      activePage: 3,
      productId: productId
    })
  }
  setActivePage() {
    switch (this.state.activePage) {
      case 1:
        return (<FirstPage setInputButton={(productId) => this.handleFirstPage(productId)}/>)
      case 2:
        return (<SecondPage setDetailButton={(productId) => this.handleSecondPage(productId)} />)
      case 3:
        return (<ThirdPage productId={this.state.productId}/>)
      default:
        break;
    }
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Fabelio Price Checker Web App</h1>
          <div class="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
              <a onClick={() => this.setState({activePage: 1})}>Link 1</a>
              <a onClick={() => this.setState({activePage: 2})}>Link 2</a>
              <a onClick={() => this.setState({activePage: 3})}>Link 3</a>
            </div>
          </div>
        </div>
        {/* <button onClick={() => this.setState({activePage: 1})}>1</button>
        <button onClick={() => this.setState({activePage: 2})}>2</button>
        <button onClick={() => this.setState({activePage: 3})}>3</button> */}
        {
          this.setActivePage()
        }
      </div>
    );
  }
}

export default App;
