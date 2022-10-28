const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    const url = "https://us9.api.mailchimp.com/3.0/lists/25ff2e49b5 "

    const options = {
        method: "POST",
        auth: "nazim:be03397b6dc86660a4a8be8c578edcb2-us9"
    }

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.send("Successfully Subscribed");
        }
        else {
            res.send("there was");
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});
app.listen(3000, () => {
    console.log("server is running fine");
})


// be03397b6dc86660a4a8be8c578edcb2-us9

// audiance id 25ff2e49b5. 