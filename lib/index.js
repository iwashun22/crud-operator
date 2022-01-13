class SimpleCRUD {
   constructor(arr) {
      this.requiredProps = [...arr] || ['name', 'id'];
      this.containerArray = [];
   }
}

module.exports = SimpleCRUD;