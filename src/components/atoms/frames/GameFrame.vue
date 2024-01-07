<template>
  <div class="c-game">
    <div class="u-d_flex--v_center u-d_flex--h_between">
      <div class="c-game__left_conroller">
        <slot name="left_controller" />
      </div>
      <div class="c-game__window">
        <slot name="window" />
      </div>
      <div class="c-game__right_conroller">
        <slot name="right_controller" />
      </div>
    </div>
    <div class="c-game__description">
      <slot name="description" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.c-game {
  &__window {
    &:deep(*) {
      touch-action: manipulation;
      user-select: none;
    }
    position: relative;
    border-style: outset;
    border-color: black;
    margin: auto;
    border-width: 6px;
  }
  &__description {
    padding-bottom: 20px;
    margin: auto;
    text-align: left;
    h2 {
      margin-top: 1em;
    }
    p {
      font-size: 14px;
      line-height: 1.1;
    }
    table {
      font-size: 14px;
      line-height: 1.1;
      th,
      td {
        border: 1px black solid;
        padding: 4px;
      }
    }
    a {
      text-decoration: underline;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 350px) {
  .c-game__window {
    min-width: 350px;
    width: 350px;
    aspect-ratio: 1;
  }
  .c-game__description {
    width: 350px;
  }
}
@media screen and (max-width: 600px) and (min-width: 350px) {
  .c-game__window {
    min-width: 350px;
    width: 100%;
    max-height: min(600px, 90vw);
    max-width: min(100%, 90vh);
    aspect-ratio: 1;
  }
  .c-game__description {
    width: 100%;
  }
}
@media screen and (min-width: 600px) {
  .c-game__window {
    min-width: 350px;
    width: 600px;
    max-width: min(600px, 90vh);
    max-height: 600px;
    aspect-ratio: 1;
  }
  .c-game__description {
    width: 600px;
  }
}
</style>
