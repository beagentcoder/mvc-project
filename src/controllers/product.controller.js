import ProductModel from "../models/product.model.js";


class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    res.render('products', { products,useremail: req.session.useremail});
  }
  getAddForm(req, res) {
    return res.render("new-product", { errorMessage: null,useremail: req.session.useremail });
  }
  addNewProduct(req, res) {
    const {name,desc,price} =req.body
    const imageUrl='images/'+req.file.filename
    ProductModel.add(name,desc,price,imageUrl);
    let products = ProductModel.get();    
    res.render("products", { products ,useremail: req.session.useremail});
  }

  getUpdateProductView(req, res, next) {
    const id =req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product",{product:productFound,errorMessage:null,useremail: req.session.useremail});
    } else {
      res.status(401).send("Product Not Found");
    }
  }
  postUpdateProduct(req,res){
    ProductModel.update(req.body);
    let products = ProductModel.get();
    res.render("products", { products,useremail: req.session.useremail });
  }
  deleteProduct(req, res) {

    const id =req.params.id;
    
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Product Not Found");
    }
    ProductModel.delete(id)
    let products = ProductModel.get();
    res.render('products', { products,useremail: req.session.useremail});
    
  }
}


export default ProductController;