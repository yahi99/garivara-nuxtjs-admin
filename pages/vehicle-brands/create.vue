<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-3">Add New Vehicle Brand</h4>

            <form role="form" @submit.prevent="addVehicleBrand">
              <b-form-group label="Vehicle type" label-for="selectVehicleType">
                <b-form-select id="selectVehicleType" v-model="selected" :options="categoryList" required></b-form-select>
              </b-form-group>
              <b-form-group id="fieldset-1" label="Vehicle brand title" label-for="exampleInputEmail1">
                <b-form-input id="exampleInputEmail1" type="text" placeholder="Vehicle Brand Title" v-model="brandTitle" required></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
            </form>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
</template>

<script>
import {add_vehicle_brand, vehicle_type_category_list} from "@/api/urls";

export default {
  name: "createVehicleBrand",
  middleware: "authenticate",
  head() {
    return {
      title: `${this.title} | ` + process.env.APP_NAME,
    };
  },
  data() {
    return {
      title: "Vehicle Brand",
      items: [{
        text: "Admin",
        href: "/",
      },
        {
          text: "Vehicle Brand",
          href: "/vehicle-brands",
        },
        {
          text: "Edit",
          active: true,
        },
      ],
      checked: true,
      checked2: false,
      status: 'accepted',
      status2: 'not_accepted',
      selected: null,
      categoryList: [],
      errorMessage: '',
      brandTitle: ''
    };
  },
  methods:{
    addVehicleBrand(){
      let self = this;
      const token = this.$cookies.get('accessTokenAdmin');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }
      let payload = {
        '_id': self.selected,
        'brand': self.brandTitle
      }

      self.$axios.$post(add_vehicle_brand, payload, config).then((res) => {
        if (res.error === true){
          this.errorMessage=res.msg
        }
        else {
          this.$router.push('/vehicle-brands');
          this.$toasted.success('New vehicle brand added successfully',{ duration:5000, position: 'top-center' })
        }
      }).catch((error)=>{
        console.log(error)
      });
    },
    getAllVehicleTypes(){
      let self = this;
      let config = {
        headers: {
          'Accept': 'application/json'
        },
      }

      self.$axios.$get(vehicle_type_category_list, config).then((res) => {
        if (res.error === true){
          this.errorMessage=res.msg
        }
        else {
          this.$store.commit('vehicleTypeCategory/updateVehicleTypeCategory',res.data);
          if (res.data.length > 0){
            this.selected=res.data[0]['_id']['$oid'];
            res.data.forEach(function (item, index){
              let singleVehicleType={};
              singleVehicleType['value']=item['_id']['$oid'];
              singleVehicleType['text']=item.title;
              self.categoryList.push(singleVehicleType);
            })
          }
        }
      }).catch((error)=>{
        console.log(error)
      });
    }
  },
  mounted() {
    this.getAllVehicleTypes();
  }
}
</script>

<style scoped>

</style>
