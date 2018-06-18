<template>
    <div class="reset">
        <div class="popup">
            <div class="popup__header">
                <img src="../assets/img/user-image.png" alt="User photo">
                <h2>{{pageContent.title}}</h2>
            </div>
            <form action="popup__form">
                <div class="popup__body">
                    <p v-html="pageContent.description"></p>
                    <label :class="{'is--wrong': !correct}" for="resetEmail">EMAIL ADDRESS
                        <input :class="{'is--incorrect': !correct}" @input="validate(emailReg, 2000)" @blur="validate(emailReg, 0)" v-model="email"
                            id="resetEmail" type="text" placeholder="Enter your email address" autocomplete="off">
                        <transition name="fade">
                            <div v-if="emailRequired" class="tooltip">{{pageContent.tooltip}}
                                <div class="tooltip__arrow"></div>
                            </div>
                        </transition>
                        <div key="emailhint" @mouseover="emailRequired=true" @mouseout="emailRequired=false" class="label__hint">
                            <p>*</p>
                        </div>
                    </label>
                </div>
                <div class="popup__footer">
                    <button class="button btn--alert btn--small">
                        <router-link to="/login">CANCEL</router-link>
                    </button>
                    <button @click.prevent="submit" class="button btn--large btn--info">RESET PASSWORD</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Reset",
        data() {
            return {
                emailRequired: false,
                correct: true,
                email: '',
                emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                pageContent: {
                    tooltip: 'required',
                    title: 'reset password',
                    description: 'Hey, it happens to everyone. <br> Just let us know what email address you use to login and we\'ll send you an email with instructions.'
                }
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
                if (this.correct && this.email !== "") {
                    alert("password changed!");
                    this.$router.push("/login");
                } else {
                    alert("enter your email address!");
                    this.emailRequired = true;
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

    .reset {
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
    }

    .popup {
        max-width: 625px;
        width: 90%;
        max-height: 486px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        @media screen and (min-width: 500px) {
            justify-content: initial;
                    text-align: initial;
        }

        h2 {
            color: $pure-white;
            font-size: 3.1rem;
            font-weight: 400;
            line-height: 0.77;
            text-transform: uppercase;
            margin: 0;
            

            @media screen and (min-width: 500px) {
                padding-left: 200px;
                padding-right: 15px;
            }
        }

        img {
            max-width: 80px;
            position: absolute;
            top: -110%;
            left: -4%;
            transform: translateY(50%);
            transition: all .3s;
            will-change: auto;

            @media screen and (min-width: 500px) {
                max-width: 120px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                margin-left: 48px;
            }
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

    .btn--alert {
        border: 1px solid #cc0849;
        background-color: $pure-white !important;
        margin-right: 10px;

        a {
            color: #cc0849;
        }
    }

    .btn--large {
        max-width: 175px;
    }

    .btn--small {
        max-width: 109px;
    }


    .popup__body {
        width: 100%;
        min-height: 220px;
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
        }

        @media screen and (min-width: 500px) {
            padding: 32px 45px 6px 45px;
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

        p {
            align-self: flex-start;
            max-width: 370px;
            color: $dark-gray;
            font-size: 1.4rem;
            margin-bottom: 26px;

        }
    }

    .popup__footer {
        width: 100%;
        min-height: 98px;
        background-color: $cloud-gray;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px 0 15px;

        @media screen and (min-width: 500px) {
        padding-right: 46px;
        padding-left: 46px;
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
