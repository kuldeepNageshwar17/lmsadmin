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
      return config;
    },
    err => Promise.reject(err)
  );
}
