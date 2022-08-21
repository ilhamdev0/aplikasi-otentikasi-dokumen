export const objtotext = (formdata) =>  {
    const {username,kode,timestamp} = formdata
    return [username,kode,timestamp].join('|');
}