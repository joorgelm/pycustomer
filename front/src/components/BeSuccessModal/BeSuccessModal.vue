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
      <be-icon icon="check-circle" />
      <strong class="be-color-purple"> {{ message }} </strong>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'BeSuccessModal',
  props: {
    message: { type: String, default: ' Atendente adicionado com sucesso!!' }
  }
}
</script>
