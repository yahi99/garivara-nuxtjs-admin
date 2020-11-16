export const state = () => ({
  vehicleTypeCategoryList:[]
})

export const mutations = {
  updateVehicleTypeCategory(state, categoryList){
    state.vehicleTypeCategoryList=categoryList;
  }
}
