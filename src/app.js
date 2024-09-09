import express from "express";
import path from "path";
import { create } from "express-handlebars";
import { appPort } from "./config/env.js";
import { swaggerDocs } from "./utils/swagger/index.js";
import { getRoute } from "./utils/getRoute.js";
import { dbConnect, dbError } from "./config/db.js";
import productsRouter from "./routes/product.router.js";
import cartsRouter from "./routes/cart.router.js";
import staticRouter from "./routes/static.router.js";
import homeRouter from "./routes/home.router.js";

const PORT = appPort || 8080;
const __dirname = getRoute(import.meta.url);
const app = express();
const hbs = create({
  extname: "hbs",
  partialsDir: path.join(__dirname, "views", "partials"),
});

app.use("/", homeRouter);

app.use(express.static(path.join(__dirname, "public")));

dbConnect();
dbError;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/product", productsRouter);
app.use("/api/cart", cartsRouter);
app.use("/views", staticRouter);

swaggerDocs(app, PORT, __dirname);

export { app, PORT };
