<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mb-3">Edit Fuel Category</h4>

            <form role="form" @submit.prevent="updateFuelCategory">
              <b-form-group id="fieldset-1" description="This type will be added to the category list." label="Fuel category title" label-for="exampleInputEmail1">
                <b-form-input id="exampleInputEmail1" type="text" placeholder="Fuel Category Title" v-model="categoryTitle" required></b-form-input>
              </b-form-group>
              <b-form-group label="Fuel category rate" label-for="exampleInputPassword1">
                <b-form-input id="exampleInputPassword1" type="number" placeholder="Fuel Rate" v-model="categoryRate" required></b-form-input>
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
import {edit_fuel_category, update_fuel_category} from "@/api/urls";

export default {
  name: "editFuelCategory",
  middleware: "authenticate",
  head() {
    return {
      title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
    };
  },
  data() {
    return {
      title: "Fuel Category",
      items: [{
        text: "Admin",
        href: "/",
      },
        {
          text: "Fuel Category",
          href: "/fuel-category",
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
      categoryRate: '',
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
      let editUrl = edit_fuel_category + '/' +self.$route.params.id;

      self.$axios.$get(editUrl, config)
        .then(function (res) {
          if (res.error === true){
            self.errorMessage=res.msg
          }
          else {
            self.categoryTitle=res.data.title;
            self.categoryRate=res.data.rate;
            self.categoryCreatedAt=res.data.update_date['$date'];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateFuelCategory(){
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
        rate: self.categoryRate
      }

      self.$axios.$put(update_fuel_category, payload, config).then((res) => {
        if (res.error === true){
          self.errorMessage=res.msg
        }
        else {
          this.$router.push('/fuel-category');
          this.$toasted.success('Fuel category updated successfully',{ duration:5000, position: 'top-center' })
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
