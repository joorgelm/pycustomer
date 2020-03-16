<template>
  <div class="be-footer-paginacao">
    <div class="be-paginacao">
      <div class="be-paginacao-rageview">
        <p>Ver</p>
        <p>{{ itens }} itens</p>
      </div>
      <div class="be-paginacao-double-left">
        <a
          href="#"
          class="be-paginacao-link"
        >
          <be-icon icon="chevron-double-left" />
        </a>
      </div>
      <div class="be-paginacao-arrow-left">
        <a
          href="#"
          class="be-paginacao-link"
        >
          <be-icon icon="chevron-left" />
        </a>
      </div>
      <ul class="be-paginacao-group">
        <li
          v-for="item in 5"
          :key="item"
          class="be-paginacao-items"
        >
          <a
            href="#"
            class="be-paginacao-link"
            :class="(item == 1) ? 'active':''"
          >{{ item }}</a>
        </li>
      </ul>
      <div class="be-paginacao-arrow-right">
        <a
          href="#"
          class="be-paginacao-link"
        >
          <be-icon icon="chevron-right" />
        </a>
      </div>
      <div class="be-paginacao-double-right">
        <a
          href="#"
          class="be-paginacao-link"
        >
          <be-icon icon="chevron-double-right" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itens: 3
    }
  }
}
</script>

<style lang="scss" scoped>
.be-footer-paginacao {
  position: fixed;
  overflow: hidden;
  right: 0;
  bottom: 0;
  z-index: $be-level-5;
  width: $be-width-full;
  height: 58px;
  box-shadow: 0 2px 9px rgba(130, 130, 130, 0);
  background: $be-color-white;
  @include d-flex(row, nowrap);
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 6px 15px rgba(130, 130, 130, 0.4);
  padding: $be-p-xs $be-p-s;
  .be-paginacao {
    height: 100%;
    @include d-flex(row, nowrap);
    justify-content: space-around;
    align-items: center;
    margin-right: $be-m-xl;
    a,
    i {
      font-size: $be-font-size-s;
    }
  }

  .be-paginacao-arrow-left {
    display: block;
    margin-right: $be-m-xxs;
    .be-paginacao-link {
      padding: 4px 6px;
      font-weight: bold;
      border-radius: 4px;
      &:hover {
        background: $be-color-gray-500;
        color: $be-color-white;
        box-shadow: 0 6px 15px rgba(130, 130, 130, 0.4);
      }
    }
  }

  .be-paginacao-arrow-right {
    display: block;
    margin-left: 4px;
    .be-paginacao-link {
      padding: 4px 6px;
      font-weight: bold;
      border-radius: 4px;
      box-shadow: 0 2px 9px rgba(130, 130, 130, 0);
      transition: all $timeAnimated ease-in-out;
      &:hover {
        background: $be-color-gray-500;
        color: $be-color-white;
        box-shadow: 0 6px 15px rgba(130, 130, 130, 0.4);
      }
    }
  }

  .be-paginacao-double-left {
    display: block;
    margin-right: 6px;
    .be-paginacao-link {
      padding: 4px 6px;
      font-weight: bold;
      border-radius: 4px;
      box-shadow: 0 2px 9px rgba(130, 130, 130, 0);
      transition: all $timeAnimated ease-in-out;
      &:hover {
        background: $be-color-gray-500;
        color: $be-color-white;
        box-shadow: 0 6px 15px rgba(130, 130, 130, 0.4);
      }
    }
  }

  .be-paginacao-double-right {
    display: block;
    margin-left: 8px;
    .be-paginacao-link {
      padding: 4px 6px;
      font-weight: bold;
      border-radius: 4px;
      box-shadow: 0 2px 9px rgba(130, 130, 130, 0);
      transition: all $timeAnimated ease-in-out;
      &:hover {
        background: $be-color-gray-500;
        color: $be-color-white;
        box-shadow: 0 6px 15px rgba(130, 130, 130, 0.4);
      }
    }
  }

  .be-paginacao-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .be-paginacao-items {
      margin-right: 8px;
      &:last-child {
        margin-right: 0;
      }
      .be-paginacao-link {
        padding: 4px 10px;
        font-weight: bold;
        border-radius: 4px;
        &.active {
          background: $be-color-purple-700;
          color: $be-color-white;
          box-shadow: 0 2px 9px rgba(103, 17, 143, 0);
          transition: all $timeAnimated ease-in-out;
          &:hover {
            background: lighten($be-color-primary, 15%);
            color: $be-color-white;
            box-shadow: 0 6px 15px rgba(103, 17, 143, 0.4);
          }
        }
        box-shadow: 0 2px 9px rgba(130, 130, 130, 0);
        transition: all $timeAnimated ease-in-out;
        &:hover {
          background: $be-color-gray-500;
          color: $be-color-white;
          box-shadow: 0 6px 15px rgba(130, 130, 130, 0.4);
        }
      }
    }
  }
}
.be-paginacao-rageview {
  @include d-flex(row, nowrap);
}
</style>
