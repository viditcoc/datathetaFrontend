
import { format, parse } from 'date-fns';

 const formatDate = (dateString, style = 'short') => {
  if (!dateString) return 'Invalid date';

  try {
    
    const date = parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
    if (isNaN(date)) return 'Invalid date';

    
    switch (style) {
      case 'short': 
        return format(date, 'M/d/yyyy');
      case 'long': 
        return format(date, 'dd-MMM-yyyy');
      default:
        return format(date, 'M/d/yyyy'); 
    }
  } catch {
    return 'Invalid date';
  }
};

  export default formatDate