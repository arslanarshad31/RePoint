import request from 'superagent'

function getData_helper() {
    let data = request.get("http://54.255.134.151:5000/api/portfolio/").then(data => JSON.parse(data.text))
    return data;
}

const getPortfolioData = () => {
  let data = getData_helper();
  console.log(data)
  return {
    type: 'GET_PORTFOLIO',
    payload: data
  }
};
export default getPortfolioData;
