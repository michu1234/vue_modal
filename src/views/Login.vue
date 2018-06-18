<template>
  <div class="login">
    <div class="popup">
      <div class="popup__header">
        <img src="../assets/img/user-image.png" alt="User photo">
      </div>
      <form action="popup__form">
        <div class="popup__body">
          <label :class="{'is--wrong': !correct}" for="email">EMAIL ADDRESS
            <input :class="{'is--incorrect': !correct}" @input="validate(emailReg, 2000)" @blur="validate(emailReg, 0)" v-model="email"
              id="email" type="text" placeholder="Enter your email address" autocomplete="off">
            <p v-if="!correct" class="popup__alert">{{pageContent.alert}}</p>
            <transition name="fade">
              <div v-if="emailRequired" class="tooltip">{{pageContent.tooltip}}
                <div class="tooltip__arrow"></div>
              </div>
            </transition>
            <div key="emailHint" @mouseover="emailRequired=true" @mouseout="emailRequired=false" class="label__hint">
              <p>*</p>
            </div>
          </label>
          <label for="password">PASSWORD
            <input @input="validate(passwordReg)" v-model="password" id="password" type="password" placeholder="Enter your password "
              autocomplete="off">
            <transition name="fade">
              <div v-if="passwordRequired" class="tooltip">{{pageContent.tooltip}}
                <div class="tooltip__arrow"></div>
              </div>
            </transition>
            <div key="passwordHint" @mouseover="passwordRequired=true" @mouseout="passwordRequired=false" class="label__hint">
              <p>*</p>
            </div>
          </label>
          <div class="form__wrapper">
            <input v-model="rememberUser" id="remember-user" type="checkbox">
            <label class="popup__checkbox__label" for="remember-user">REMEMBER ME</label>
          </div>
        </div>
        <div class="popup__footer">
          <router-link to="/reset">Forgotten password?</router-link>
          <button @click.prevent="submit" class="button btn--info btn--medium">LOGIN</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        emailRequired: false,
        passwordRequired: false,
        correct: true,
        email: '',
        emailReg: /demo@demo.pl/,
        password: '',
        passwordReg: /demo/,
        validateOnStart: true,
        rememberUser: false,
        pageContent: {
          tooltip: 'required',
          alert: 'Invalid email address',
        }
      }
    },
    updated() {
      // for browsers using autocomplete
      if (this.validateOnStart === true) {
        this.validate(this.emailReg, 0);
        this.validateOnStart = false;
      }
    },
    methods: {
      validate(reg, time) {
        this.correct = true;
        this.emailRequired = false;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          if (this.email.match(reg) || this.email === "") {
            this.correct = true;
          } else {
            this.correct = false;
          }
          if (this.email == "") {
            this.emailRequired = true;
          } else {
            this.emailRequired = false;
          }
          if (this.password == "") {
            this.passwordRequired = true;
          } else {
            this.passwordRequired = false;
          }
        }.bind(this), time);
      },
      submit() {
        if (this.correct && this.emailRequired === false && this.passwordRequired === false) {
          this.$router.push('/admin');
        } else {
          alert("Ups...");
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $hell-dark: #000000;
  $sand-gray: #f9f9f9;
  $cloud-gray: #e5e5e5;
  $dark-gray: #7d7d7d;
  $light-gray: #c2c2c2;
  $ocean-blue: #bb0092;
  $pure-white: #ffffff;
  $rose-red: #d22860;

  .login {
    padding-left: 15px;
    padding-right: 15px;
  }

  .popup {
    max-width: 625px;
    width: 90%;
    height: 486px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.301);

    @media screen and (min-width: 710px) {
      width: 100%;
    }
  }

  .popup__header {
    width: 100%;
    min-height: 89px;
    background-color: $ocean-blue;
    position: relative;

    img {
      max-width: 120px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 48px;
    }
  }

  .form__wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .button {
    width: 100%;
    height: 50px;
    font-size: 1.6rem;
    text-transform: uppercase;
    border-radius: 3px;
    font-weight: 700;
    cursor: pointer;
    order: 1;

    @media screen and (min-width: 500px) {
      order: 2;
    }


    &:hover {
      background: $ocean-blue;
      color: $pure-white;
      transition: background .1s;
    }
  }

  .btn--info {
    border: 1px solid #acacac;
    background-color: $pure-white;
    color: #acacac;
  }

  .btn--medium {
    max-width: 109px;
  }

  .popup__body {
    width: 100%;
    min-height: 300px;
    padding: 32px 15px 6px 15px;
    background-color: $sand-gray;
    display: flex;
    flex-direction: column;
    align-items: center;

    input[type=text],
    input[type=password] {
      max-width: 535px;
      width: 100%;
      height: 48px;
      box-shadow: inset 0 0 6px rgba(2, 2, 2, 0.5);
      border: 1px solid #acacac;
      background-color: $pure-white;
      padding-left: 17px;
      font-size: 1.6rem;
      margin-bottom: 28px;
      margin-top: 8px;
      font-family: Montserrat;
      border-radius: 4px;
      z-index: 4;
    }

    @media screen and (min-width: 500px) {
      padding: 32px 45px 6px 45px;
    }

    input[type=checkbox] {
      position: absolute;
      left: -10000px;
      visibility: hidden;
    }

    label {
      width: 100%;
      align-self: flex-start;
      color: $dark-gray;
      font-size: 1.6rem;
      text-transform: uppercase;
      font-weight: 700;
      position: relative;

      .label__hint {
        position: absolute;
        width: 0;
        height: 0;
        right: -15px;
        top: 25px;
        border-left: 26px solid transparent;
        border-right: 26px solid transparent;
        border-bottom: 26px solid $ocean-blue;
        transform: rotate(45deg);
        cursor: pointer;
        z-index: 2;

        p {
          font-size: 2.4rem;
          color: $pure-white;
          margin: 0;
          position: absolute;
          top: 4px;
          right: -4px;
        }
      }
    }
  }

  .popup__checkbox__label {
    background: url("../assets/img/shape.png") no-repeat left bottom;
    background-size: contain;
    min-height: 21px;
    padding-left: 29px;
  }

  input[type=checkbox]:checked+.popup__checkbox__label {
    background: url("../assets/img/mark.png") no-repeat left bottom,
    url("../assets/img/shape.png") no-repeat left bottom;
    background-size: contain;
  }

  .popup__footer {
    width: 100%;
    min-height: 98px;
    background-color: $cloud-gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding-right: 46px;

    a {
      color: #0094bb;
      font-size: 1.6rem;
      font-weight: 700;
      padding-top: 5px;
      order: 2;

      @media screen and (min-width: 500px) {
        order: 1;
        padding-right: 14px;
      }

      &:hover {
        text-decoration: underline;
      }
    }

    @media screen and (min-width: 500px) {
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .tooltip {
    right: -30px;
    top: -15px;
    max-width: 85px;
    width: 100%;
    height: 30px;
    position: absolute;
    background: $ocean-blue;
    border-radius: 6px;
    font-size: 1.4rem;
    text-transform: lowercase;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $pure-white;

    &::before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      left: 50%;
      transform: translateX(-50%);
      bottom: -7px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid $ocean-blue;
    }
  }

  .is--incorrect {
    border: 2px solid $rose-red !important;
  }

  .popup__alert {
    color: $rose-red;
    font-size: 1.4rem;
    font-weight: 700;
    position: absolute;
    bottom: 0;
    right: 0;
    text-transform: none !important;
  }

  .is--wrong {
    color: $rose-red !important;
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
