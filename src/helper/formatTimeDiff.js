async function formatTimeDifference(date) {
    const timeZone = "Asia/Manila";
    const now = new Date().toLocaleString("en-US", { timeZone });
    const timestamp = new Date(date);
    const nowTimestamp = new Date(now).getTime();
    const timestampTimestamp = new Date(timestamp).getTime();
  
    const diffInSeconds = Math.floor((nowTimestamp - timestampTimestamp) / 1000);
  
    if (diffInSeconds < 10) {
      return "just now";
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  }

  export default formatTimeDifference