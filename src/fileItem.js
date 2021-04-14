function FileItem(fPath, rPath, stats){
    this.fPath = fPath;
    this.rPath = rPath;
    this.stats = stats;
    this.isChanged = false;
    return this;
}
module.exports = { FileItem }
// function FileItem(fPath, rPath, stats){
//     this.fPath = fPath;
//     this.rPath = rPath;
//     this.stats = stats;
//     this.isChanged = false;
//     this.getDomEle=function() {
//         let div = document.createElement("div");
//         div.className = "list-group-item";
//         div.id = this.fPath;
        
//         let checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.checked = false;
        
//         let textNode = document.createTextNode(this.rPath);
        
//         div.appendChild(checkbox);
//         div.appendChild(textNode);
        
//         return div;
//     }
// }
// exports.getItem = function(fPath, rPath, stats){
//     return new fileItem(fPath, rPath, stats);
// }