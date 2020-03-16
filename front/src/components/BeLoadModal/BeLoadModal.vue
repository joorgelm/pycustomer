<template>
  <b-modal
    id="modal-no-backdrop"
    visible
    centered
    content-class="shadow"
    hide-header
    hide-footer
  >
    <div class="d-flex justify-content-center align-items-center">
      <b-spinner
        class="mr-2 be-color-purple"
        type="grow"
        label="Spinning"
      />
      <strong class="be-color-purple"> {{ message }} </strong>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'BeLoadModal',
  props: {
    message: { type: String, default: 'Carregando...' }
  }
}
</script>
