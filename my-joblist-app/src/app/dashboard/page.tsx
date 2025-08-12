'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOpportunities } from '@/redux/opportunitiesSlice';
import Link from 'next/link';
import { toggleBookmark as toggleBookmarkUtil } from '@/utils/bookmark';
import { useRouter } from 'next/navigation';
import { FaChevronDown, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import axios from 'axios';

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Marketing: 'bg-green-100 text-green-700',
    Design: 'bg-pink-100 text-pink-700',
    IT: 'bg-purple-100 text-purple-700',
    Development: 'bg-blue-100 text-blue-800',
    Art: 'bg-red-100 text-red-700',
    'Data Science': 'bg-yellow-100 text-yellow-800',
    Analytics: 'bg-teal-100 text-teal-800',
    'Customer Service': 'bg-indigo-100 text-indigo-700',
    Support: 'bg-orange-100 text-orange-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: jobs, loading, error } = useAppSelector((state) => state.opportunities);

 const [bookmarks, setBookmarks] = useState<{
  [opportunityId: string]: { bookmarked: boolean; bookmarkId: string };
}>({});


useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/auth/login');
    return;
  }

  const loadDashboardData = async () => {
    await dispatch(fetchOpportunities());

    try {
      const res = await axios.get('https://akil-backend.onrender.com/bookmarks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const bookmarksArray = res.data.data || [];

      const bookmarkMap: {
        [id: string]: { bookmarked: boolean; bookmarkId: string };
      } = {};
      
      bookmarksArray.forEach((bookmark: any) => {
        const jobId = bookmark.eventID;
        if (!jobId) return;
      
        bookmarkMap[jobId] = {
          bookmarked: true,
          bookmarkId: bookmark.eventID, 
        };
      });
      

      setBookmarks(bookmarkMap);
    } catch (err) {
      console.error('❌ Failed to fetch bookmarks:', err);
    }
  };

  loadDashboardData();
}, [dispatch, router]);

const toggleBookmark = (e: React.MouseEvent, jobId: string) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in to bookmark jobs.');
    return;
  }

  const isBookmarked = bookmarks[jobId]?.bookmarked;

  toggleBookmarkUtil({
    jobId,
    isBookmarked,
    token,
    onSuccess: (id, bookmarkId = '') =>
      setBookmarks((prev) => ({
        ...prev,
        [id]: { bookmarked: true, bookmarkId },
      })),
    onRemove: (id) =>
      setBookmarks((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }),
    onConflict: (id) =>
      setBookmarks((prev) => ({
        ...prev,
        [id]: { bookmarked: true, bookmarkId: '' },
      })),
    onError: (err) => {
      console.error('🔴 Bookmark toggle failed:', err);
      alert('Failed to toggle bookmark. You might need to log in again.');
    },
  });
};
  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Opportunities</h1>
        <div className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
          <span className="font-medium text-gray-800">Sort by:</span>
          <span className="flex items-center gap-1 font-semibold">
            Most Relevant
            <FaChevronDown className="text-xs mt-0.5" />
          </span>
        </div>
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {jobs && Array.isArray(jobs) && (
        <>
          <p className="text-gray-500 mb-6">Showing {jobs.length} results</p>

          <div className="flex flex-col gap-6">
            {jobs.map((job: any) => (
              <Link
              data-cy="job-card"
                href={`/job/${job.id}`}
                key={job.id}
                className="border rounded-xl p-5 hover:shadow transition bg-white relative"
              >
                {/* 🔖 Bookmark Toggle */}
               <button
               data-cy="bookmark-button"
  className="absolute top-4 right-4 text-blue-600 text-xl"
  onClick={(e) => toggleBookmark(e, job.id)}
>
  {bookmarks[job.id]?.bookmarked === true ? <FaBookmark /> : <FaRegBookmark />}


</button>
      <div className="flex items-start gap-4">
                  <img
                    src={job.logoUrl || ''}
                    alt={job.title}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p className="text-gray-600">
                      {job.orgName} • {job.location?.join(', ')}
                    </p>
                    <p className="text-sm mt-2 text-gray-700 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.opType && (
                        <>
                          <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                            {job.opType}
                          </span>
                          <div className="w-px h-6 bg-gray-400"></div>
                        </>
                      )}
                      {job.categories?.map((category: string, i: number) => (
                        <span
                          key={i}
                          className={`text-sm px-3 py-1 rounded-full ${getCategoryColor(category)}`}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
