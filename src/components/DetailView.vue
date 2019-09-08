<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col">
      <div class="picture">
        <img :src="cat.url" />
      </div>
      <div class="info">
        <span>{{ cat.info }}</span>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
      <div class="comment">
        <span>{{ cat.comment }}</span>
      </div>
      <div class="actions">
        <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to="/post">
          ANSWER
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  //import { find } from 'lodash'
  import {db} from '../firebase';
 
//  import data from '../data' // I added this
  export default {
    data () {
      return {
        url: null,
        comment: null,
        info: null,
        cat: null
      }
    },
    mounted () {
      let id = this.$route.params.id
      console.log(id)
      // my code to get the cat from data
      // this.cat = find(data.pictures, (cat) => cat['id'] === id)
      // get cat from the DB
      var cat
      var docRef = db.collection("cats").doc(id)
      docRef.get()
      .then((doc) => { // we must use an anonymous fn so that "this" refers to the global this
        if (doc.exists) {
            cat = {id: id, comment: doc.data().comment, url: doc.data().url, info: doc.data().info }
            this.url = cat.url
            this.comment = cat.comment
            this.info = cat.info
            this.cat = cat
            console.log('cat ' + this.cat)

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        })
      .catch(function(error) {
            console.log("Error getting document:", error);
      });
    }
  }
</script>
<style scoped>
  .picture > img {
    color: #fff;
    width:100%;
  }
  .info {
    text-align: right;
    padding: 5px;
    color: #555;
    font-size: 10px;
  }
  .comment {
    padding: 10px;
    color: #555;
  }
  .actions {
    text-align: center;
  }
</style>