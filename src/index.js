// server

import express from "express";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
const PORT = 4000;

app.use(helmet());
app.use(morgan('dev'));
app.set('view engine',"pug");
app.set('views','./views');
const handleHome = (req, res) => {
    res.render("home");
}
app.get('/',handleHome);

app.listen(PORT,() => console.log(`Server is running`));
