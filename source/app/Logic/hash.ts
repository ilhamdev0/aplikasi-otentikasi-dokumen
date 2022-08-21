const bcrypt = require('bcrypt');

export const hash = (data) => {
    const saltRounds = 10;
    const digest = bcrypt.hashSync(data, saltRounds);
    return digest
}