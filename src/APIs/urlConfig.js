// const baseUrl = process.env.API || "https://flipkart-rest-server.herokuapp.com";
const baseUrl = "http://localhost:7000/admin";
const imgUrl = "http://localhost:7000";

export const api = `${baseUrl}`;

export const generatePublicUrl = (fileName) => {
  // console.log(`${imgUrl}/public/${fileName}`);
  return `${imgUrl}/public/${fileName}`;
};
