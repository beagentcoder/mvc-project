import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
export default class UserController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    res.render("login", { errorMessage: null });
  }
  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.redirect("/login");
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);

    if (!user) {
      res.render("login", { errorMessage: "Invalid Credentials" });
    }
    else{
    req.session.userEmail = email;
    var products = ProductModel.get();
    res.render('products', { products, useremail: req.session.userEmail });
    }
  }
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
    res.clearCookie(lastVisit)
  }
}
