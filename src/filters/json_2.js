var json_2 = {
  'name': 'data2',
  'caption': 'V-Select Sample Data',
  'param_order': ['form_date', 'option'],
  'parameters': {
    'form_date': {
      'type': 'date',
      'validation': 'required',
      'caption': 'Date',
      'default': 'now'
    },
    'option': {
      'type': 'radio',
      'validation': 'required',
      'caption': 'Options',
      'translation': {
        'tr': 'Seçenekler'
      },
      'options': [{
        'caption': 'Option 1',
        'id': '0'
      }, {
        'caption': 'Option 2',
        'id': '1'
      }, {
        'caption': 'Option 3',
        'id': '2'
      }]
    }
  }
};
export { json_2 as options };
