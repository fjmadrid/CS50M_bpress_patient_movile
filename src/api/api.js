import axios from "axios";

import { API_URL } from "../constants";

export const api_login = (credentials) => {
  return axios.post(API_URL + "authentication/login/", credentials);
};

export const api_fetchPatient = (credentials) => {
  console.log(
    "Fetching the user data with credentials: ",
    JSON.stringify(credentials)
  );
  return axios.get(API_URL + "patient/", credentials);
};

export const api_fetchDoctor = () => {
  console.log("Fetching the assigned doctor ... ");
  return axios.get(API_URL + "patient/doctor");
};

// export const login = async (credentials, setPatient, setDoctor) => {
//   const resp1 = await axios.post(
//     API_URL + "authentication/login/",
//     credentials
//   );

//   if (resp1.status === 200) {
//     const key = resp1.data["key"];
//     axios.defaults.headers.common["Authorization"] = `Token ${key}`;

//     const resp2 = await axios.get(API_URL + "patient/", credentials);

//     if (resp2.status === 200) {
//       setPatient(resp2.data["user"]);

//       const resp3 = await axios.get(API_URL + "patient/doctor");

//       if (resp3.status === 200) {
//         setDoctor(resp3.data);
//       } else {
//         console.log(`Error ${resp3.status} getting doctor: ${resp3.error}`);
//       }
//     } else {
//       console.log(`Error ${resp2.status} getting patient: ${resp2.error}`);
//     }
//   } else {
//     console.log(`Error ${resp1.status} getting token: ${resp1.error}`);
//   }
// };
