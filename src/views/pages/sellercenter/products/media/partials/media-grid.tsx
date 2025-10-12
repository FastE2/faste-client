'use client';

import { MediaCard } from "./media-card";


interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploadDate: string;
  thumbnail: string;
}

interface MediaGridProps {
  view: string;
  searchQuery: string;
  filterType: string;
  selectedItems: Set<string>;
  onSelectionChange: (items: Set<string>) => void;
}

// Mock data
const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    name: 'summer-vacation.jpg',
    type: 'image',
    size: '2.4 MB',
    uploadDate: '2 days ago',
    thumbnail: '/summer-beach-vacation.png',
  },
  {
    id: '2',
    name: 'product-demo.mp4',
    type: 'video',
    size: '15.8 MB',
    uploadDate: '5 days ago',
    thumbnail: '/product-demo-video.png',
  },
  {
    id: '3',
    name: 'presentation.pdf',
    type: 'document',
    size: '1.2 MB',
    uploadDate: '1 week ago',
    thumbnail: '/business-presentation-document.jpg',
  },
  {
    id: '4',
    name: 'team-photo.jpg',
    type: 'image',
    size: '3.1 MB',
    uploadDate: '1 week ago',
    thumbnail: '/professional-team-photo.png',
  },
  {
    id: '5',
    name: 'tutorial-video.mp4',
    type: 'video',
    size: '22.5 MB',
    uploadDate: '2 weeks ago',
    thumbnail: '/tutorial-video-screen.jpg',
  },
  {
    id: '6',
    name: 'report-2024.pdf',
    type: 'document',
    size: '890 KB',
    uploadDate: '2 weeks ago',
    thumbnail: '/annual-report-document.jpg',
  },
  {
    id: '7',
    name: 'landscape.jpg',
    type: 'image',
    size: '4.2 MB',
    uploadDate: '3 weeks ago',
    thumbnail: '/majestic-mountain-vista.png',
  },
  {
    id: '8',
    name: 'interview.mp4',
    type: 'video',
    size: '18.3 MB',
    uploadDate: '3 weeks ago',
    thumbnail: '/interview-recording.jpg',
  },
];

export function MediaGrid({
  view,
  searchQuery,
  filterType,
  selectedItems,
  onSelectionChange,
}: MediaGridProps) {
  // Filter items based on view, search, and filter
  const filteredItems = mockMediaItems.filter((item) => {
    // Filter by view
    if (view === 'trash') return false;
    if (view !== 'all' && item.type !== view.slice(0, -1)) return false;

    // Filter by type
    if (filterType !== 'all' && item.type !== filterType.slice(0, -1))
      return false;

    // Filter by search
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleToggleSelection = (id: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    onSelectionChange(newSelection);
  };

  if (view === 'trash') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Trash is empty</p>
        </div>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No media found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredItems.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            isSelected={selectedItems.has(item.id)}
            onToggleSelection={() => handleToggleSelection(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
