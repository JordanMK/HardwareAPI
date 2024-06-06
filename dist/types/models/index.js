"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.ComponentType = exports.ComputerType = exports.DeviceType = void 0;
var DeviceType;
(function (DeviceType) {
    DeviceType["COMPUTER"] = "Computer";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
var ComputerType;
(function (ComputerType) {
    ComputerType["DESKTOP"] = "Desktop";
    ComputerType["LAPTOP"] = "Laptop";
})(ComputerType || (exports.ComputerType = ComputerType = {}));
var ComponentType;
(function (ComponentType) {
    ComponentType["CPU"] = "CPU";
    ComponentType["GPU"] = "GPU";
    ComponentType["RAM"] = "RAM";
})(ComponentType || (exports.ComponentType = ComponentType = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
