const { web } = require("./application/web.js");

const port = process.env.PORT || 3000
web.listen(port, () => {
    console.log(`Application running on port ${port}`);
});