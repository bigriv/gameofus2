<template>
  <div class="c-game">
    <div class="c-game__window">
      <slot name="window" />
    </div>
    <div class="c-game__description">
      <slot name="description" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.c-game {
  &__window {
    :deep(*) {
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
    width: 350px;
    height: 350px;
  }
  .c-game__description {
    width: 350px;
  }
}
@media screen and (max-width: 600px) and (min-width: 350px) {
  .c-game__window {
    width: 100%;
    aspect-ratio: 1;
  }
  .c-game__description {
    width: 100%;
  }
}
@media screen and (min-width: 600px) {
  .c-game__window {
    width: 600px;
    height: 600px;
  }
  .c-game__description {
    width: 600px;
  }
}
</style>
