module.exports. validate =(data, fields = [])=> {
    const requiredFields = fields;
  
    for (const field of requiredFields) {
      if (
        data[field] === undefined ||
        data[field] === null ||
        data[field] === ''
      ) {
        return {
          isValid: false,
          message: `${field} is a required field and must be provided.`,
        };
      } else if (Array.isArray(data[field]) && data[field].length === 0) {
        return {
          isValid: false,
          message: `${field} must contain at least one item.`,
        };
      }
      else if(typeof data[field] === "object" && Object.keys(data[field]).length === 0){
        return {
          isValid: false,
          message: `${field} is an empty object.`,
        };
      }
    }
  
    return { isValid: true, message: 'All fields are valid' };
  }
  