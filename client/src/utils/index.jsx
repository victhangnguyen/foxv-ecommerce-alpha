const Utility = {
  convertModelToFormData(val, formData = new FormData, namespace = '') {
    if ((typeof val !== 'undefined') && val !== null) {
      if (val instanceof Date) {
        formData.append(namespace, val.toISOString());
      } else if (val instanceof Array) {
        for (let i = 0; i < val.length; i++) {
          this.convertModelToFormData(val[i], formData, namespace + '[' + i + ']');
        }
      } else if (typeof val === 'object' && !(val instanceof File)) {
        for (let propertyName in val) {
          if (val.hasOwnProperty(propertyName)) {
            this.convertModelToFormData(val[propertyName], formData, namespace ? `${namespace}[${propertyName}]` : propertyName);
          }
        }
      } else if (val instanceof File) {
        formData.append(namespace, val);
      } else {
        formData.append(namespace, val.toString());
      }
    }
    return formData;
  }
}
export default Utility;

