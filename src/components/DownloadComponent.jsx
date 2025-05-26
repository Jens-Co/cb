import React, { useEffect, useState, useMemo } from "react";
import { getMavenDownloads, getLatestJar } from "../js/mavenDownloads";

export default function DownloadComponent({
  projectName,
  artifactId,
  groupId,
  ignoredVersions = [],
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ignoredVersionsSet = useMemo(
    () => new Set(ignoredVersions),
    [ignoredVersions.join(",")]
  );

  useEffect(() => {
    (async () => {
      try {
        const result = await getMavenDownloads(
          groupId,
          artifactId,
          ignoredVersionsSet
        );
        setData(result);
      } catch {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    })();
  }, [groupId, artifactId, ignoredVersions.join(",")]);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <p className="mb-4 text-lg text-center">
        Download latest build:{" "}
        <a
          href={getLatestJar(groupId, artifactId)}
          className="text-blue-600 hover:underline font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          klik hier
        </a>
      </p>

      {data.map(({ version, artifacts }) => (
        <div
          key={version}
          className="bg-white rounded-lg shadow p-5 border border-gray-200"
        >
          <h2 className="text-xl font-bold mb-3">
            {projectName} - {version}
          </h2>
          <ul className="space-y-3">
            {artifacts.map(({ build, downloadUrl, properties }) => (
              <li
                key={downloadUrl}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-2 last:border-b-0"
              >
                <div className="mb-1 sm:mb-0">
                  <span className="inline-block bg-gray-200 text-gray-700 text-xs font-mono px-2 py-1 rounded mr-3">
                    #{build || "N/A"}
                  </span>
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Download
                  </a>
                  {" | "}
                  <a
                    href={`${downloadUrl}.sha1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:underline"
                  >
                    SHA1
                  </a>
                </div>

                {properties["github.repo"] && properties["git.commit.id"] && (
                  <a
                    href={`https://github.com/${properties["github.repo"]}/commit/${properties["git.commit.id"]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                    title={properties["git.commit.message.short"]}
                  >
                    {properties["git.commit.message.short"]}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
