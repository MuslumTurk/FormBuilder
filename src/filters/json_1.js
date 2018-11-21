var json_1 = {
  'name': 'data1',
  'caption': 'Input And Date Sample Data',
  'param_order': ['form_hidden', 'form_date', 'note'],
  'parameters': {
    'form_hidden': {
      'type': 'hidden|text',
      'caption': 'Hidden Field'
    },
    'form_date': {
      'type': 'date',
      'validation': 'required',
      'caption': 'Date',
      'default': 'now',
      'order': 1
    },
    'note': {
      'type': 'textarea',
      'validation': 'required',
      'caption': 'Note'
    }
  }
};
export { json_1 as options };
