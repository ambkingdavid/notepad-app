import { formatDistanceToNow } from 'date-fns';


export const formatDate = (obj) => {
    if (obj && obj.updatedAt) {
      const parsedDate = new Date(obj.updatedAt);
      // Check if the parsed date is valid
      if (!isNaN(parsedDate.getTime())) {
        const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
        obj.time = timeAgo;
      } else {
        console.error(`Invalid updatedAt value: ${obj.updatedAt}`);
      }
    }
    return obj;
};