export default function createFormData(data) {
    const formData = new FormData();
    const appendFormData = (key, value) => {
        console.log(value)
         if (typeof value === 'object' && !(value instanceof File)) {
            console.log('2')
            formData.append(key,JSON.stringify(value))
        }else if (value instanceof Date) {
            console.log('3')
            formData.append(key, value.toLocaleDateString());
        } else {
            formData.append(key, value);
        }
    };

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            appendFormData(key, data[key]);
        }
    }

    return formData;
}
