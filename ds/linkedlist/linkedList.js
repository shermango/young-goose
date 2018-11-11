// better understand react internals by recreating the
// linkedlist data structure and its operations from scratch

// this is an internal structure that just keeps track of the value
// and maintains a pointer to the next link
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  size() {
    return this.length;
  }

  // lol i named this head at first and that's a conflict -__-
  start() {
    return this.head;
  }

  add(element) {
    const node = new Node(element);

    // if list is empty start the list
    if (this.head === null) {
      this.head = node;
    } else {
      let currentNode = this.head;

      // else cycle thru the list until a node has no next
      // this must be the end of the list
      // set the end node's next to be the new value
      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = node;
    }

    this.length++;
    return true; // operation successful
  }

  remove(element) {
    let currentNode = this.head;
    let previousNode;

    // if the head is the value to be removed simply set the head to be the next node
    if (currentNode.element === element) {
      this.head = currentNode.next;
    } else {
      // until we find the matching element to be removed cycle thru the list
      // once found just point the previous's next to the next of the current
      // thus removing or skipping over it
      while (currentNode.element !== element) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      previousNode.next = currentNode.next;
    }

    this.length--;
  }

  elementAt(index) {
    let currentNode = this.head;
    let count = 0;

    if (index > count) {
      return null;
    }

    // keep a counter and compare to the index provided
    // once you pass that index you know you want the value
    while (count < index) {
      count++;
      currentNode = currentNode.next;
    }

    return currentNode.element;
  }

  // add element at a specific index
  addAt(index, element) {
    const node = new Node(element);

    let currentNode = this.head;
    let previousNode;
    let currentIndex = 0;

    if (index > this.length) {
      return false; // op failed list is not that long
      // or alternatively just add it to the end
      // return this.add(element);
    }

    // if adding it at the head just set the node's next as the head
    // then make the head the node
    if (index === 0) {
      node.next = currentNode;
      this.head = node;
    } else {
      // else loop until you reach the index to add
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      // we have reached the index and broken out of the loop
      // just make the node's next the current
      // previousNode is the current, so make the current's next the node
      node.next = currentNode;
      previousNode.next = node;
    }

    this.length++;
  }

  removeAt(index) {
    let currentNode = this.head;
    let previousNode;
    let currentIndex;

    if (index < 0 || index >= length) {
      return null; // can't remove something that doesn't exist
    }

    // if remove the head just set the head to be the head's next
    if (index === 0) {
      this.head = currentNode.next;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      // set the previous's next to the next's next -- skipping the index
      previousNode.next = currentNode.next;
    }

    length--;
    return currentNode.element; // return it to user for whatever, kinda like pop()
  }
}

module.exports = {
  LinkedList,
};
