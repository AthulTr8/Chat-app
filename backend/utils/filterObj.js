const filterObjects = (obj, ...allowedFIelds) =>{
    const newObj = {}
    Object.keys(obj).forEach((el)=>{
        if (allowedFIelds.includes(el)) {
            newObj[el] = obj[el]
        }
    })
    return newObj
}

module.exports = filterObjects