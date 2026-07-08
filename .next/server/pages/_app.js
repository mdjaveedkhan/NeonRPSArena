/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/AppContext.jsx":
/*!********************************!*\
  !*** ./context/AppContext.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppProvider: () => (/* binding */ AppProvider),\n/* harmony export */   useApp: () => (/* binding */ useApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst AppContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);\nfunction AppProvider({ children }) {\n    const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=> false ? 0 : \"dark\");\n    const [soundEnabled, setSoundEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=> false ? 0 : true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (typeof document !== \"undefined\") document.documentElement.dataset.theme = theme;\n        try {\n            localStorage.setItem(\"rps-theme\", theme);\n        } catch  {}\n    }, [\n        theme\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        try {\n            localStorage.setItem(\"rps-sound\", soundEnabled ? \"on\" : \"off\");\n        } catch  {}\n    }, [\n        soundEnabled\n    ]);\n    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({\n            theme,\n            soundEnabled,\n            toggleTheme: ()=>setTheme((current)=>current === \"dark\" ? \"light\" : \"dark\"),\n            toggleSound: ()=>setSoundEnabled((current)=>!current)\n        }), [\n        theme,\n        soundEnabled\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AppContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\mdjaveedkhan\\\\Desktop\\\\RPS\\\\rock-paper-scissors\\\\context\\\\AppContext.jsx\",\n        lineNumber: 28,\n        columnNumber: 10\n    }, this);\n}\nfunction useApp() {\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AppContext);\n    if (!context) throw new Error(\"useApp must be used inside AppProvider\");\n    return context;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0L0FwcENvbnRleHQuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBZ0Y7QUFFaEYsTUFBTUssMkJBQWFMLG9EQUFhQSxDQUFDO0FBRTFCLFNBQVNNLFlBQVksRUFBRUMsUUFBUSxFQUFFO0lBQ3RDLE1BQU0sQ0FBQ0MsT0FBT0MsU0FBUyxHQUFHTCwrQ0FBUUEsQ0FBQyxJQUFNLE1BQWtCLEdBQWNNLENBQTJDLEdBQUc7SUFDdkgsTUFBTSxDQUFDRSxjQUFjQyxnQkFBZ0IsR0FBR1QsK0NBQVFBLENBQUMsSUFBTyxNQUFrQixHQUFjTSxDQUEyQyxHQUFHO0lBRXRJUixnREFBU0EsQ0FBQztRQUNSLElBQUksT0FBT1ksYUFBYSxhQUFhQSxTQUFTQyxlQUFlLENBQUNDLE9BQU8sQ0FBQ1IsS0FBSyxHQUFHQTtRQUM5RSxJQUFJO1lBQUVFLGFBQWFPLE9BQU8sQ0FBQyxhQUFhVDtRQUFRLEVBQUUsT0FBTSxDQUFDO0lBQzNELEdBQUc7UUFBQ0E7S0FBTTtJQUVWTixnREFBU0EsQ0FBQztRQUNSLElBQUk7WUFBRVEsYUFBYU8sT0FBTyxDQUFDLGFBQWFMLGVBQWUsT0FBTztRQUFRLEVBQUUsT0FBTSxDQUFDO0lBQ2pGLEdBQUc7UUFBQ0E7S0FBYTtJQUVqQixNQUFNTSxRQUFRZiw4Q0FBT0EsQ0FDbkIsSUFBTztZQUNMSztZQUNBSTtZQUNBTyxhQUFhLElBQU1WLFNBQVMsQ0FBQ1csVUFBYUEsWUFBWSxTQUFTLFVBQVU7WUFDekVDLGFBQWEsSUFBTVIsZ0JBQWdCLENBQUNPLFVBQVksQ0FBQ0E7UUFDbkQsSUFDQTtRQUFDWjtRQUFPSTtLQUFhO0lBR3ZCLHFCQUFPLDhEQUFDUCxXQUFXaUIsUUFBUTtRQUFDSixPQUFPQTtrQkFBUVg7Ozs7OztBQUM3QztBQUVPLFNBQVNnQjtJQUNkLE1BQU1DLFVBQVV2QixpREFBVUEsQ0FBQ0k7SUFDM0IsSUFBSSxDQUFDbUIsU0FBUyxNQUFNLElBQUlDLE1BQU07SUFDOUIsT0FBT0Q7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL3JvY2stcGFwZXItc2Npc3NvcnMvLi9jb250ZXh0L0FwcENvbnRleHQuanN4PzZhMTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgQXBwQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQobnVsbCk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQXBwUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XHJcbiAgY29uc3QgW3RoZW1lLCBzZXRUaGVtZV0gPSB1c2VTdGF0ZSgoKSA9PiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicnBzLXRoZW1lXCIpIHx8IFwiZGFya1wiIDogXCJkYXJrXCIpO1xyXG4gIGNvbnN0IFtzb3VuZEVuYWJsZWQsIHNldFNvdW5kRW5hYmxlZF0gPSB1c2VTdGF0ZSgoKSA9PiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJwcy1zb3VuZFwiKSAhPT0gXCJvZmZcIiA6IHRydWUpKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGF0YXNldC50aGVtZSA9IHRoZW1lO1xyXG4gICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJycHMtdGhlbWVcIiwgdGhlbWUpOyB9IGNhdGNoIHt9XHJcbiAgfSwgW3RoZW1lXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInJwcy1zb3VuZFwiLCBzb3VuZEVuYWJsZWQgPyBcIm9uXCIgOiBcIm9mZlwiKTsgfSBjYXRjaCB7fVxyXG4gIH0sIFtzb3VuZEVuYWJsZWRdKTtcclxuXHJcbiAgY29uc3QgdmFsdWUgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgdGhlbWUsXHJcbiAgICAgIHNvdW5kRW5hYmxlZCxcclxuICAgICAgdG9nZ2xlVGhlbWU6ICgpID0+IHNldFRoZW1lKChjdXJyZW50KSA9PiAoY3VycmVudCA9PT0gXCJkYXJrXCIgPyBcImxpZ2h0XCIgOiBcImRhcmtcIikpLFxyXG4gICAgICB0b2dnbGVTb3VuZDogKCkgPT4gc2V0U291bmRFbmFibGVkKChjdXJyZW50KSA9PiAhY3VycmVudClcclxuICAgIH0pLFxyXG4gICAgW3RoZW1lLCBzb3VuZEVuYWJsZWRdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIDxBcHBDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvQXBwQ29udGV4dC5Qcm92aWRlcj47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VBcHAoKSB7XHJcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQXBwQ29udGV4dCk7XHJcbiAgaWYgKCFjb250ZXh0KSB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VBcHAgbXVzdCBiZSB1c2VkIGluc2lkZSBBcHBQcm92aWRlclwiKTtcclxuICByZXR1cm4gY29udGV4dDtcclxufVxyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VNZW1vIiwidXNlU3RhdGUiLCJBcHBDb250ZXh0IiwiQXBwUHJvdmlkZXIiLCJjaGlsZHJlbiIsInRoZW1lIiwic2V0VGhlbWUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic291bmRFbmFibGVkIiwic2V0U291bmRFbmFibGVkIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJkYXRhc2V0Iiwic2V0SXRlbSIsInZhbHVlIiwidG9nZ2xlVGhlbWUiLCJjdXJyZW50IiwidG9nZ2xlU291bmQiLCJQcm92aWRlciIsInVzZUFwcCIsImNvbnRleHQiLCJFcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./context/AppContext.jsx\n");

