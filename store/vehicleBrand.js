export const state = () => ({
  vehicleBrandList:[]
})

export const mutations = {
  updateVehicleBrandList(state, brandList){
    state.vehicleBrandList=brandList;
  }
}
