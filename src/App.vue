<template>
  <div id="app">
    <router-link to="/login">
      <button class="login__button">login</button>
    </router-link>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: Montserrat;
    src: url("./assets/fonts/Montserrat-Regular.ttf");
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    font-weight: 400;
  }

  body {
    margin: 0;
    padding: 15px;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background: url("./assets/img/background.svg") no-repeat;
    background-size: cover;
  }

  .login__button {
    max-width: 109px;
    width: 100%;
    height: 50px;
    border: 1px solid #acacac;
    background-color: #ffffff;
    display: block;
    margin-left: auto;

    color: #acacac;
    font-size: 1.6rem;
    text-transform: uppercase;
    border-radius: 3px;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background: #0094bb;
      color: #ffffff;
      transition: background .1s;
    }
  }

  a {
    text-decoration: none;
  }

  p {
    margin: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
