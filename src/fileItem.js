function FileItem(fPath, rPath, stats) {
  this.fPath = fPath;
  this.rPath = rPath;
  this.stats = stats;
  this.isChanged = false;
  return this;
}
module.exports = { FileItem };