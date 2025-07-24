'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // ✅ new import
import axios from 'axios';
import JobSidebar from '../../components/JobSidebar';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function JobDetail() {
  const params = useParams(); // ✅ get params in client components
  const jobId = params?.id as string;

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(`https://akil-backend.onrender.com/opportunities/${jobId}`);
        setJob(res.data.data);
      } catch (err: any) {
        setError('Failed to load job');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error || !job) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <main className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section className="lg:col-span-2 space-y-8">
        <section>
          <h2 className="text-xl font-black mb-2">Description</h2>
          <p>{job.description}</p>
        </section>

        {job.responsibilities && (
          <section>
            <h2 className="text-xl font-black mb-2">Responsibilities</h2>
            <ul className="list-disc list-inside space-y-1">
              {job.responsibilities.split("\n").map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>
        )}


         {job.idealCandidate && (
          <section>
            <h2 className="text-xl font-black mb-2">Ideal Candidate</h2>
            <p>{job.idealCandidate}</p>
          </section>
        )}

        {job.whenAndWhere && (
          <section>
            <h2 className="text-xl font-black mb-2">When & Where</h2>
            <div className="flex flex-wrap gap-3">
              <FaMapMarkerAlt className="text-blue-500 mt-1" />
              <p>{job.whenAndWhere}</p>
            </div>
          </section>
        )}
      </section>

       <JobSidebar
        about={{
          posted_on: job.datePosted,
          deadline: job.deadline,
          location: job.location,
          start_date: job.startDate,
          end_date: job.endDate,
          categories: job.categories,
          required_skills: job.requiredSkills,
        }}
      />
    </main>
  );
}
