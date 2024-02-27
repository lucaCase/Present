/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import express, {Express} from "express";
import cors from "cors";
import helmet from "helmet";
import {ModelRouter} from "./model/router";

dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);


class Application {
    private express: Express = express();

    constructor() {
        this.configureExpress();
    }

    public run() {
        /** change port in .env-file, not here! */
        this.express.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    }

    private configureExpress() {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(express.json()); // needed to parse json payload

        // configure winston to automatically log all requests
        const loggerOptions: expressWinston.LoggerOptions = {
            transports: [new winston.transports.Console()],
            msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} response after {{res.responseTime}}ms",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.prettyPrint(),
                winston.format.colorize({level: true}),
                winston.format.printf(({level, message, timestamp}) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
        };
        this.express.use(expressWinston.logger(loggerOptions)); // use the configured logger

        this.addRoutes();
        this.setupNotFound();
        this.setupErrorHandling();
    }

    private addRoutes() {
        /** Add new Main-Routes here (i.e. 'api/blog', 'api/student', 'ws/message', ...) */
        this.express.use("/", new ModelRouter().router);
    }

    private setupNotFound() {
        this.express.use((req: any, res: any) => {
            res.status(404);
            res.json({error: "route not found"});
        });
    }

    private setupErrorHandling() {
        this.express.use((err: any, req: any, res: any, next: any) => {
            console.error(err);
            res.status(500);
            res.json({error: "Internal Server Error"});
        });
    }
}

new Application().run();