// create Nodes 
class Node {
    constructor(key, value) {
        this[key] = value;
        this.next = null;
    }
}

// create linked list
class linkedList {
    constructor(node) {
        this.head = node;
        this.length = 0;
    }
}

// create hashmap 
class hashmap {
    constructor(size = 50) {
        this.values = [];
        this.size = size;
        this.length = 0;
    }

    _hash(key) {
        let idx = 0;
        let size = this.size;
        let primeKey = 31;
        let char;
        for(let i=0;i<Math.min(key.length, size);i++) {
            char = key[i];
            let charCode = char.charCodeAt(0) - 96;
            idx = (idx * primeKey + charCode) % size;
        }
        return idx;
    }
    set(key, val) {
        let idx = this._hash(key);
        let bucket = this.values[idx];
        let item = new Node(key, val);
        if(!bucket) { // create linked list and set the new item as a head
            bucket = new linkedList(item);
            this.values[idx] = bucket;
            bucket.length++;
            this.length++;
            return "new bucket created"; 
        } else {
            let curr = bucket.head;
            if(!curr.next) {
                curr.next = item;
            } else {
                while(curr !== null) {
                    curr.next = item;
                }
                curr = curr.next;
            }
            bucket.length++;
            this.length++;
            return "new item created in linked list";
        }
    }
}

const hm = new hashmap();

hm.set("key", "value");
hm.set("key", "hfgh");
hm.set("case", "v9");
hm.set("casw", "v9");