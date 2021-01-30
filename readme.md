# Introduction

Martian Robots is an API wich make a robot moves.

{% hint style="info" %}
**Is Python your language of choice?** If so, we have a [fully-supported Python API client](https://docs.getgophish.com/python-api-client/) that makes working with the Gophish API a piece of cake!
{% endhint %}

## Use Cases

There are many reasons to use the Gophish API. The most common use case is to gather report information for a given campaign, so that you can build custom reports in software you're most familiar with, such as Excel or Numbers.

However, automating the creation of campaigns and campaign attributes such as templates, landing pages, and more provides the ability to create a fully automated phishing simulation program. This would allow campaigns to be run throughout the year automatically. This also allows the Gophish administrator to be included in the campaigns, since they wouldn't know exactly which day it would start!

## END POINTS
### POST ROBOTS MOVEMENT
```http
POST http://localhost:3000/movements
```
You must send:
- size: mars ground size
- movements: a list of movements with the initial position

#### Example
```http
POST http://localhost:3000/movements

body: {
    "size": {
        "x": 5,
        "y": 3
    },
    "movements": [
        {
            "position": {
                "x": 1,
                "y": 1,
                "o": "E"
            },
            "instructions": [
                "R",
                "F",
                "R",
                "F",
                "R",
                "F",
                "R",
                "F"
            ]
        },
        {
            "position": {
                "x": 3,
                "y": 2,
                "o": "N"
            },
            "instructions": [
                "F",
                "R",
                "R",
                "F",
                "L",
                "L",
                "F",
                "F",
                "R",
                "R",
                "F",
                "L",
                "L"
            ]
        },
        {
            "position": {
                "x": 0,
                "y": 3,
                "o": "W"
            },
            "instructions": [
                "L",
                "L",
                "F",
                "F",
                "F",
                "L",
                "F",
                "L",
                "F",
                "L"
            ]
        }
    ]
}
```

Response: 
```
[
    {
        "x": 1,
        "y": 1,
        "o": "E",
        "lost": false
    },
    {
        "x": 3,
        "y": 2,
        "o": "N",
        "lost": false
    },
    {
        "x": 2,
        "y": 3,
        "o": "S",
        "lost": false
    }
]
```
### GET ROBOTS MOVEMENT

```http
GET http://localhost:3000/movements?${lost}
```

You could send:
- lost: true|false (optional)
- 
#### Example

```http
GET http://localhost:3000/movements
```

Response: 
```
[
    {
        "_id": "60142e71942d5d60e9caae41",
        "movements": [
            {
                "x": 1,
                "y": 1,
                "o": "S",
                "lost": false
            },
            {
                "x": 1,
                "y": 0,
                "o": "S",
                "lost": false
            },
            {
                "x": 1,
                "y": 0,
                "o": "W",
                "lost": false
            },
            {
                "x": 0,
                "y": 0,
                "o": "W",
                "lost": false
            },
            {
                "x": 0,
                "y": 0,
                "o": "N",
                "lost": false
            },
            {
                "x": 0,
                "y": 1,
                "o": "N",
                "lost": false
            },
            {
                "x": 0,
                "y": 1,
                "o": "E",
                "lost": false
            },
            {
                "x": 1,
                "y": 1,
                "o": "E",
                "lost": false
            }
        ],
        "lost": false,
        "totalSteps": 8
    },
```

### GET EXPLORED TERRITORY

```http
GET http://localhost:3000/explored-territory?${explored}
```

You could send:
- status: explored|failed (optional)

#### Example

```http
GET http://localhost:3000/explored-territory?status=failed
```

Response: 
```
[
    {
        "_id": "60154ad5bc06500015c5ca9f",
        "status": "failed",
        "x": 1,
        "y": 1
    },
    {
        "_id": "60154ad5bc06500015c5caa1",
        "status": "failed",
        "x": 0,
        "y": 3
    },
```

## TESTING
You could run `npm run test` in order to execute all tests


## Status Codes

Gophish returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
