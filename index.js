import express from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import validationMiddleware from "./src/middlewares/validation.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import {auth} from './src/middlewares/auth.middleware.js'
import cookieParser from "cookie-parser";
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js'
const app = express();
const port = 3000;

const userController = new UserController();
const productController = new ProductController();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(express.static("src/views"));
app.use(expressLayouts);
app.use(express.static("public"));
app.use(cookieParser())
app.use(session({
  secret: "my-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie:{
    secure:false
  }
  
}))

app.get("/register", userController.getRegister);
app.post("/register", userController.postRegister);
app.get("/login", userController.getLogin);
app.post('/login',userController.postLogin)
app.get('/logout',userController.logout)

app.get("/",auth,setLastVisit,productController.getProducts);
app.get("/new", auth, productController.getAddForm);
app.post(
  "/addProduct",auth,
  uploadFile.single("imageUrl"),
  validationMiddleware,
  productController.addNewProduct
);

app.get("/updateProduct/:id",auth, productController.getUpdateProductView);
app.post("/updateProduct", auth,productController.postUpdateProduct);

app.post("/deleteProduct/:id",auth, productController.deleteProduct);

app.listen(port, () => console.log(` listening on port ${port}!`));
