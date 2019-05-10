const express = require('express');
const router = express.Router();
const isNullOrUndefined = require('../utils/isNullOrUndefined');
const request = require('request');

router.get('/', function (req, res) {
        let since = req.query.since;
        const opts = {};

        if (!isNullOrUndefined(since)) {
            since = Number(since);
            if (typeof since !== "number" || isNaN(since)) {
                res.status(400).jsonp(
                    {
                        success: false,
                        error: "The \"since\" query parameter must be a valid number."
                    }
                );
            } else {
                opts['since'] = since;
            }
        }

        request({
                method: 'GET',
                url: 'https://api.github.com/users',
                qs: opts,
                headers: {'User-Agent': 'SANDP-Test-App/0.0.1'}
            },
            (reqError, reqResponse, reqBody) => {
                if (reqResponse.statusCode === 200) {
                    res.status(200).jsonp(
                        {
                            success: true,
                            data: JSON.parse(reqBody)
                        }
                    );

                } else {
                    res.status(reqResponse.statusCode).jsonp(
                        {
                            success: false,
                            error: reqBody
                        }
                    );
                }
            }
        );

    }
);

router.get('/:username/details', function (req, res) {
        const username = req.params.username;

        request({
                method: 'GET',
                url: 'https://api.github.com/users/' + username,
                headers: {'User-Agent': 'SANDP-Test-App/0.0.1'}
            },
            (reqError, reqResponse, reqBody) => {
                if (reqResponse.statusCode === 200) {
                    res.status(200).jsonp(
                        {
                            success: true,
                            data: JSON.parse(reqBody)
                        }
                    );

                } else {
                    res.status(reqResponse.statusCode).jsonp(
                        {
                            success: false,
                            error: reqBody
                        }
                    );
                }
            }
        );

    }
);

router.get('/:username/repos', function (req, res) {
        const username = req.params.username;

        request({
                method: 'GET',
                url: 'https://api.github.com/users/' + username + '/repos',
                headers: {'User-Agent': 'SANDP-Test-App/0.0.1'}
            },
            (reqError, reqResponse, reqBody) => {
                if (reqResponse.statusCode === 200) {
                    res.status(200).jsonp(
                        {
                            success: true,
                            data: JSON.parse(reqBody)
                        }
                    );

                } else {
                    res.status(reqResponse.statusCode).jsonp(
                        {
                            success: false,
                            error: reqBody
                        }
                    );
                }
            }
        );

    }
);

module.exports = router;
