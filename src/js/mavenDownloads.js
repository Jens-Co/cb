import axios from "axios";

const REPO_URL = "https://repo.opencollab.dev";
const REPOSITORY = "maven-snapshots";
const MAVEN_VERSIONS = `${REPO_URL}/api/maven/versions/${REPOSITORY}`;
const MAVEN_DETAILS = `${REPO_URL}/api/maven/details/${REPOSITORY}`;
const MAVEN_DOWNLOADS = `${REPO_URL}/${REPOSITORY}`;

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getProperties = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "text" });
    const properties = response.data;
    return properties.split("\n").reduce((acc, line) => {
      const [key, value] = line.split("=");
      if (key && value) acc[key.trim()] = value.trim();
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching properties:", error);
    return {};
  }
};

export async function getMavenDownloads(
  groupId,
  artifactId,
  ignoredVersions = new Set()
) {
  const path = `${groupId.replace(/\./g, "/")}/${artifactId}`;
  const versionData = await fetchData(`${MAVEN_VERSIONS}/${path}`);

  let versions = [];

  for (const version of versionData.versions) {
    if (ignoredVersions.has(version)) continue;

    const details = await fetchData(`${MAVEN_DETAILS}/${path}/${version}`);

    const builds = new Map();

    const versionWithoutSnapshot = version.replace(/-SNAPSHOT$/, "");
    const jarRegex = new RegExp(
      `^(${artifactId}-${versionWithoutSnapshot}-([0-9]{8}\\.[0-9]{6})-([0-9]+)\\.jar)$`
    );
    const propRegex = new RegExp(
      `^(${artifactId}-${versionWithoutSnapshot}-([0-9]{8}\\.[0-9]{6})-([0-9]+)\\.properties)$`
    );

    for (const file of details.files) {
      const name = file.name;
      let match = jarRegex.exec(name);
      if (match) {
        const build = match[3];
        builds.set(build, {
          build,
          name: match[1],
          downloadUrl: `${MAVEN_DOWNLOADS}/${path}/${version}/${match[1]}`,
          properties: {},
        });
        continue;
      }

      match = propRegex.exec(name);
      if (match) {
        const build = match[3];
        const url = `${MAVEN_DOWNLOADS}/${path}/${version}/${match[1]}`;

        const properties = await getProperties(url);
        if (builds.has(build)) {
          builds.get(build).properties = properties;
        }
      }
    }

    let buildsList = Array.from(builds.values());
    buildsList = buildsList.reverse();

    versions.push({
      version,
      artifacts: buildsList,
    });
  }

  versions = versions.reverse();
  return versions;
}

export function getLatestJar(groupId, artifactId, version) {
  const path = `${groupId.replace(/\./g, "/")}/${artifactId}`;
  const baseUrl = `${REPO_URL}/api/maven/latest/file/${REPOSITORY}`;
  if (version) {
    return `${baseUrl}/${path}/${version}?extension=jar`;
  }
  return `${baseUrl}/${path}?extension=jar`;
}
