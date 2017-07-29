import request from 'superagent'

function getData_helper() {
    let data = request.get("http://repoints.tech:5000/api/portfolio/").then(data => JSON.parse(data.text))
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
