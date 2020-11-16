<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-3">Add New vehicle type category</h4>

            <form role="form" @submit.prevent="addVehicleTypeCategory">
              <b-form-group id="fieldset-1"  label="Vehicle type category title" label-for="exampleInputEmail1">
                <b-form-input id="exampleInputEmail1" type="text" placeholder="Vehicle Type Category Title" v-model="categoryTitle" required></b-form-input>
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
import {add_vehicle_type_category} from "@/api/urls";

export default {
  name: "createVehicleType",
  middleware: "authenticate",
  head() {
    return {
      title: `${this.title} | And Garivara`,
    };
  },
  data() {
    return {
      title: "Vehicle Type Category",
      items: [{
        text: "Admin",
        href: "/",
      },
        {
          text: "Vehicle Type Category",
          href: "/vehicle-type-category",
        },
        {
          text: "Add New",
          active: true,
        },
      ],
      checked: true,
      checked2: false,
      status: 'accepted',
      status2: 'not_accepted',
      selected: 'A',
      categoryTitle: '',
      errorMessage: ''
    };
  },
  methods:{
    addVehicleTypeCategory(){
      let self = this;
      const token = this.$cookies.get('accessToken');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }
      let payload = {
        title: self.categoryTitle,
      }

      self.$axios.$post(add_vehicle_type_category, payload, config).then((res) => {
        if (res.error === true){
          this.errorMessage=res.msg
        }
        else {
          this.$router.push('/vehicle-type-category');
        }
      }).catch((error)=>{
        console.log(error)
      });
    }
  }
}
</script>

<style scoped>

</style>
