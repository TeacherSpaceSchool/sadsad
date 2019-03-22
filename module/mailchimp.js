const request = require('superagent');
const MailingBiletiki = require('../models/mailingBiletiki');

const send = async (email, name, surname, _id) => {
    let mailingBiletiki = await MailingBiletiki.findOne();
    console.log(mailingBiletiki)
    if(mailingBiletiki!==null)
        await request
            .post('https://' + mailingBiletiki.mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + mailingBiletiki.listUniqueId)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic ' + new Buffer('anystring:' + mailingBiletiki.mailchimpApiKey ).toString('base64'))
            .send({'members':[
                {
                    'email_address': email,
                    'status': 'subscribed',
                    'merge_fields': {
                        'FNAME': name,
                        'LNAME': surname
                    }
                }
                ], 'update_existing': true})
}

module.exports.send = send;
