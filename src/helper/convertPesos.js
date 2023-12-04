export async function convertToPesos(number) {
    return isNaN(number) ? "Invalid Number" : new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(number);
  }