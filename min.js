// code pen url: https://codepen.io/jaspercreel/pen/RgXjEp

// Declaring a node and list class outside of the hash class avoids binding issues with this

// The node class should only be created with a key value pair
class Node {
    constructor(key, value) {
      this[key] = value;
      this.next = null;
    }
  }
  
  // The list class will take a node as an argument to start the chain
  class List {
    constructor(node) {
      this.head = node;
      this.count = 0;
    }
  }
  
  class HashTable {
    constructor(limit) {
      this.storage = [];
      this.limit = limit || 50; // I wanted to start with a base limit of 50, but will add a doubler function later that expands it when necessary. To avoid collisions more, make this larger
      this.count = 0;
    }

    
    
    // The hashing function uses string charcode values to create a unique hash. This is why primary keys being unique are important
    makeHash(str) {
      let hash = 0;
      let limit = this.limit;
      let letter;
      
      for (var i = 0; i < str.length; i++) {
        letter = str[i];
        hash = (hash << 5) + letter.charCodeAt(0);
        hash = (hash & hash) % limit;
      }
      
      return hash;
    }
    
    // insert is the simplest function and will always create a new bucket with a list or add a node to a list unless a JS error occurs
    insert(key, value) {
      let index = this.makeHash(key);
      let bucket = this.storage[index];
      let item = new Node(key, value);
      
      // Create a new bucket if none exist
      if (!bucket) {
        bucket = new List(item);
        this.storage[index] = bucket; 
        bucket.count++;
        this.count++;
        
        return 'New bucket created';
      } 
      else {
        let current = bucket.head;
        
        // If the head has null next it is there is only one node in the list
        if (!current.next) {
          current.next = item;
        }
        else {
          // move to the end of the list
          while(current.next) {
            current = current.next;
          }
          
          current.next = item;
        }
        bucket.count++;
        this.count++;
        
        return 'New item placed in bucket at position ' + bucket.count;
      }
    }
    
  }
  
  /* Examples
  
  var hash = new HashTable();
  
  hash.insert('James Hamann', 30); // Will create a bucket at hash.storage[9] and insert list with node of key, value
  hash.insert('James Hamann', 35); // Will insert new node onto list at same bucket with new key value pair
  
  console.log(hash.retrieve('James Hamann')); // Should value at first node in the bucket (30)