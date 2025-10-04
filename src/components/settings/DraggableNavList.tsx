// /src/component/settings/DraggableNavList.tsx

import React, { useState, useRef } from 'react';
import { NavLinkItem } from '../../types';
import { Bars2Icon } from '../shared/Icons';

interface DraggableNavListProps {
  links: NavLinkItem[];
  onReorder: (links: NavLinkItem[]) => void;
}

const DraggableNavList: React.FC<DraggableNavListProps> = ({ links, onReorder }) => {
  const [draggedItem, setDraggedItem] = useState<NavLinkItem | null>(null);
  const [dragOverItem, setDragOverItem] = useState<NavLinkItem | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, item: NavLinkItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, item: NavLinkItem) => {
    e.preventDefault();
    if (draggedItem && draggedItem.name !== item.name) {
      setDragOverItem(item);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  }

  const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.remove('dragging');
    if (draggedItem && dragOverItem && draggedItem.name !== dragOverItem.name) {
      const draggedIndex = links.findIndex(link => link.name === draggedItem.name);
      const targetIndex = links.findIndex(link => link.name === dragOverItem.name);
      
      const newLinks = [...links];
      const [removed] = newLinks.splice(draggedIndex, 1);
      newLinks.splice(targetIndex, 0, removed);
      onReorder(newLinks);
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };
  
  const getDisplayedLinks = () => {
    if (!draggedItem || !dragOverItem || draggedItem.name === dragOverItem.name) {
        return links;
    }
    const draggedIndex = links.findIndex(link => link.name === draggedItem.name);
    const targetIndex = links.findIndex(link => link.name === dragOverItem.name);
    
    const newLinks = [...links];
    const [removed] = newLinks.splice(draggedIndex, 1);
    newLinks.splice(targetIndex, 0, removed);
    return newLinks;
  }
  
  const displayedLinks = getDisplayedLinks();

  return (
    <ul className="space-y-2">
        {displayedLinks.map((link, index) => {
            const isDragOver = dragOverItem && link.name === dragOverItem.name;
            const isDragged = draggedItem && link.name === draggedItem.name;
            const draggedIndex = draggedItem ? links.findIndex(l => l.name === draggedItem.name) : -1;
            
            return(
            <li
                key={link.name}
                draggable
                onDragStart={(e) => handleDragStart(e, link)}
                onDragEnter={(e) => handleDragEnter(e, link)}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onDragLeave={() => setDragOverItem(null)}
                className={`flex items-center p-3 bg-secondary rounded-lg cursor-grab transition-all duration-200 ${isDragged ? 'dragging' : ''}`}
            >
                <Bars2Icon className="h-5 w-5 mr-3 text-text-secondary" />
                <link.icon className="h-5 w-5 mr-3 text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">{link.name}</span>
            </li>
            )
        })}
    </ul>
  );
};

export default DraggableNavList;
