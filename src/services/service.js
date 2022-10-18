import axios from 'axios'


const apiClient = axios.create({
    baseURL: `http://localhost:3000/`,
    withCredentials: false, 
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: 100000,
});

apiClient.interceptors.request.use(
    config => {
      const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

apiClient.interceptors.response.use(response => {
    return response
    },
    error => {
        if (error.response.status === 403) {
            window.location.href = '/login'
        }
        if (error.response.status === 401) {
            window.location.href = '/login'
        }
        return Promise.reject(error);
    });


class postAPI {

    // POSTS


    static getPosts(category){
        return apiClient.get(`apiPost/${category}`, );
    }

    //Create post
    static createPost(data){
        return apiClient.post(`apiPost`,data)
    }

     //Update post
     static editPost(id,data){
        return apiClient.patch(`apiPost/${id}`, data);
    }

    //Delete post
    static deletePost(id){
        return apiClient.delete(`apiPost/${id}`)
    }

    //Delete all posts
    static deletePostAll(category){
        return apiClient.delete(`apiPost/deleteAll/all/${category}`)
    }
    //Login
    static logIn(data){
        return axios.post(`http://localhost:3000/apiUsers`, data)
    }


    // CARDS



    static getCards(){
        return apiClient.get(`apiCard/`);
    }
    //get one card
    static getCard(id){
        return apiClient.get(`apiCard/${id}`);
    }

    //Create post
    static createCard(data){
        return apiClient.post(`apiCard`,data)
    }

     //Update post
     static editCard(id,data){
        return apiClient.patch(`apiCard/${id}`, data); 
    }

    //Delete post
    static deleteCard(id){
        return apiClient.delete(`apiCard/${id}`)
    }

    //Delete all posts
    static deleteCardAll(){
        return apiClient.delete(`apiCard/deleteAll/all`)
    }

     //Create post
     static addImages(data){
        return apiClient.post(`apiCard/details`,data)
    }



    // CARDS Gallery


    //Create post

    //Update post
    static editImage(id,data, image){
        return apiClient.patch(`apiCardGallery/${id}/${data}`, image);
    }

    //Delete post
    static deleteImage(data){
        return apiClient.delete(`apiCardGallery/${data.id}/${data.image}`)
    }

    //Delete all posts
    static deleteImageAll(id){
        return apiClient.delete(`apiCardGallery/deleteAll/all/${id}`)
    }

}

export default postAPI