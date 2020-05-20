export default function setCategoryDates(tasks) {
    const oneDay = 24 * 60 * 60 * 1000; // часы * минуты * секунды * мс = день

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
                task.hours = task.duration * 8
            }
            task.duration = Math.round(Math.abs((task.start - task.end) / oneDay));
        })
    }
    round(tasks)
}
