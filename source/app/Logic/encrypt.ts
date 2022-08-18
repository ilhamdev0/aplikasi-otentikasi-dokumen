export const encrypt = (data, keypair) => {
    const getvalue = Object.values(data);
    const merged = getvalue.join("|")
    return merged
}