<template>
  <div>
    <h1>Contact</h1>

    <section class="u-margin_top--20">
      <dl>
        <dt>X(旧Twitter)</dt>
        <dd>
          <a href="https://twitter.com/eng_yoshiwo13"
            >https://twitter.com/eng_yoshiwo13</a
          >
        </dd>
      </dl>
      <dl>
        <dt>Twitch</dt>
        <dd>
          <a href="https://www.twitch.tv/yoshiwo13"
            >https://www.twitch.tv/yoshiwo13</a
          >
        </dd>
      </dl>
      <dl>
        <dt>mail</dt>
        <dd>pandemiccer@gmail.com</dd>
      </dl>
      <dl>
        <dt>Google Form</dt>
        <dd>
          <GameContactForm />
        </dd>
      </dl>
    </section>
  </div>
</template>

<script setup lang="ts">
import GameContactForm from "@/components/atoms/interfaces/GameContactForm.vue";
</script>

<style scoped lang="scss">
dl + dl {
  margin-top: 20px;
}
</style>
