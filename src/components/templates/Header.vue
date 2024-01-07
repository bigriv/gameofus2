<template>
  <header>
    <router-link to="/" class="c-header__logo">GOU</router-link>
    <nav>
      <ul>
        <li><router-link to="/">HOME</router-link></li>
        <li><router-link to="/about">ABOUT</router-link></li>
        <li><router-link to="/contact">CONTACT</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
header {
  width: 100%;
  padding: 0 20px;
  ul {
    display: flex;
    list-style: none;
    height: 100%;
    li {
      width: 140px;
      height: 100%;
      text-align: center;
      a {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        padding: 8px 12px;
      }
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
  .c-header__logo {
    font-family: "Chakra Petch";
    font-size: 40px;
    font-weight: bold;
    padding: 0 8px;
    color: white;
    text-shadow: 0 2px 0 black, 2px 0px 0 black, -2px 0px 0 black,
      0 -2px 0 black, 6px 0px 0px black;
    line-height: 1;
    letter-spacing: 3px;
  }
}
@media screen and (max-width: 700px) {
  nav {
    margin-top: 10px;
    ul {
      li {
        width: 100px;
        a {
          font-size: 16px;
          &::before {
            content: "";
            border-bottom: 1px solid black;
            width: 90%;
            height: 100%;
            position: absolute;
            bottom: 0;
            left: 5%;
            transition: width 0.3s ease;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 700px) {
  header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    ul {
      li {
        a {
          font-size: 20px;
          transition: text-shadow 0.3s ease-in-out;
          &:hover {
            text-shadow: 0 0 20px black;
            &::before {
              width: 120px;
            }
          }
          &::before {
            content: "";
            border-bottom: 1px solid black;
            width: 0;
            height: 100%;
            position: absolute;
            bottom: 0;
            left: 8px;
            transition: width 0.3s ease;
          }
        }
      }
    }
  }
}
</style>
