const RandomLetter = require('../helpers/randomletter')
    const secret = RandomLetter(10);
    user.Salt = secret
    const hash = crypto.createHmac('sha256', secret)
      .update('hacktiv8' + user.UserName)
      .digest('hex');
    user.Password = hash