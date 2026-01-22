class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;

        while(fast && fast->next)
        {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast)
            {
                fast = fast->next;
                while(slow != fast)
                {
                    ListNode* temp = fast;
                    fast = fast->next;
                    temp->next = nullptr;
                }
                slow->next = nullptr;
                ListNode* temp = head;
                while(temp->next != nullptr)
                {
                    temp = temp->next;
                }
                return temp;
            }
        }
        return nullptr;
    }
};