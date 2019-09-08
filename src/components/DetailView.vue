<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col">
      <div class="picture">
        <img :src="dog.url" />
      </div>
      <div class="info">
        <span>{{ dog.info }}</span>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
      <div class="comment">
        <span>{{ dog.comment }}</span>
      </div>
      <div class="actions">
        <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to="/post">
          ANSWER
        </router-link>
                  <a @click.prevent="deleteItem" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Delete
          </a>
      </div>
    </div>
  </div>
</template>
<script>
  import {db} from '../firebase';
 
  export default {
    data () {
      return {
        dog: null
      }
    },
    methods: {
      deleteItem() {
        let id = this.$route.params.id
        db.collection("cats").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.$router.push({name: 'home'})
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
      }
    },
    mounted () {
      let id = this.$route.params.id
      console.log(id)
      // get dog from the DB
      var dog
      var docRef = db.collection("cats").doc(id)
      docRef.get()
      .then((doc) => { // we must use an anonymous fn so that "this" refers to the global this
        if (doc.exists) {
            dog = {id: id, comment: doc.data().comment, url: doc.data().url, info: doc.data().info }
            this.dog = dog

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