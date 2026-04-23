
export interface ListNode {
  id: string;
  value: number;
  highlighted?: boolean;
  pointerHighlighted?: boolean;
  isTemp?: boolean;
}

export type OperationType = 'insert' | 'delete' | 'search' | 'sort' | 'reverse' | 'none';

export interface Step {
  nodes: ListNode[];
  description: string;
  highlightedIndices: number[];
  pointerIndices: number[];
}
