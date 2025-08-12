// utils/bookmark.ts
import axios from 'axios';

interface ToggleBookmarkParams {
  jobId: string;
  isBookmarked: boolean;
  token: string;
  onSuccess: (jobId: string, bookmarkId?: string) => void;
  onRemove: (jobId: string) => void;
  onConflict?: (jobId: string) => void;
  onError?: (error: any) => void;
}

export const toggleBookmark = async ({
  jobId,
  isBookmarked,
  token,
  onSuccess,
  onRemove,
  onConflict,
  onError,
}: ToggleBookmarkParams) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    if (isBookmarked) {
      await axios.delete(`https://akil-backend.onrender.com/bookmarks/${jobId}`, config);
      onRemove(jobId);
    } else {
      const res = await axios.post(
        `https://akil-backend.onrender.com/bookmarks/${jobId}`,
        {},
        config
      );
      const newBookmarkId = res.data?.data?.id || '';
      onSuccess(jobId, newBookmarkId);
    }
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 409 && onConflict) {
      onConflict(jobId);
    } else if (onError) {
      onError(error);
    }
  }
};
