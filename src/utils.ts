export function parseTime(time: string): number {
    let hours = 0;
    let minutes = 0;
    
    if (time.includes(':')) {
      [hours, minutes] = time.split(':').map(Number);
    } else if (time.includes('h')) {
      [hours, minutes] = time.split('h').map(Number);
    }
  
    return hours + minutes/60;
};