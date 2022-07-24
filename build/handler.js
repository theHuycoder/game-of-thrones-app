"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var express = require("express");
var path = require("path");
var lowdb = require("lowdb");
var url = require("url");
var dayjs = require("dayjs");
var nanoid = require("nanoid");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var express__default = /* @__PURE__ */ _interopDefaultLegacy(express);
var dayjs__default = /* @__PURE__ */ _interopDefaultLegacy(dayjs);
class ServerError {
  constructor(errorMessage, status) {
    __publicField(this, "errorMessage");
    __publicField(this, "status");
    this.errorMessage = errorMessage;
    this.status = status;
  }
}
const __dirname$1 = path.dirname(url.fileURLToPath(typeof document === "undefined" ? new (require("url")).URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("handler.js", document.baseURI).href));
const file = path.join(__dirname$1, "db.json");
const adapter = new lowdb.JSONFile(file);
const db = new lowdb.Low(adapter);
const TOKEN_SPLIT_WORD = "USER_ID:";
class AuthService {
  constructor(db2) {
    __publicField(this, "db");
    this.db = db2;
  }
  async handleLogin({ email, password }) {
    const matchedUser = await this.findUserByEmail(email);
    if (!matchedUser) {
      return null;
    }
    if (matchedUser.password !== password) {
      return null;
    }
    return {
      authToken: `${nanoid.nanoid(10)}${TOKEN_SPLIT_WORD}${matchedUser.id}`,
      expiresOn: dayjs__default["default"]().add(1, "hour").unix()
    };
  }
  async isTokenValid(token) {
    return !!this.findUserByToken(token);
  }
  async findUserByToken(token) {
    const [, userId] = token.split(TOKEN_SPLIT_WORD);
    const matchedUser = await this.findUserById(Number(userId));
    if (!matchedUser)
      return null;
    return matchedUser;
  }
  async findUserByEmail(email) {
    await this.db.read();
    const { data } = this.db;
    if (!data || !data.users) {
      return null;
    }
    const matchedUser = data.users.find((user) => user.email === email);
    if (!matchedUser) {
      return null;
    }
    return matchedUser;
  }
  async findUserById(id) {
    await this.db.read();
    const { data } = this.db;
    if (!data || !data.users) {
      return null;
    }
    const matchedUser = data.users.find((user) => user.id === id);
    if (!matchedUser) {
      return null;
    }
    return matchedUser;
  }
}
const router = express.Router();
const authService = new AuthService(db);
router.post("/login", async (req, res) => {
  const { body } = req;
  const authInfo = await authService.handleLogin(body);
  if (!authInfo) {
    res.status(401).json(new ServerError("Wrong username or password", 401));
    return;
  }
  res.json(authInfo);
});
router.get("/verify-token", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.json({
      isValid: false
    });
  }
  const isValid = await authService.isTokenValid(token);
  res.json({
    isValid
  });
});
router.get("/user-info", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json(new ServerError("Token invalid", 403));
    return;
  }
  const isValid = await authService.isTokenValid(token);
  if (!isValid) {
    res.status(403).json(new ServerError("Token invalid", 403));
    return;
  }
  const matchedUser = await authService.findUserByToken(token);
  res.json({
    user: { email: (matchedUser == null ? void 0 : matchedUser.email) || "", id: (matchedUser == null ? void 0 : matchedUser.id) || "" }
  });
});
const authRouter = router;
(function dedupeRequire(dedupe) {
  const Module = require("module");
  const resolveFilename = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request[0] !== "." && request[0] !== "/") {
      const parts = request.split("/");
      const pkgName = parts[0][0] === "@" ? parts[0] + "/" + parts[1] : parts[0];
      if (dedupe.includes(pkgName)) {
        parent = module;
      }
    }
    return resolveFilename(request, parent, isMain, options);
  };
})(["react", "react-dom"]);
const app = express__default["default"]();
app.use(express__default["default"].json({
  limit: "100mb"
}));
app.use("/api/auth", authRouter);
const handler = app;
exports.handler = handler;
