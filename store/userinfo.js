export const state = () => ({
  userLoggedIn:false,
  userInfo:{
    about: '',
    cover_image: '',
    education: '',
    email: '',
    f_name: "",
    l_name: "",
    occupation: '',
    phn_no: "",
    phn_no_verified_at: "",
    profile_image: "",
  }
})

export const mutations = {
  updateUserInfo(state, userInfo){
    state.userInfo=userInfo;
  },
  updateLoggedInStatus(state, status){
    state.userLoggedIn=status;
  },
  updateProfileImage(state, image){
    state.userInfo.profile_image=image;
  },
  updateCoverImage(state, image){
    state.userInfo.cover_image=image;
  }
}
