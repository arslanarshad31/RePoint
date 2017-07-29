import request from 'superagent'

function getData_helper() {
    return request.get("http://repoints.tech:5000/api/all/").then(data => {
      let main = JSON.parse(data.text)
        return request.get("http://repoints.tech:5000/api/demoAccountData/").then(acc => {
          main.Account = JSON.parse(acc.text)
          return main;
        })
    })
}

const getAllData = () => {
  let data = getData_helper();
  console.log(data)
  return {
    type: 'GET_ALL',
    payload: data
  }
};
export default getAllData;
