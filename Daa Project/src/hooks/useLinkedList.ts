
import { useState, useCallback, useRef } from 'react';
import { ListNode, Step } from '../types';

export function useLinkedList() {
  const [nodes, setNodes] = useState<ListNode[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const clearSteps = () => {
    setSteps([]);
    setCurrentStepIndex(-1);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  const addStep = (nodes: ListNode[], description: string, highlightedIndices: number[] = [], pointerIndices: number[] = []) => {
    const step: Step = {
      nodes: nodes.map(n => ({ ...n, highlighted: false, pointerHighlighted: false })),
      description,
      highlightedIndices,
      pointerIndices,
    };
    
    // Apply highlights to the step's nodes
    highlightedIndices.forEach(idx => {
      if (step.nodes[idx]) step.nodes[idx].highlighted = true;
    });
    pointerIndices.forEach(idx => {
      if (step.nodes[idx]) step.nodes[idx].pointerHighlighted = true;
    });

    setSteps(prev => [...prev, step]);
  };

  const runSteps = (newSteps: Step[]) => {
    setSteps(newSteps);
    setIsProcessing(true);
    setCurrentStepIndex(0);
    
    let index = 0;
    const playNext = () => {
      if (index < newSteps.length - 1) {
        index++;
        setCurrentStepIndex(index);
        setNodes(newSteps[index].nodes);
        animationRef.current = setTimeout(playNext, 1000);
      } else {
        setIsProcessing(false);
      }
    };
    
    setNodes(newSteps[0].nodes);
    animationRef.current = setTimeout(playNext, 1000);
  };

  const insertAtHead = (value: number) => {
    if (isProcessing) return;
    const newSteps: Step[] = [];
    const newNode: ListNode = { id: generateId(), value };
    
    // Initial state
    newSteps.push({
      nodes: [...nodes],
      description: `Starting insertion of ${value} at head`,
      highlightedIndices: [],
      pointerIndices: []
    });

    // New node created
    newSteps.push({
      nodes: [newNode, ...nodes],
      description: `Created new node with value ${value}`,
      highlightedIndices: [0],
      pointerIndices: []
    });

    // Link established
    newSteps.push({
      nodes: [newNode, ...nodes],
      description: `Updated head to point to the new node`,
      highlightedIndices: [0],
      pointerIndices: [0]
    });

    runSteps(newSteps);
  };

  const insertAtTail = (value: number) => {
    if (isProcessing) return;
    const newSteps: Step[] = [];
    const newNode: ListNode = { id: generateId(), value };
    
    if (nodes.length === 0) {
      insertAtHead(value);
      return;
    }

    // Start traversal
    for (let i = 0; i < nodes.length; i++) {
      newSteps.push({
        nodes: [...nodes],
        description: `Traversing to find tail... at index ${i}`,
        highlightedIndices: [i],
        pointerIndices: []
      });
    }

    // Found tail, add node
    const finalNodes = [...nodes, newNode];
    newSteps.push({
      nodes: finalNodes,
      description: `Tail found. Appending new node with value ${value}`,
      highlightedIndices: [finalNodes.length - 1],
      pointerIndices: [nodes.length - 1]
    });

    runSteps(newSteps);
  };

  const deleteValue = (value: number) => {
    if (isProcessing) return;
    const newSteps: Step[] = [];
    let foundIndex = -1;

    for (let i = 0; i < nodes.length; i++) {
      newSteps.push({
        nodes: [...nodes],
        description: `Searching for value ${value} at index ${i}`,
        highlightedIndices: [i],
        pointerIndices: []
      });
      if (nodes[i].value === value) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex === -1) {
      newSteps.push({
        nodes: [...nodes],
        description: `Value ${value} not found in the list`,
        highlightedIndices: [],
        pointerIndices: []
      });
    } else {
      newSteps.push({
        nodes: [...nodes],
        description: `Found value ${value} at index ${foundIndex}. Preparing to delete.`,
        highlightedIndices: [foundIndex],
        pointerIndices: foundIndex > 0 ? [foundIndex - 1] : []
      });

      const updatedNodes = nodes.filter((_, idx) => idx !== foundIndex);
      newSteps.push({
        nodes: updatedNodes,
        description: `Node removed from the list`,
        highlightedIndices: [],
        pointerIndices: []
      });
    }

    runSteps(newSteps);
  };

  const search = (value: number) => {
    if (isProcessing) return;
    const newSteps: Step[] = [];
    let found = false;

    for (let i = 0; i < nodes.length; i++) {
      newSteps.push({
        nodes: [...nodes],
        description: `Checking index ${i} (value: ${nodes[i].value})`,
        highlightedIndices: [i],
        pointerIndices: []
      });
      
      if (nodes[i].value === value) {
        newSteps.push({
          nodes: [...nodes],
          description: `Found value ${value} at index ${i}!`,
          highlightedIndices: [i],
          pointerIndices: []
        });
        found = true;
        break;
      }
    }

    if (!found) {
      newSteps.push({
        nodes: [...nodes],
        description: `Value ${value} not found in the list`,
        highlightedIndices: [],
        pointerIndices: []
      });
    }

    runSteps(newSteps);
  };

  const bubbleSort = () => {
    if (isProcessing || nodes.length < 2) return;
    const newSteps: Step[] = [];
    let currentNodes = [...nodes];
    const n = currentNodes.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        newSteps.push({
          nodes: [...currentNodes],
          description: `Comparing ${currentNodes[j].value} and ${currentNodes[j+1].value}`,
          highlightedIndices: [j, j + 1],
          pointerIndices: []
        });

        if (currentNodes[j].value > currentNodes[j + 1].value) {
          const temp = currentNodes[j];
          currentNodes[j] = currentNodes[j + 1];
          currentNodes[j + 1] = temp;
          
          newSteps.push({
            nodes: [...currentNodes],
            description: `Swapped ${currentNodes[j].value} and ${currentNodes[j+1].value}`,
            highlightedIndices: [j, j + 1],
            pointerIndices: []
          });
        }
      }
    }

    newSteps.push({
      nodes: [...currentNodes],
      description: `Sort complete!`,
      highlightedIndices: [],
      pointerIndices: []
    });

    runSteps(newSteps);
  };

  const reverse = () => {
    if (isProcessing || nodes.length < 2) return;
    const newSteps: Step[] = [];
    let currentNodes = [...nodes];
    
    newSteps.push({
      nodes: [...currentNodes],
      description: `Starting list reversal`,
      highlightedIndices: [],
      pointerIndices: []
    });

    const reversed = [...currentNodes].reverse();
    
    // We'll just show the final reversal for simplicity in this step, 
    // but in a real linked list it's usually step-by-step pointers.
    // Let's do a basic pointer-simulated step.
    
    for(let i = 0; i < currentNodes.length; i++) {
        newSteps.push({
            nodes: [...currentNodes],
            description: `Reversing node at index ${i}`,
            highlightedIndices: [i],
            pointerIndices: []
        });
    }

    newSteps.push({
      nodes: reversed,
      description: `List reversed!`,
      highlightedIndices: [],
      pointerIndices: []
    });

    runSteps(newSteps);
  }

  const clear = () => {
    setNodes([]);
    clearSteps();
  };

  return {
    nodes,
    steps,
    currentStepIndex,
    isProcessing,
    insertAtHead,
    insertAtTail,
    deleteValue,
    search,
    bubbleSort,
    reverse,
    clear,
  };
}
