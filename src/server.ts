import express from "express";
import type  { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.ts";
import morgan from "morgan"; 
import indexRouter from "./routes/index.route.ts"
// import swagger from "swagger-ui-express";
// import swaggerSpec from "./services/swagger.ts";
// import { authenticate } from "./middlewares/auth.middleware.ts";
// import employeeRouter from "./Routes/employee.routes.ts";

dotenv.config();
// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware

// CORS configuration
// app.use(cors(
//   {
//     origin:(_origin, callback)=>callback(null,true),
//     credentials:true,
//   }
// ));
app.use(morgan("dev"));
app.use(express.json());
// app.use("/api-docs", swagger.serve, swagger.setup(swaggerSpec));

// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

//Routes

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("The server is running properly.");
});




// app.use("/api/v1", employeeRouter);
app.use("/api/v1", indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});