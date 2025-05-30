import Image from 'next/image';

interface Activity {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  product: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: 1,
    user: {
      name: 'Jane Cooper',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    action: 'bought',
    product: 'New Balance 530',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    user: {
      name: 'Jeremy Wilson',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    action: 'bought',
    product: 'Adidas Samba OG',
    timestamp: '3 hours ago',
  },
  {
    id: 3,
    user: {
      name: 'Sarah Parker',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    action: 'bought',
    product: 'Nike Air Max 270',
    timestamp: '5 hours ago',
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Feed</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={activity.user.avatar}
                alt={activity.user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.user.name}
              </p>
              <p className="text-sm text-gray-500">
                {activity.action} {activity.product}
              </p>
            </div>
            <div className="text-xs text-gray-500">
              {activity.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 