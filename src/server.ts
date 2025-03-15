const express = require('express');
const proxy = require('express-http-proxy');
const port = 3005
const app = express();
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json());

// app.use('/v3', async (req, res) => {
//     console.log(" I am in v2");
//     res.send("v2")
// })

// app.use('/v1', proxy(process.env.USER_SERVICE, {
//     proxyReqPathResolver: (req) => {
//         return req.originalUrl.replace(/^\/v1/, "/api");
//     }, proxyErrorHandler: (err, res, next) => {
//         console.log(`Proxy error: ${err}`);
//         res.status(500).json({
//             message: `Internal server error`,
//             error: err.message,
//         });
//     },
//     proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
//         console.log(" I  am in v1 ", proxyReqOpts);
//         proxyReqOpts.headers["Content-Type"] = "application/json";
//         return proxyReqOpts;
//     }
//     // , userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
//     //     console.log(
//     //         `Response received from Identity service: ${proxyRes.statusCode}`
//     //     );
//     //     return proxyResData;
//     // },
// })
// );

// app.use('/v2', proxy(process.env.USER_SERVICE_LOGIN, {
//     proxyErrorHandler: (err, res, next) => {
//         console.log(`Proxy error: ${err}`);
//         res.status(500).json({
//             message: `Internal server error`,
//             error: err.message,
//         })
//     },
//     proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
//         console.log("routing to user service login");
//         proxyReqOpts.headers["Content-Type"] = "application/json";
//         return proxyReqOpts;
//     },
// }))

app.use('/userService', proxy(process.env.USER_SERVICE_LOGIN, {
    proxyErrorHandler: (err, res, next) => {
        console.log(`proxy error: ${err}`);
        res.status(500).json({
            message: `Internal Server error`,
            error: err.message,
        })
    },
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
        console.log("routing to user service login");
        proxyReqOpts.headers["Content-Type"] = "application/json";
        return proxyReqOpts;
    },
    proxyReqPathResolver: (req) => {
        console.log(req.url, "68");
        return req.url;
    }
}))


app.listen(port, (err) => {
    if (!err) {
        console.log(`listening port on${port}`);
    } else {
        console.error(err, "Error ", port);
    }
})



