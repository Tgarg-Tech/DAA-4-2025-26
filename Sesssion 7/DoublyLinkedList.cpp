#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* prev;
    Node* next;
};

void insertAtEnd(Node* &head, Node* &tail, int value) {
    Node* newNode = new Node();
    newNode->data = value;
    newNode->next = newNode->prev = nullptr;
    if (!head) {
        head = tail = newNode;
        return;
    }
    tail->next = newNode;
    newNode->prev = tail;
    tail = newNode;
}

void insertAtBeginning(Node* &head, Node* &tail, int value) {
    Node* newNode = new Node();
    newNode->data = value;
    newNode->next = newNode->prev = nullptr;
    if (!head) {
        head = tail = newNode;
        return;
    }
    head->prev = newNode;
    newNode->next = head;
    head = newNode;
}

void deleteByValue(Node* &head, Node* &tail, int value) {
    Node* curr = head;
    while (curr) {
        if (curr->data == value) {
            Node* toDelete = curr;

            if (curr == head) {
                head = head->next;
                if (head) head->prev = nullptr;
            }
            else if (curr == tail) {
                tail = tail->prev;
                if (tail) tail->next = nullptr;
            }
            else {
                curr->prev->next = curr->next;
                curr->next->prev = curr->prev;
            }

            curr = curr->next; // move forward before deleting
            delete toDelete;
        } else {
            curr = curr->next;
        }
    }
}

void display(Node* head) {
    Node* temp = head;
    while (temp) {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
}

int main() {
    Node* head = nullptr;
    Node* tail = nullptr;

    insertAtEnd(head, tail, 11);
    insertAtEnd(head, tail, 10);
    insertAtBeginning(head, tail, 14);
    insertAtEnd(head, tail, 10);

    display(head);

    deleteByValue(head, tail, 10);

    display(head);

    return 0;
}