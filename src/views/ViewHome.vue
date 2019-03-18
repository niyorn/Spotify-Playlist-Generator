<template>
  <section class="container-home">
    <aside class="menu">
      <section class="container-user">
        <h1 class="user-name">Hi, {{user.name}}</h1>
      </section>
      <section class="link-container">
        <router-link :to="{name:'Tracks'}" class="button">Top tracks</router-link>
        <router-link :to="{name:'Artists'}" class="button">Top Artists</router-link>
      </section>
    </aside>
    <router-view class="content"></router-view>
  </section>
</template>

<script>
  import TopTracks from '@/components/TopTracks'


  export default {
    components: {
      TopTracks
    },


    computed: {
      user() {
        return this.$store.getters.user
      }
    }
  }

</script>

<style scoped lang="scss">
  .container-home {
    display: grid;
    grid-template-areas: "menu content";
    grid-template-columns: 14rem 1fr;
  }

  .menu {
    grid-area: menu;
    background-color: #060625;
    height: 100vh;

    .container-user {
      margin-top: 1.4rem;

      .user-name {
        color: white;
        font-size: 2rem;
      }
    }

    .link-container {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;

      .button {
        padding: 2rem 0;
        position: relative;
        font-weight: bold;
        text-decoration: none;
        color: white;
        transition: background-color 0.7s;

        &:hover {
          background-color: rgba(255, 255, 255, 0.178);
        }

        &.router-link-active {
          color: #88fff5;
        }
        &.router-link-active:after {
          content: "";
          height: 100%;
          width: 0.2rem;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          background-color: #88fff5;
          animation: active 0.4s ease-out;
        }

        @keyframes active {
          from {
            transform: scale(0);
          }

          to {
            transform: scale(1);
          }
        }
      }
    }
  }

  .content {
    grid-area: content;
    height: 100vh;
    overflow: auto;
  }
</style>

