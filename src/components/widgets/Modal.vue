<template>
    <transition name="modal">
        <div class="modal fade show modal-mask" style="display:block" id="myModal" tabindex="-1" role="dialog">
            <div v-bind:class="[large ? 'modal-dialog modal-lg' : '', 'modal-dialog']" role="document" v-bind:style="width ? {maxWidth: width + 'px'} : {}">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <slot name="header">
                              default header
                            </slot>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            <slot name="body">
                                default body
                            </slot>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button type="button" class="btn btn-primary">Değişiklikleri kaydet</button>
                            <button type="button" class="btn btn-secondary" @click="$emit('close')">Kapat</button>
                        </slot>

                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    large: {
      required: false,
      default: false
    },
    width: {
      required: false,
      type: Number
    }
  }
};
</script>

<style type="text/css">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-body{
    height: 500px;
    overflow-y: auto;
}
</style>
