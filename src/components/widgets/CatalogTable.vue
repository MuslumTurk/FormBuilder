<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

var templateRenderFns = [];

export default {
  name: 'CatalogTable',
  render (h) {
    return h('div', [
      (this.template ? this.template() : '')
    ]);
  },
  staticRenderFns: templateRenderFns,
  mounted () {
    var compiled_template = Vue.compile(this.build_table(this.form, this.lang));
    this.template = compiled_template.render;

    templateRenderFns.length = 0;
    for (var i in compiled_template.staticRenderFns) {
      templateRenderFns.push(compiled_template.staticRenderFns[i]);
    }
  },
  beforeUpdate () {
  },
  computed: mapGetters({
    lang: 'lang'
  }),
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    },
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return { template: null, radio_labels: {} };
  },
  methods: {
    build_table: function (form, lang = 'tr') {
      var html = '';
      for (var i = 0; i < form.param_order.length; i++) {
        let key = form.param_order[i];
        var element = form.parameters[key];
        var types = element.type.split('|');
        var caption = (element.translation && element.translation[lang]) ? element.translation[lang] : element.caption;
        var element_html = '';
        var value_key = '';
        if (types.indexOf('select') !== -1) {
          value_key = '{{data.' + key + '_label}}';
          // value_key = '{{data.' + key + ' | checkKey("' + key + '")}}';
        } else if (types.indexOf('radio') !== -1) {
          this.radio_labels[key] = [];
          for (let j = 0; j < element.options.length; j++) {
            this.radio_labels[key][element.options[j].id] = (element.options[j].translation && element.options[j].translation[lang]) ? element.options[j].translation[lang] : element.options[j].caption;
          }
          value_key += '{{radio_labels["' + key + '"][data.' + key + ']}}';
        } else if (types.indexOf('checkbox') !== -1) {
          this.radio_labels[key] = [];
          for (let j = 0; j < element.options.length; j++) {
            this.radio_labels[key][element.options[j].id] = (element.options[j].translation && element.options[j].translation[lang]) ? element.options[j].translation[lang] : element.options[j].caption;
          }
          value_key += '<span v-for="d in data.' + key + '">{{radio_labels["' + key + '"][d]}}, </span>';
        } else {
          value_key += '{{data.' + key + '}}';
        }
        element_html += '<tr><td><b v-bind:class="\'active\'">' + caption + '</b></td><td>' + value_key + '</td></tr>';

        html += element_html;
      }
      console.log('Started to render table');
      return '<table class="table"><tbody>' + html + '</tbody></table>';
    }
  },
  watch: {
    lang: function (nlang) {
      var compiled_template = Vue.compile(this.build_table(this.form, this.lang));
      this.template = compiled_template.render;

      templateRenderFns.length = 0;
      for (var i in compiled_template.staticRenderFns) {
        templateRenderFns.push(compiled_template.staticRenderFns[i]);
      }
      this.$forceUpdate();
    }
  },
  filters: {
    checkKey: function (a, key) {
      if (a && typeof (a) === 'object') {
        return '{{data.' + key + '.caption}}';
      } else {
        return '{{data.' + key + '_label}}';
      }
    }
  }
};
</script>
