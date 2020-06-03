export default function setCategoryDates(tasks) {
    const oneDay = 24 * 60 * 60 * 1000; // часы * минуты * секунды * мс = день
    function dateDiffInDays(a, b) {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / oneDay) + 1;
    }

    function round(items) {
        items.forEach(task => {
            if(task.children && task.children.length) {
                round(task.children);
                const allStartDates = task.children.map(item => new Date(item.start));
                const allEndDates = task.children.map(item => new Date(item.end));
                const subHours = task.children.map(task => task.hours);
                task.start = Math.min(...allStartDates);
                task.end = Math.max(...allEndDates);
                task.hours = subHours.reduce((a, b) => a + b, 0)
            } else if(task.children.length < 1) {
                task.hours = parseInt(task.hours) || (task.duration * 8);
            }
            task.duration = dateDiffInDays(new Date(task.start), new Date(task.end));
            task.dropped = task.dropped || false;
        })
    }
    round(tasks)
}
