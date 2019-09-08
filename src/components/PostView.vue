<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="card-image__picture">
          <img v-if="this.catUrl" :src="this.catUrl"/>
          <p v-if="!this.catUrl">
          loading
          </p>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="username" v-model="description" type="text" class="mdl-textfield__input"/>
          <label for="username" class="mdl-textfield__label">Describe me</label>
        </div>
        <div class="actions">
          <a @click.prevent="postCat" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Post
          </a>
          <a @click.prevent="reload" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Reload
          </a>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios" // for calling 
import {db} from '../firebase';
  export default {
    data () {
      return {
        catUrl: null,
        description: null
      }
    },
    methods: {
        postCat() {
            // https://firebase.google.com/docs/firestore/quickstart
            db.collection('cats').add({comment: this.description,
            created_at: -1 * new Date().getTime(),
            info: 'some info',
            url: this.catUrl
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                this.$router.push({name: 'home'})
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        },
        reload() {
            this.fetchImage()
        },
        fetchImage() {
        try{
            axios.defaults.headers.common['x-api-key'] = "0a096f27-2762-424b-89b2-f11957d826fd" // Replace this with your API Key
            axios.get('https://api.thedogapi.com/v1/images/search', { params: { limit:1, size:"full" } } ) // Ask for 1 Image, at full resolution
            .then(response => {
              // eslint-disable-next-line
              console.log(response);
              // this.image = response.data[0]
              this.catUrl = response.data[0].url
            })
            .catch(error=> {
              // eslint-disable-next-line
              console.log(error);
            })
            // eslint-disable-next-line
            console.log("-- Image from TheCatAPI.com")
          }catch(err){
        }

    }
    },
    mounted () {
        this.reload()
    }
  }
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }
</style>