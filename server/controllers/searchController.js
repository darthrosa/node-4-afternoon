const swag = require('./../models/swag');
 
module.exports = {
    search: (req, res) => {
        const {category} = req.query;
        if(!category) {
            res.staus(200).send(swag)
        } else {
            const filterdSwag = swag.filter(swag => swag.category === category);
            res.staus(200).send(filterdSwag);
        }
    }
}