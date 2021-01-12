import { createClient } from 'contentful';
//TOKEN content delivery api
const accessToken = 'TWRBagj1wP3F04UGLRoB_WlE-J18Nc5izp2qpcZyWJw';
const environment = 'master';
const space = 'agv5h5fnr06l';
const contentTypeEmployee = 'employee';
const contentTypeDisability = 'disability';
const client = createClient({ accessToken, environment, space });

export const getAllEmployee = () => {
  return client.getEntries({
    content_type: contentTypeEmployee,
  });
};

export const getAllDisability = () => {
  return client.getEntries({
    content_type: contentTypeDisability,
  });
};

// /**
//  * Get list of employees.
//  * @param {string} contentType contentType.
//  * @return {Promise} The result of fetching data.
//  */
// const fetchData = async (contentType) => {
//   client
//     .getEntries({
//       content_type: contentType,
//     })
//     .then((response) => {
//       const valores = response.map((currentValue) => {
//         const {
//           sys: { id },
//           fields: { username, code, startDate, dui, position },
//         } = currentValue;
//         return { id, username, code, startDate, dui, position };
//       });
//       return valores;
//     })
//     .catch((error) => []);
// };

// const getAllEmployee = fetchData(contentTypeEmployee);
// const getAllDisability = fetchData(contentTypeDisability);
// export { getAllEmployee, getAllDisability };
