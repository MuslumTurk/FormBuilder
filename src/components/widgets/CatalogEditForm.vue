<script>
import VeeValidate from 'vee-validate';
import Cleave from 'vue-cleave';
import 'cleave.js/dist/addons/cleave-phone.cn';
import Datepicker from 'wisdom-vue-datepicker';
import vSelect from 'vue-select';
import Vue from 'vue';
import { mapGetters } from 'vuex';

var templateRenderFns = [];
Vue.use(VeeValidate, {
  classes: true
});

export default {
  name: 'CatalogEditForm',
  render (h) {
    return h('div', [
      (this.template ? this.template() : '')
    ]);
  },
  staticRenderFns: templateRenderFns,
  mounted () {
    this.data.key = this.form.key;
    let compiled_template = Vue.compile(this.build_form(this.form, this.lang));
    this.template = compiled_template.render;

    templateRenderFns.length = 0;
    for (var i in compiled_template.staticRenderFns) {
      templateRenderFns.push(compiled_template.staticRenderFns[i]);
    }
  },
  beforeUpdate () {
    let compiled_template = Vue.compile(this.build_form(this.form, this.lang));
    this.template = compiled_template.render;

    templateRenderFns.length = [];
    for (var i in compiled_template.staticRenderFns) {
      templateRenderFns.push(compiled_template.staticRenderFns[i]);
    }
  },
  computed: mapGetters({
    lang: 'lang'
  }),
  components: {
    VeeValidate,
    Datepicker,
    Cleave,
    vSelect
  },
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    },
    form: {
      type: Object,
      required: true
    },
    catalog_key: String
  },
  data () {
    return { template: null, options: [], functions: [] };
  },
  methods: {
    build_form: function (form, lang = 'tr') {
      var html = '';
      let param_order;
      if (this.params) {
        param_order = this.params;
      } else {
        param_order = form.param_order;
      }
      // Adding type input as hidden
      html += '<input type="hidden" name="type" v-model="data.key" />\n';
      for (var i = 0; i < param_order.length; i++) {
        let key = form.param_order[i];
        var element = form.parameters[key];
        var types = element.type.split('|');
        var caption = (element.translation && element.translation[lang]) ? element.translation[lang] : element.caption;
        var validation = (element.validation) ? ' v-validate="\'' + element.validation + '\'"' : '';
        var vif = (element.if) ? ' v-if="' + element.if + '"' : '';
        var max_size = (element.max_size) ? element.max_size : 999;
        // var is_positive = (element.is_positive) ? element.is_positive : true;
        // var min_size = (element.min_size) ? element.min_size : 0;
        // var numeral_scale: (element.numeral_scale) ? element.numeral_scale : 3;
        var element_template = '<div class="row"' + vif + '><div class="col-sm-12"><div class="form-group"><label for="name"><_caption_></label><_element_></div></div></div>';
        var element_html = '';
        this.data[key] = this.data[key] === undefined ? null : this.data[key];
        if (types.indexOf('hidden') !== -1) {
          element_html += '<input type="hidden" name="' + key + '"' + validation + ' />';
          element_template = '';
        } else if (types.indexOf('integer') !== -1) {
          element_html += '<cleave class="input form-control" placeholder="<_caption_>" name="' + key + '"' + validation + ' :options="{ numeral: true, numeralPositiveOnly: true, numeralIntegerScale: 3, numeralDecimalMark: \'false\', delimiter: \'\', numeralThousandsGroupStyle: \'wan\' }" v-model="data.' + key + '"></cleave>';
          element_html += '<span v-show="errors.has(\'' + key + '\')" style="color: red">{{ errors.first(\'' + key + '\') }}</span>';
        } else if (types.indexOf('float') !== -1) {
          element_html += '<cleave class="input form-control" placeholder="<_caption_>" step="0.1" maxlength="' + max_size + '" name="' + key + '"' + validation + ' :options="{ numeral: true}" v-model="data.' + key + '"></cleave>';
          element_html += '<span v-show="errors.has(\'' + key + '\')" style="color: red">{{ errors.first(\'' + key + '\') }}</span>';
        } else if (types.indexOf('textarea') !== -1) {
          element_html += '<textarea class="textarea form-control" placeholder="<_caption_>" v-model="data.' + key + '" name="' + key + '"' + validation + '></textarea>';
          element_html += '<span v-show="errors.has(\'' + key + '\')" style="color: red">This area is required</span>';
        } else if (types.indexOf('text') !== -1) {
          element_html += '<input class="input form-control" type="text" placeholder="<_caption_>"  v-model="data.' + key + '" name="' + key + '"' + validation + ' />';
          element_html += '<span v-show="errors.has(\'' + key + '\')" style="color: red">This area is required</span>';
        } else if (types.indexOf('datetime') !== -1) {
          element_html += '<datepicker class="form-control" placeholder="<_caption_>" :config="{ enableTime: true }" v-model="data.' + key + '" name="' + key + '"' + validation + '></datepicker>';
          element_html += '<span v-show="errors.has(\'' + key + '\')" style="color: red">This area is required</span>';
        } else if (types.indexOf('date') !== -1) {
          element_html += '<datepicker class="form-control" placeholder="<_caption_>" v-model="data.' + key + '" name="' + key + '"' + validation + '></datepicker>';
          element_html += '<span v-show="errors.has(\'' + key + '\')" style="color: red">This area is required</span>';
        } else if (types.indexOf('select') !== -1) {
          let options_html = this.get_options(element.options, element.is_multiple);
          element_html += '<v-select name="' + key + '" ' + options_html + validation + ' v-model="data.' + key + '" ' + '></v-select>';
          element_html += '<span v-show="errors.has(\'' + key + '\')" style="color: red">This area is required</span>';
        } else if (types.indexOf('checkbox') !== -1) {
          element_html += '<div class="col-md-9" ' + '>';
          element_html += '<span v-show="errors.has(\'' + key + '\')" style="color: red">This area is required</span>';
          for (let j = 0; j < element.options.length; j++) {
            let value_label = (element.options[j].translation && element.options[j].translation[lang]) ? element.options[j].translation[lang] : element.options[j].caption;
            this.data[key] = [];
            element_html += '<div class="checkbox"><label><input type="checkbox" v-model="data.' + key + '" value="' + element.options[j].id + '">' + value_label + '</label></div>';
            element_html += '<span v-show="errors.has(\'' + key + '\')" style="color: red">This area is required</span>';
          }
          element_html += '</div>';
        } else if (types.indexOf('radio') !== -1) {
          element_html += '<div class="col-md-9" ' + '>';
          for (let j = 0; j < element.options.length; j++) {
            let value_label = (element.options[j].translation && element.options[j].translation[lang]) ? element.options[j].translation[lang] : element.options[j].caption;
            element_html += '<div class="checkbox"><label><input type="radio" class="form-check-input" name="' + key + '" v-model="data.' + key + '" value="' + element.options[j].id + '">' + value_label + '</label></div>';
            element_html += '<span v-show="errors.has(\'' + key + '\')" style="color: red">{{ errors.first(\'' + key + '\') }}</span>';
          }
          element_html += '</div>';
        } else if (types.indexOf('custom') !== -1) {
          let props = ' ';
          let options_html = this.get_options(element.options, element.is_multiple);
          this.data[key] = {};

          for (let j in element.props) {
            this.props[key] = element.props[j];
            props += ':' + j + '="props.' + key + '" ';
          }
          element_html += '<' + element.widget + props + ' :data="data.' + key + '" ' + options_html + ' data_key="' + key + '" ' + '></' + element.widget + '>';
        }

        html += element_template.replace(/<_element_>/g, element_html).replace(/<_caption_>/g, caption);
      }
      return '<form>' + html + '</form>';
    },
    validateBeforeSubmit () {
      return this.$validator.validateAll().then((result) => {
        return {'result': result};
      }).catch(() => {
        return {'result': false};
      });
    }
  },
  watch: {
    lang: function (nlang) {
      var a = this.$forceUpdate();
      console.log(a);
    }
  }
};

/*
Vue.component('catalog-table', {
  name: 'CatalogTable',
  components: {
    VeeValidate,
    Datepicker,
    Cleave,
    vSelect
  },
  template: html,
  data () {
    return {
      data: { 'type': 'biopsi', 'KALP_HIZI': '10' }
    };
  }
});
*/
</script>
