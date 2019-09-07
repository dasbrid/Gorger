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
  import { find } from 'lodash'
  import data from '../data' // I added this
  export default {
    data () {
      return {
        cat: null,
        'pictures': data.pictures

      }
    },
    mounted () {
      // their code // this.cat = find(this.$root.cat, (cat) => cat['.key'] === this.$route.params.id)
      let id = this.$route.params.id
      console.log(id)
      // my code to get the cat from data
      this.cat = find(data.pictures, (cat) => cat['id'] === id)
      console.log(this.cat)
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