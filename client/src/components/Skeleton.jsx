import React from 'react';

export const Skeleton = () => <div className="bg-gray-50 rounded-b-md shadow-lg overflow-hidden m-1 mb-4 w-290">
  <div className="animate-pulse flex space-x-4">
    <div className="flex-1 space-y-4">
      <div className="bg-orange-300 h-40 w-full"></div>

      <div className="px-4">
        <div className="h-6 bg-orange-300 rounded"></div>
      </div>

      <div className="space-y-1 pt-1 px-4">
        <div className="h-2 bg-orange-300 rounded w-5/6"></div>
        <div className="h-2 bg-orange-300 rounded"></div>
        <div className="h-2 bg-orange-300 rounded w-5/6"></div>
        <div className="h-2 bg-orange-300 rounded"></div>
      </div>

      <div className="space-y-1 py-0 px-4 flex w-full items-center justify-between">
        <div className="h-6 bg-orange-300 rounded w-16"></div>
        <div className="h-8 bg-orange-300 rounded w-24"></div>
      </div>

      <div className="bg-orange-300 h-10 w-full"></div>
    </div>
  </div>
</div>