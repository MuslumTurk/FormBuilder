<template>
    <div>
        <div class="container-fluid">  
            <div class="row">
                <div class="col-sm-3" v-show="mode =='choose'">
                    <div class="card">
                        <div class="card-header">
                          <strong>Catalog List</strong>
                          <div class="btn-group pull-right" role="group">
                            <button type="button" style="margin-left:20px;" class="btn btn-danger" v-on:click="show_dragable_modal = true">Create New Form</button>
                          </div>
                        </div>
                        <div class="card-block">
                          <div id="people">
                            <ul class="list">
                              <li v-for="(catalog, index) in datas" v-on:click="catalog_select(catalog.name)">
                                <h5>{{catalog.caption}}</h5>
                              </li>
                            </ul>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5" v-show="mode =='choose'">
                  <div class="card">
                      <div class="card-header">
                          <strong>Catalog Detail</strong>
                          <div class="btn-group pull-right" role="group">
                            <button type="button" class="btn btn-primary" v-on:click="run()">Build Form</button>
                            
                          </div>
                      </div>
                      <div class="card-block" style="min-height:700px;">
                        <div id="jsoneditor"></div>
                      </div>
                  </div>
                </div>
                <!--/.col-->
                <div class="col-sm-4" v-show="mode =='choose'">
                    <div class="card">
                        <div class="card-header">
                          <strong>Catalog View</strong>
                        </div>
                        <div class="card-block">
                          <div id="people">
                            <catalog-edit-form :form="catalog_json" :data="catalog_data" ref="catalog_view" ></catalog-edit-form>
                            <button type="button" class="btn btn-primary" @click="submit_form()">Form Kontrol</button>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <modal v-show="show_dragable_modal" @close="show_dragable_modal = false" large="true">
        <h3 slot="header">New Form Creator</h3>
        <div slot="body">
          <hello v-on:data="loadView" modal="true"></hello>
        </div>
        <div slot="footer">
          <button type="button" class="btn btn-secondary" @click="show_dragable_modal = false">Close</button>
        </div>
      </modal>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import {default as CatalogEditForm} from '../components/widgets/CatalogEditForm';
import { default as CatalogTable } from '../components/widgets/CatalogTable';
import { default as Hello } from '../components/widgets/Dragable';
import { default as Modal } from '../components/widgets/Modal';

/* global JSONEditor */

export default {
  name: 'Dashboard',
  data () {
    return {
      json_1: require('../filters/json_1').options,
      json_2: require('../filters/json_2').options,
      default_data: require('../filters/default_data').options,
      catalog_json: { 'name': 'laboratory', 'param_order': [] },
      catalog_data: { patient_id: 0 },
      editor: null,
      mode: 'choose',
      datas: [],
      show_dragable_modal: false
    };
  },
  components: {
    'v-select': vSelect,
    CatalogEditForm,
    CatalogTable,
    Hello,
    Modal
  },
  methods: {
    loadView: function (selected) {
      console.log(selected);
      this.datas.push(selected.data);
      this.show_dragable_modal = selected.modal_state;
      this.editor.set(selected.data);
      this.run();
    },
    submit_form () {
      let result = this.$refs.catalog_view.validateBeforeSubmit();
      result.then(function (res) {
        if (res.result) {
          alert('Form Valid');
        } else {
          alert('Please check this form');
        }
      });
    },
    search: function (search, loading) {
      if (search.length > 4) {
        loading(true);
      }
    },
    run: function () {
      this.catalog_json = this.editor.get();
      this.catalog_json.param_order = [];
      for (var p in this.catalog_json.parameters) {
        this.catalog_json.param_order.push(p);
      }
      if (this.editor.validate()) {
        alert('Hata Var');
      } else {
        let data = {};
        data['type'] = 'builder';
        data['name'] = this.editor.get().name;
        data['caption'] = this.editor.get().caption;
        data['data'] = this.editor.getText();
      }
      this.$refs.catalog_view.$forceUpdate();
    },
    catalog_select: function (name) {
      for (let key in this.datas) {
        if (this.datas[key].name === name) {
          this.editor.set(this.datas[key]);
        }
      }
    },
    go_list: function () {
      this.mode = 'choose';
    }
  },
  mounted () {
    this.datas.push(this.default_data);
    this.datas.push(this.json_1);
    this.datas.push(this.json_2);
    var container = document.getElementById('jsoneditor');

    var options = {
      mode: 'code',
      modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
      onError: function (err) {
        alert(err.toString());
      },
      onModeChange: function (newMode, oldMode) {
        console.log('Mode switched from', oldMode, 'to', newMode);
      }
    };

    var json = { };

    var editor = new JSONEditor(container, options, json);
    this.editor = editor;
    this.editor.set(this.default_data);
  }
};
</script>

<style type="text/css">
#jsoneditor {
  height: 600px;
}
.list {
  cursor: pointer;
}
</style>
