<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title">Pending driver data</h4>
            <p class="sub-header">
              Here is the details data of the driver.
            </p>

            <div class="row">
              <div class="col-12">
                <div class="p-2">
                  <form class="form-horizontal" role="form" @submit.prevent="submitVerification">
                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">Name</label>
                      <div class="col-md-10">
                        <div>{{ driverInfo.name }}</div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">Phone No</label>
                      <div class="col-md-10">
                        <div>{{ driverInfo.phone_no }}</div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">Profile image</label>
                      <div class="col-md-10">
                        <div class="popup-gallery">
                          <img :src="driverInfo.image" width="120" @click="singleProfileImage = true" />
                          <vue-easy-lightbox :visible="singleProfileImage" :imgs="driverInfo.image" @hide="singleProfileImage = false"></vue-easy-lightbox>
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">Address</label>
                      <div class="col-md-10">
                        <div>{{ driverInfo.address }}</div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">Date of birth</label>
                      <div class="col-md-10">
                        <div>{{ driverInfo.dob }}</div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">NID No</label>
                      <div class="col-md-10">
                        <div>{{ driverInfo.nid }}</div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">Driving licence type</label>
                      <div class="col-md-10">
                        <div>{{ defaultVehicleTypes[driverInfo.drivingLicenceType] || '' }}</div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">Driving licence no</label>
                      <div class="col-md-10">
                        <div>{{ driverInfo.drivingLicence }}</div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">Licence expire</label>
                      <div class="col-md-10">
                        <div>{{ driverInfo.drivingLicenceExpiry }}</div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">Licence image</label>
                      <div class="col-md-10">
                        <div class="popup-gallery">
                          <img :src="driverInfo.drivingLicenceImg" width="120" @click="singleLicenseImage = true" />
                          <vue-easy-lightbox :visible="singleLicenseImage" :imgs="driverInfo.drivingLicenceImg" @hide="singleLicenseImage = false"></vue-easy-lightbox>
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label">Select Status</label>
                      <div class="col-md-10">
                        <select class="form-control" v-model="driverStatus" required>
                          <option value="">-- Select Action --</option>
                          <option value="verified">Verified</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group row" v-if="driverStatus==`rejected`">
                      <label class="col-md-2 col-form-label">Reason</label>
                      <div class="col-md-10">
                        <textarea class="form-control" rows="2" v-model="comment" required></textarea>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary float-right">Submit</button>
                  </form>
                </div>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>
  </div>
</template>

<script>
import {get_driver_info, pending_driver_verification} from "@/api/urls";
import { defaultVehicleTypes } from '@/constants/vehicleTypes';

export default {
  name: "processPendingDrivers",
  middleware:'authenticate',
  head() {
    return {
      title: `${process.env.APP_NAME} | ${this.title}`,
    };
  },
  data(){
    return{
      title: "Pending Driver request processing",
      items: [{
        text: 'Admin',
        href: '/',
      },
        {
          text: 'Pending drivers',
          href: '/drivers/pending-drivers',
        }
      ],
      driverInfo : {
        name: "",
        phone_no: "",
        address: "",
        dob: "",
        nid: "",
        image: "",
        drivingLicence: "",
        drivingLicenceImg: "",
        drivingLicenceType: 1,
        drivingLicenceExpiry: ""
      },
      reference: [
        {
          "ref":"Reference 1",
          "name":"",
          "relation":"",
          "contact":"",
          "address":""
        },
        {
          "ref":"Reference 2",
          "name":"",
          "relation":"",
          "contact":"",
          "address":""
        }

      ],
      default_contact_number: '',
      driverStatus:'',
      comment:'',
      visible: false,
      singleProfileImage: false,
      singleLicenseImage: false,
      defaultVehicleTypes: defaultVehicleTypes
    }
  },

  methods:{
    getDriverInfo(){
      let self = this;
      const token = this.$cookies.get('accessToken');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      }

      this.$axios.$get(get_driver_info+this.$route.params.id, config).then((res) => {
        if (res.error === true){
          self.$router.push('/drivers/pending-drivers');
          self.$toasted.success('Invalid driver ID',{ duration:5000, position: 'top-center' })
        }
        else {
          // console.log(res.data);
          this.driverInfo=res.data.drivers;
          this.default_contact_number=res.data.default_contact_number;
        }
      }).catch((error)=>{
        console.log(error)
      });
    },

    submitVerification(){
      let self = this;
      const token = this.$cookies.get('accessToken');
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      };
      let payload = {
        "driverStatus":this.driverStatus,
        "comment" : this.comment,
        "driverId" : this.$route.params.id,
        // "refType" : ""
      }

      this.$axios.$put(pending_driver_verification+self.$route.params.id, payload, config).then((res) => {
        if (res.error === true){
          self.$toasted.error(res.msg,{ duration:5000, position: 'top-center' })
        }
        else {
          self.$router.push('/drivers/pending-drivers');
          self.$toasted.success('Pending Driver processed successfully',{ duration:5000, position: 'top-center' })
        }
      }).catch((error)=>{
        self.$toasted.error('Something went wrong, please try again letter',{ duration:5000, position: 'top-center' })
      });
    }
  },

  mounted() {
    this.getDriverInfo();
  }

}
</script>

<style scoped>

</style>
