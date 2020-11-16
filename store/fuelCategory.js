export const state = () => ({
  fuelCategoryList:[]
})

export const mutations = {
  updateFuelCategoryList(state, categoryList){
    state.fuelCategoryList=categoryList;
  }
}
