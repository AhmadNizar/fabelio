const ProductModel = require('../models')
const puppeter     = require('puppeteer')
const { JSDOM }     = require('jsdom')

class ProductCtrl {
  static async addNewProduct(req, res) {
    console.log('masuk cuk');
    
    puppeter
      .launch()
      .then((browser) => {
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

          res.status(200).send(newProductData)
        } catch (error) {
          res.status(500).send(error)
        }

        // console.log(tempProductName, tempProductPrice, tempDeskripsiBarang, newDeskripsiBarang, tempUrlProductImg)
        // res.status(500).send('from controller 1')
      })
    // console.log(req.body)
  }
  static async getNewProduct(req, res) {
    try {
      let tempDataProduct = await ProductModel.find()
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
}

module.exports = ProductCtrl