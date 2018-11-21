<template>
  <div class="row">

    <div  class="col-sm-6">
      <div class="card">
          <div class="card-header">
            <strong>Catalog List</strong>
          </div>
          <div class="card-block">
            <div id="people">
              <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false"> 
                <transition-group type="transition" :name="'flip-list'">
                  <li class="list-group-item" v-for="element in list" :key="element.elements.caption"> 
                    {{element.elements.caption}}
                    <!--
                    <label class="list-group-item" v-if="element.elements.caption == 'Hidden'">Hidden</label>
                    <input class="list-group-item" :placeholder="element.elements.caption" v-if="element.elements.caption == 'EditText'">
                    <textarea class="list-group-item" :placeholder="element.elements.caption" v-if="element.elements.caption == 'TextArea'"></textarea>
                    <label class="list-group-item" v-if="element.elements.caption == 'Radio Button'"><input type="radio">Radio Button</label>
                    <datepicker class="list-group-item" placeholder="date" v-if="element.elements.caption == 'Date'"></datepicker>
                    <datepicker class="list-group-item" placeholder="datetime" :config="{ enableTime: true }" v-if="element.elements.caption == 'DateTime'"></datepicker> -->
                  </li> 
                </transition-group>
              </draggable>
            </div>
          </div>
      </div>
    </div>

    <div  class="col-sm-6">
      <div class="card">
          <div class="card-header">
            <strong>Drag Here</strong>
            <div class="btn-group pull-right" role="group">
                <button type="button" class="btn btn-primary" @click="handleSendMessage">Build</button>
            </div>
          </div>
          <div class="card-block">
            <div id="people">
              <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove"> 
                <transition-group name="no" class="list-group" tag="ul">
                  <li class="list-group-item" v-for="(element, index) in list2" :key="index"> 
                    {{element.elements.caption}}
                  </li> 
                </transition-group>
            </draggable>
            </div>
          </div>
      </div>
      
    </div>

    <div class="list-group col-sm-3" style="visibility: hidden; z-index: -1;">
      <pre>{{listString}}</pre>
    </div>
     <div  class="list-group col-sm-3" style="visibility: hidden; z-index: -1;">
      <pre>{{list2String}}</pre>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
// {caption: 'Button', type: 'button'} {caption: 'Radio Button', type: 'radio'}
const elements = [ {caption: 'Hidden', type: 'hidden'}, {caption: 'EditText', type: 'text'}, {caption: 'TextArea', type: 'textarea'}, {caption: 'Date', type: 'date'}, {caption: 'DateTime', type: 'datetime'}, {caption: 'Radio Button', type: 'radio', options: [{caption: 'Option1', id: 0}, {caption: 'Option1', id: 1}, {caption: 'Option2', id: 2}]} ];

export default {
  name: 'hello',
  components: {
    draggable
  },
  props: {
    modal: {
      required: false,
      default: false
    }
  },
  data () {
    return {
      datas: {},
      list: elements.map((elements) => { return { elements }; }),
      list2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    handleSendMessage: function () {
      this.datas['parameters'] = {};
      this.datas['param_order'] = [];
      this.datas['caption'] = 'Dynamic Data ' + this.list2.length.toString();
      this.datas['name'] = 'dynamic_data_' + this.list2.length.toString();
      for (var i = 0; i < this.list2.length; i++) {
        this.datas.parameters[this.list2[i].elements.type + i] = {'type': this.list2[i].elements.type, 'caption': this.list2[i].elements.caption, 'options': this.list2[i].elements.options};
        this.datas.param_order.push(this.list2[i].elements.type + i);
      }
      this.$emit('data', { data: this.datas, modal_state: false });
    },
    orderList () {
      this.list = this.list.sort((one) => { return one.order; });
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      };
    },
    listString () {
      this.list = elements.map((elements) => { return { elements }; });
      return JSON.stringify(this.list, null, 2);
    },
    list2String () {
      return JSON.stringify(this.list2, null, 2);
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i{
  cursor: pointer;
}
</style>