/***/ }),

/***/ "./pages/_app.jsx":
/*!************************!*\
  !*** ./pages/_app.jsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_AppContext_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/AppContext.jsx */ \"./context/AppContext.jsx\");\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AppContext_jsx__WEBPACK_IMPORTED_MODULE_2__.AppProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\mdjaveedkhan\\\\Desktop\\\\RPS\\\\rock-paper-scissors\\\\pages\\\\_app.jsx\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\mdjaveedkhan\\\\Desktop\\\\RPS\\\\rock-paper-scissors\\\\pages\\\\_app.jsx\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQStCO0FBQ3lCO0FBRXpDLFNBQVNDLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDcEQscUJBQ0UsOERBQUNILGdFQUFXQTtrQkFDViw0RUFBQ0U7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUc5QiIsInNvdXJjZXMiOlsid2VicGFjazovL3JvY2stcGFwZXItc2Npc3NvcnMvLi9wYWdlcy9fYXBwLmpzeD80Y2IzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcclxuaW1wb3J0IHsgQXBwUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L0FwcENvbnRleHQuanN4JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8QXBwUHJvdmlkZXI+XHJcbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgIDwvQXBwUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiQXBwUHJvdmlkZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.jsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.jsx"));
module.exports = __webpack_exports__;

})();