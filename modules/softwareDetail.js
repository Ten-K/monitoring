const dbData = require('./dbData')

async function getNetworkAccessList(params){
  let whereObj = {...params.data};
  whereObj.type = 4097;
  return await dbData.searchDBData(whereObj);
}

module.exports = {
  getNetworkAccessList
}