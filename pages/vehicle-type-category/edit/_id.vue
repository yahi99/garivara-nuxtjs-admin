<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-3">Edit Vehicle type category</h4>

            <form role="form" @submit.prevent="updateVehicleTypeCategory">
              <b-form-group id="fieldset-1" label="Vehicle Type category title" label-for="exampleInputEmail1">
                <b-form-input id="exampleInputEmail1" type="text" placeholder="Vehicle Type Category Title" v-model="categoryTitle" required></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Update</b-button>
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
import {edit_vehicle_type_category, update_vehicle_type_category} from "@/api/urls";

export default {
  name: "editVehicleTypeCategory",
  middleware: "authenticate",
  head() {
    return {
      title: `${this.title} | AND Garivara`,
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
          text: "Edit",
          active: true,
        },
      ],
      checked: true,
      checked2: false,
      status: 'accepted',
      status2: 'not_accepted',
      selected: 'A',
      categoryTitle: '',
      errorMessage: '',
      categoryCreatedAt: '',
    };
  },
  methods:{
    getCategoryData(){
      let self = this;
      const token = this.$cookies.get('accessToken');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }
      let editUrl = edit_vehicle_type_category + '/' + self.$route.params.id;
      self.$axios.$get(editUrl, config)
        .then(function (res) {
          if (res.error === true){
            self.errorMessage=res.msg
          }
          else {
            self.categoryTitle=res.data.title;
            self.categoryCreatedAt=res.data.update_date['$date'];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateVehicleTypeCategory(){
      let self = this;
      const token = this.$cookies.get('accessToken');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }
      let payload = {
        "_id":self.$route.params.id,
        title: self.categoryTitle,
      }

      self.$axios.$put(update_vehicle_type_category, payload, config).then((res) => {
        if (res.error === true){
          self.errorMessage=res.msg
        }
        else {
          this.$router.push('/vehicle-type-category');
          this.$toasted.success('Vehicle type category updated successfully',{ duration:5000, position: 'top-center' })
        }
      }).catch((error)=>{
        console.log(error)
      });
    }
  },
  mounted() {
    this.getCategoryData();
  }
}
</script>

<style scoped>

</style>
