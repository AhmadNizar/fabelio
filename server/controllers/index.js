const ProductModel = require('../models')
const puppeter     = require('puppeteer')
const { JSDOM }     = require('jsdom')

class ProductCtrl {
  static async addNewProduct(req, res) {
    console.log('masuk cuk');
    
    puppeter
      .launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
      .then((browser) => {
        console.log('masuk sini browser')
        return browser.newPage()
      })
      .then((page) => {
        return page.goto(req.body.url)
        .then(() => {
          return page.content()
        })
      })
      .then( async html => {
        let newHtml = new JSDOM(html)
        let tempProductName = newHtml.window.document.getElementsByClassName('base')[0].innerHTML
        let tempProductPrice = newHtml.window.document.getElementsByClassName('price')[0].innerHTML
        let kumpulanDeskripsiBarang = newHtml.window.document.getElementById('description').innerHTML
        let tempDeskripsiBarang = new JSDOM(kumpulanDeskripsiBarang).window.document.getElementsByTagName('p')
        let tempUrlProductImg   = newHtml.window.document.getElementsByTagName('img')[26].getAttribute('src')
        let newDeskripsiBarang = ''
        for(let i=0; i< tempDeskripsiBarang.length; i++) {
          newDeskripsiBarang += tempDeskripsiBarang[i].innerHTML + ('\n')
        }

        try {
          const tempProductData = new ProductModel({
            productUrl: req.body.url,
            productName: tempProductName,
            productImageUrl: tempUrlProductImg,
            productPrice: [{
              currentPrice: tempProductPrice,
              createdAt: new Date()
            }],
            productDescription: newDeskripsiBarang,
            productComments: []
          })

          const newProductData = await tempProductData.save()
          this.updateAllProduct()
          res.status(200).send(newProductData)
        } catch (error) {
          res.status(500).send(error)
        }
      })
      .catch(e => {
        res.status(500).send('paling bawah', e)
      })
  }
  static async getNewProduct(req, res) {
    try {
      console.log(req.params);
      
      let tempDataProduct = await ProductModel.find()
      // this.updateAllProduct()
      res.status(200).send(tempDataProduct)
    } catch (error) {
      res.status(500).send(error)
    }
  }
  static async getProductById(req, res) {
    try {
      console.log('masuk sini gg sih?', req.params);
      // this.updateAllProduct()
      let tempDataProduct = await ProductModel.findById(req.params.id)

      res.status(200).send(tempDataProduct)
    } catch (error) {
      res.status(500).send(error)
    }
  }
  static async clearDB(req, res) {
    try {
      let deletedData = await ProductModel.deleteMany()

      res.status(200).send(deletedData)
    } catch (error) {
      res.status(500).send(error)
    }
  }
  static async updateAllProduct() {
    try {
      let tempDataProduct = await ProductModel.find()

      tempDataProduct.forEach(async item => {
        if(((new Date().getTime() - new Date(item.productPrice[item.productPrice.length -1].createdAt).getTime())/1000) >= 3600 ) {
          try {
            puppeter
              .launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
              .then((browser) => {
                return browser.newPage()
              })
              .then((page) => {
                return page.goto(item.productUrl)
                .then(() => {
                  return page.content()
                })
              })
              .then( async html => {
                let newHtml = new JSDOM(html)
                let tempProductPrice = newHtml.window.document.getElementsByClassName('price')[0].innerHTML

                try {
                  item.productPrice.push({
                    currentPrice: tempProductPrice, 
                    createdAt: new Date()
                  })
                } catch (error) {
                  console.log(error)
                }
              })
              .catch(e => {
                console.log('paling bawah', e)
              })    
            } catch (error) {
            console.log(error)
            }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = ProductCtrl