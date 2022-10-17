const { NotImplementedError } = require('../extensions/index.js');

class BinarySearchTree {
    obj = null;
    root() {
        return this.obj;
    }

    add(data, obj = this.obj) {
        this.obj = search(data, obj);

        function search(data, obj) {
            if (obj == null) return ({ data: data, left: null, right: null })
            if (obj.data > data) obj.right = search(data, obj.right);
            if (obj.data < data) obj.left = search(data, obj.left);
            return obj;
        }
    }
    has(data, obj = this.obj) {
        if (obj == null) return false
        if (obj.data > data) return this.has(data, obj.right);
        if (obj.data < data) return this.has(data, obj.left);
        return true;
    }
    find(data, obj = this.obj) {
        if (obj == null) return null;
        if (obj.data > data) return this.find(data, obj.right)
        if (obj.data < data) return this.find(data, obj.left);
        return obj;
    }

    remove(data, obj = this.obj) {
        if (obj == null) return null;
        if (obj.data > data) obj.right = this.remove(data, obj.right)
        else if (obj.data < data) obj.left = this.remove(data, obj.left)
        else {
            if (!obj.left && !obj.right) return null
            else if (obj.left && !obj.right) return obj.left
            else if (!obj.left && obj.right) return obj.right
            else {
                let nNode = remTrick(obj.left, obj.right);
                nNode.connect.left = nNode.prev;
                if (this.obj.data == data) this.obj = nNode.connect;

                return nNode.connect;
            }
        }
        return obj;

        function remTrick(objFind, objCon) {
            if (!objFind) return null;
            if (!objCon) return null;
            if (objFind.right == null) {
                objFind.right = objCon;
                return { "connect": objFind, "prev": objFind.left };
            }
            let nNode = remTrick(objFind.right, objCon);
            objFind.right = nNode.prev;
            return { "connect": nNode.connect, "prev": objFind };
        }
    }

    max(obj = this.obj) {
        if (obj == null) return null;
        if (obj.left) return this.max(obj.left)
        return obj.data;
    }
    min(obj = this.obj) {
        if (obj == null) return null;
        if (obj.right) return this.min(obj.right)
        return obj.data;
    }
  }

  module.exports = {
    BinarySearchTree
  };