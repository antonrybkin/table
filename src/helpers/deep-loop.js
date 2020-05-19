export default function deepLoop(data) {
    let outputArray = [];
    function loopChildreen(children) {
        children.forEach(element => {
            outputArray.push(element);
            if(element.children && element.children.length > 0) {
                loopChildreen(element.children, outputArray);
            }
        });
    }
    loopChildreen(data);
    return outputArray;
}