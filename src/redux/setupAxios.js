export default function setupAxios(axios, store) {


  axios.interceptors.request.use(
    config => {
      const {auth: {authToken,currentBranch}} = store.getState();
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;        
      }
      debugger;
      if(currentBranch){
        config.headers["branchid"] = currentBranch._id;
      }

      config.baseURL = 'http://192.168.1.12:4000';
      //config.baseURL = 'http://127.0.0.1:4000';

      return config;
    },
    err => Promise.reject(err)
  );

  axios.interceptors.response.use(function (response) {
    
    return response;
  }, function (error) {
        debugger;
      console.log(error)
      if(error.response.status === 401)
      window.location.href = "/logout";
    return Promise.reject(error);
  });
}
