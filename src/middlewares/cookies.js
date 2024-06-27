import cookieParser from "cookie-parser"
import { COOKIE_S } from "../config/config.js"

export const cookies = cookieParser(COOKIE_S)