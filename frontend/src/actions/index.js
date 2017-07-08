import request from 'superagent'

function getData_helper() {
    let data = request.get("http://54.255.134.151:5000/api/all").then(data => JSON.parse(data.text))
    return data;
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
