import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
import main from "./db.js";
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.route.js';
import ledgerAccountRoutes from './routes/ledgerAccount.route.js';
import ledgerEntriesRoutes from './routes/ledgerEntries.route.js'



const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser())


app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://awasthi-enterprises.vercel.app" || "http://localhost:5173",
    credentials: true,
  })
);

//db connection
main()
  .then((res) => console.log("Db connected"))
  .catch((err) => console.log("Error in Db connection"));


app.use('/api/v1/user' , userRoutes)
app.use('/api/v1/ledger/accounts' , ledgerAccountRoutes)
app.use('/api/v1/ledger/entries' , ledgerEntriesRoutes)



app.listen(PORT, () => console.log("server is running"));